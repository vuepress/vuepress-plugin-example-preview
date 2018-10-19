<template>
  <div class="bar-container">
    <template v-if="!viewCode">
      <slot>
        <div class="tabs-container"></div>
      </slot>
    </template>
    <div class="tabs-container" v-else>
      <button class="reset-button tab" v-for="file in files" :class="file === currentFile ? 'is-selected' : ''" @click="$emit('update:currentFile', file)">
        {{ file.name }}
      </button>
    </div>
    <div class="actions-container">
      <form v-if="viewCode && codesandboxParams" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
        <input type="hidden" name="parameters" :value="codesandboxParams">
        <ExamplePreviewBarButton icon="codesandbox" title="Edit on CodeSandbox" />
      </form>
      <ExamplePreviewBarButton :icon="viewCode ? 'play-window' : 'brackets'" @click.native="$emit('update:viewCode', !viewCode)" :title="viewCode? 'View Demo' : 'View Code'" />
    </div>
  </div>
</template>

<script>
import ExamplePreviewBarButton from './ExamplePreviewBarButton'

export default {
  props: {
    files: Array,
    currentFile: Object,
    viewCode: Boolean,
    codesandboxParams: String
  },

  components: { ExamplePreviewBarButton }
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

.bar-container {
  display: flex;
  border-radius: 4px 4px 0 0;
  background-color: rgb(242, 242, 242);
  padding: 0 0.5rem;
  align-items: center;
  line-height: 1;
  box-shadow: rgb(221, 221, 221) 0px 1px 3px;
  height: 2.5rem;
  min-height: 2.5rem;
  margin-bottom: 0;
}

.actions-container {
  // Make sure they appar in line
  display: flex;
}

.tabs-container {
  flex-grow: 1;
}

.tabs-container {
  display: flex;
  height: 100%;
  margin-left: -0.5rem;
  overflow-x: auto;
}

.tab {
  height: 100%;
  font-size: 0.9rem;
  padding: 0 0.7rem;
  line-height: 2.5rem;
  color: #666;

  &:hover {
    cursor: pointer;
  }

  &.is-selected {
    color: inherit;
    font-weight: 500;
    border-bottom: 3px solid $accentColor;
    background-color: rgba(0, 0, 0, 0.075);
  }
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
