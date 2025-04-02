<template>
  <div class="law-block" v-if="card">
    <div class="law-block-content-multiple">
      <p class="law-block-chapter-num">
        <span class="law-block-chapter">{{ card.chapter }}</span>第<span class="law-block-num">{{ card.num }}</span>條
        <i class="fas fa-caret-up" v-show="showLines" @click="showLines = false"></i>
        <i class="fas fa-caret-down" v-show="!showLines" @click="showLines = true"></i>
      </p>
      <ul class='law-block-lines' v-show="showLines">
        <template v-for="line in card.lines">
          <div v-if="line.line_type === 'indent'" :class="line.attributes?.class" :style="line.attributes?.style">
            <template v-if="line.children" v-for="child in line.children">
              <InlineNodeTemplate :inline-node="child as InlineNode" />
            </template>
          </div>
          <li v-else class="law-block-line" :class="line.attributes?.class" :style="line.attributes?.style">
            <template v-if="line.children" v-for="child in line.children">
              <InlineNodeTemplate :inline-node="child as InlineNode" />
            </template>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue'
import type { Attributes, InlineNode, Block, Note, Line, LawCard } from '../../types/Note'
import InlineNodeTemplate from './InlineNodeTemplate.vue'


const showLines = ref(true);
const card = ref<LawCard>();

const props = defineProps<{
  block: Block
}>()


if (props.block.data) {
  card.value = props.block.data;
}


</script>

<style scoped>
.law-block {
  color: white;
  border-left: 4px solid var(--accent-color);
  margin: 10px;
  background-color: var(--gray-color);
  border-radius: 10px;
  padding: 5px 5px;
}

.multiple-block {
  color: white;
  border: 1px solid white;
  margin: 10px;
}

.law-block-chapter-num {
  display: flex;
  align-items: center;
}


.law-block-content-multiple {
  border-bottom: 0px solid white;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 5px;
}

.law-block-chapter {
  font-weight: bold;
}

.law-block-chapter:hover {
  cursor: pointer;
  color: red;
}


.law-block-lines {
  list-style-type: upper-roman !important;
}
</style>
