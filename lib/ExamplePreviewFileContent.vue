<template>
  <div v-html="content" class="code" :class="'language-' + language"></div>
</template>

<script>
// TODO make the highlight work again...
// import highlightCode from './highlight'
// import highlightCode from '@vuepress/markdown/lib/highlight'
import escapeHtml from 'escape-html'
const highlightCode = v => escapeHtml(v)

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  computed: {
    language () {
      return this.file.name.substring(this.file.name.lastIndexOf('.') + 1, this.file.name.length)
    },
    content () {
      return highlightCode(this.file.content, this.language)
    },
  },
}
</script>

<style scoped>
.code {
  border-radius: 0 0 4px 4px;
}

.code pre {
  margin: 0;
}

@media (max-width: 419px) {
  .code.code.code {
    margin: 0;
  }
}
</style>
