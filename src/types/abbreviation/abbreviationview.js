/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import {
	ButtonView,
	LabeledFieldView,
	View,
	createLabeledInputText,
	icons,
	submitHandler
} from 'ckeditor5';

export default class FormView extends View {
	constructor( locale ) {
		super( locale );

		this.abbrInputView = this._createInput( '輸入法條' );
		this.titleInputView = this._createInput( '輸入條號' );

		this.saveButtonView = this._createButton( 'Save', icons.check, 'ck-button-save' );
		// Submit type of the button will trigger the submit event on entire form when clicked
		// (see submitHandler() in render() below).
		this.saveButtonView.type = 'submit';

		this.cancelButtonView = this._createButton( 'Cancel', icons.cancel, 'ck-button-cancel' );

		// Delegate ButtonView#execute to FormView#cancel
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

		this.childViews = this.createCollection( [
			this.abbrInputView,
			this.titleInputView,
			this.saveButtonView,
			this.cancelButtonView
		] );

		this.setTemplate( {
			tag: 'form',
			attributes: {
				class: [ 'ck', 'ck-abbr-form' ],
				tabindex: '-1'
			},
			children: this.childViews
		} );
	}

	render() {
		super.render();

		// Submit the form when the user clicked the save button or pressed enter in the input.
		submitHandler( {
			view: this
		} );
	}

	focus() {
		this.childViews.first.focus();
	}

	_createInput( label ) {
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );

		labeledInput.label = label;
  

    if (label === '輸入法條') {
    labeledInput.fieldView.extendTemplate({
		attributes: {
			list: 'law-name-data'
		}
	});
    }

		return labeledInput;
	}

	_createButton( label, icon, className ) {
		const button = new ButtonView();

		button.set( {
			label,
			icon,
			tooltip: true,
			class: className
		} );

		return button;
	}
}
