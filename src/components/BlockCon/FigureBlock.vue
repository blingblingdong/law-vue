
<template>
  <figure :id="block.attributes?.id"
     :class="block.attributes?.class"
     :style="block.attributes?.style">
    <!-- 依序渲染 block 內的所有 inline node -->
    <template v-for="(child, index) in block.children" :key="index">
      <template v-if="child.type === 'img'">
        <img :class= "child.attributes?.class"
        :style="child.attributes?.style" 
        :src="child.attributes?.src"   
        :width="child.attributes?.width"
        :id="child.attributes?.id"
        :height="child.attributes?.height"
        
        ></img>
      </template>
    </template>
  </figure>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type {Attributes, InlineNode, Block, Note} from '../../types/Note'


const props = defineProps<{
  block: Block
}>()
</script>
