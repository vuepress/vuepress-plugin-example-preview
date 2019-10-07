<template>
  <div
    v-html="content"
    class="example_preview_file_content code"
    :class="'language-' + language"
  ></div>
</template>

<script>
import highlightCode from './highlight'

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  computed: {
    language() {
      return this.file.name.substring(
        this.file.name.lastIndexOf('.') + 1,
        this.file.name.length
      )
    },
    content() {
      return highlightCode(this.file.content, this.language)
    },
  },
}
</script>

<style scoped>
.example_preview_file_content.code {
  border-radius: 0 0 4px 4px;
}

.example_preview_file_content.code >>> pre {
  margin: 0;
}

@media (max-width: 419px) {
  .example_preview_file_content.code.code {
    margin: 0;
  }
}
</style>
