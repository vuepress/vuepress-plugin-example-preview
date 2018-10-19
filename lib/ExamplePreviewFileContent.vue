<template>
  <div v-html="content" class="code" :class="'language-' + language"></div>
</template>

<script>
import highlightCode from '@vuepress/markdown/lib/highlight.js'

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  computed: {
    language: ({ file: { name }}) => name.substring(name.lastIndexOf('.') + 1, name.length),
    content: ({ file, language}) => highlightCode(file.content, language)
  }
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
