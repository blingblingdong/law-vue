
<template>
  <p :id="block.attributes?.id"
     :class="block.attributes?.class"
     :style="block.attributes?.style">
  <template v-if="block.children" v-for="child in block.children">
   <InlineNodeTemplate :inline-node="child" />
  </template>
  </p>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type {Attributes, InlineNode, Block, Note} from '../../types/Note'
import InlineNodeTemplate from './InlineNodeTemplate.vue'


const props = defineProps<{
  block: Block
}>()
</script>
