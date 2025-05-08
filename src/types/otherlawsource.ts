import { defineProps, ref, onMounted, computed, watch, type Component, markRaw } from 'vue'
import NewinterpretationBlock from '../components/SourceCon/NewinterpretationBlock.vue'
import OldinterpretationBlock from '../components/SourceCon/OldinterpretationBlock.vue'
import ResolutionBlock from '../components/SourceCon/ResolutionBlock.vue'
import PrecedentBlock from '../components/SourceCon/PrecedentBlock.vue'
import LawPage from '../components/LawPage.vue'
import { get_note, get_note_nav } from './Note'
import FilePage from '../components/FilePage.vue'


export interface othersourceitem {
  name: string,
  id: string,
  sourcetype: string,
}

export interface OtherLawSourceStyle {
  sourcetype: string,
  color: string,
  name: string,
  con: Component,
}



export let style_vec: OtherLawSourceStyle[] = [
  { sourcetype: "newinterpretation", color: "darkblue", name: "憲判字", con: NewinterpretationBlock },
  { sourcetype: "oldinterpretation", color: "#cc6699", name: "舊釋字", con: OldinterpretationBlock },
  { sourcetype: "precedent", color: "darkred", name: "判例", con: PrecedentBlock },
  { sourcetype: "resolution", color: "#ff6600", name: "決議", con: ResolutionBlock },
  { sourcetype: "lawname", color: "darkgreen", name: "法條", con: LawPage },
  { sourcetype: "all", color: "purple", name: "全域!", con: LawPage },
  { sourcetype: "note", color: "darkgreen", name: "筆記", con: FilePage },
];



const get_style = (sourcetype: string): OtherLawSourceStyle => {
  let returned_style = style_vec[0];
  style_vec.forEach(item => {
    if (item.sourcetype === sourcetype) {
      returned_style = item;
    }
  });
  return returned_style;
}

export interface WorkingItem {
  item: othersourceitem,
  con: Component,
  locked: boolean,
  data?: any
}


export async function finditem(ApiLink: string, pushingitem: othersourceitem): Promise<WorkingItem | null> {
  let buffer: WorkingItem = {
    item: pushingitem,
    con: markRaw(get_style(pushingitem.sourcetype).con),
    locked: false
  };
  buffer.item = pushingitem;

  switch (pushingitem.sourcetype) {
    case 'lawname':
      buffer.data = { chapter: buffer.item.name };
      break;
    case 'note':
      const [username, foldername, notename] = buffer.item.id.split("-");
      const note = await get_note(ApiLink, username, foldername, notename)
      const notenav = await get_note_nav(ApiLink, buffer.item.id);
      if (note && notenav) {
        buffer.data = { theNote: note, theNoteNav: notenav }
      } else {
        return null
      }
      break;
    default:
      const res = await fetch(`${ApiLink}/${buffer.item.sourcetype}/${buffer.item.id}`);
      if (!res.ok) {
        return null
      }
      const resdata = await res.json();
      buffer.data = { datax: resdata };
  }

  return buffer
}

