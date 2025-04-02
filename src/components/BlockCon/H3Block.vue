
<template>
  <h3 :id="block.attributes?.id"
     :class="block.attributes?.class"
     :style="block.attributes?.style">
    <!-- 依序渲染 block 內的所有 inline node -->
    <template v-for="(child, index) in block.children" :key="index">
      <template v-if="child.type === 'text'">
        {{ child.text }}
      </template>
      <template v-else-if="child.type === 'span'">
        <span :class="child.attributes?.class"
              :style="child.attributes?.style">
          {{ child.text }}
        </span>
      </template>
      <template v-else-if="child.type === 'strong'">
        <strong :class="child.attributes?.class"
                :style="child.attributes?.style">
          {{ child.text }}
        </strong>
      </template>
      <!-- 如有其他 inline 節點，可在此擴充 -->
    </template>
  </h3>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type {Attributes, InlineNode, Block, Note} from '../../types/Note'


const props = defineProps<{
  block: Block
}>()
</script>
