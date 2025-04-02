
<template>
  <blockquote :id="block.attributes?.id"
     :class="block.attributes?.class"
     :style="block.attributes?.style">
       <template v-if="block.children" v-for="child in block.children">
     <InlineNodeTemplate :inline-node="child" />
    </template>
  </blockquote>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type {Attributes, InlineNode, Block, Note} from '../../types/Note'
import InlineNodeTemplate from "./InlineNodeTemplate.vue"

const props = defineProps<{
  block: Block
}>()
</script>

<style scoped>
blockquote {
  padding-left: 2rem;
  position: relative;
  overflow: hidden;
}

   
    blockquote::before {
      content:  url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='%23777777'><path d='M9.983 3v7.391C9.983 16.095 6.252 19.961 1 21l-.995-2.151C2.437 17.932 4 15.211 4 13H0V3h9.983zM24 3v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151C16.437 17.932 18 15.211 18 13h-3.983V3H24z'/></svg>");
      left: 0;
    position: absolute;
    color: #777;
    }   

    blockquote::after {
      content: "";
      left: 5px;
      top: 25px;
      width: 1px;
      height: 100%;
      background-color: var(--gray-color);
position: absolute;
    color: #777;
    }    


</style>
