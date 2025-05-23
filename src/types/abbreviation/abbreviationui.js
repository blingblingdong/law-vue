/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import { ButtonView, ContextualBalloon, Plugin, clickOutsideHandler, HtmlEmbed  } from 'ckeditor5';
import FormView from './abbreviationview';
import {SSRLaw} from "../Law"
import { nextTick} from "vue"

export default class AbbreviationUI extends Plugin {
	static get requires() {
		return [ ContextualBalloon ];
	}

	init() {
		const editor = this.editor;

		// Create the balloon and the form view.
		this._balloon = this.editor.plugins.get( ContextualBalloon );
		this.formView = this._createFormView();

		editor.ui.componentFactory.add( 'abbreviation', () => {
			const button = new ButtonView();

			button.label = '加入法條';
			button.tooltip = true;
			button.withText = true;

			// Show the UI on button click.
			this.listenTo( button, 'execute', () => {
				this._showUI();
			} );

			return button;
		} );
	}

	_createFormView() {
		const editor = this.editor;
		const formView = new FormView( editor.locale );

		// Execute the command after clicking the "Save" button.
		this.listenTo( formView, 'submit',async  () => {
			// Grab values from the abbreviation and title input fields.
			const title = formView.titleInputView.fieldView.element.value;
			const abbr = formView.abbrInputView.fieldView.element.value;
      let law = await SSRLaw(abbr, title);
      if (law) {
		// 將 HTML 轉成 CKEditor 可接受的 View Fragment
		const viewFragment = editor.data.processor.toView(law);

		// 將 View Fragment 轉成 Model Fragment
		const modelFragment = editor.data.toModel(viewFragment);

		editor.model.change(writer => {
			// 插入 Model Fragment 到目前游標位置
			editor.model.insertContent(modelFragment);
		});
	}

		
			// Hide the form view after submit.
			this._hideUI();
		} );

		// Hide the form view after clicking the "Cancel" button.
		this.listenTo( formView, 'cancel', () => {
			this._hideUI();
		} );

		// Hide the form view when clicking outside the balloon.
		clickOutsideHandler( {
			emitter: formView,
			activator: () => this._balloon.visibleView === formView,
			contextElements: [ this._balloon.view.element ],
			callback: () => this._hideUI()
		} );

		return formView;
	}

	_showUI() {
		this._balloon.add( {
			view: this.formView,
			position: this._getBalloonPositionData()
		} );

		this.formView.focus();
	}

	_hideUI() {
		// Clear the input field values and reset the form.
		this.formView.abbrInputView.fieldView.value = '';
		this.formView.titleInputView.fieldView.value = '';
		this.formView.element.reset();

		this._balloon.remove( this.formView );

		// Focus the editing view after inserting the abbreviation so the user can start typing the content
		// right away and keep the editor focused.
		this.editor.editing.view.focus();
	}

	_getBalloonPositionData() {
		const view = this.editor.editing.view;
		const viewDocument = view.document;
		let target = null;

		// Set a target position by converting view selection range to DOM
		target = () => view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

		return {
			target
		};
	}
}
