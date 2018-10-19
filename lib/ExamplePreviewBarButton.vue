<template>
  <button class="reset-button button" v-html="svg"></button>
</template>

<script>
export default {
  props: {
    icon: String
  },

  // TODO use vue-promised
  data() {
    return {
      svg: '?'
    }
  },

  watch: {
    icon: {
      immediate: true,
      async handler (icon) {
        this.svg = '?'
        this.svg = await import(`!raw-loader!./icons/${icon}.svg`).then(f => f.default)
      }
    }
  },
}
</script>

<style scoped lang="stylus">
.reset-button {
  /* reset button style */
  border: none;
  padding: 0;
  margin: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
}

.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}

.button {
  color: rgb(135, 135, 135);
  font-size: 1.5rem;
  line-height: 0.5;
  vertical-align: middle;
  text-align: center;
  margin: 0px 0.1rem;

  &:not([disabled]):hover {
    background-color: rgb(226, 226, 226);
    cursor: pointer;
  }

  &[disabled] {
    color: rgb(192, 192, 192);
  }
}
</style>
