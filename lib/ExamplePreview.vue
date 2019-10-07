<template>
  <div class="demo" :class="containerClasses">
    <ExamplePreviewBar
      :view-code.sync="viewCode"
      :files="files"
      :current-file.sync="currentFile"
    />
    <!-- <Promised :promise="examplePromise">
      <span></span>
      <span slot="catch" slot-scope="error"></span>
    </Promised> -->
    <!-- <keep-alive :promise="examplePromise"> -->
    <div v-if="!demoComponent" class="example">Loading example...</div>
    <div v-else>
      <keep-alive include="ExamplePreviewDemoWrapper">
        <template v-if="viewCode">
          <!-- <ExamplePreviewFilesTabs :files="files" :current-file.sync="currentFile" :view-code.sync="viewCode" /> -->
          <ExamplePreviewFileContent v-if="currentFile" :file="currentFile" />
        </template>
        <template v-else>
          <ExamplePreviewDemoWrapper
            class="example"
            :component="demoComponent"
          />
        </template>
      </keep-alive>
    </div>
    <div v-if="false" class="example error" slot="catch" slot-scope="error">
      <p>There was an error loading the example</p>

      <button class="action-button" @click="loadPage">Retry</button>
    </div>
    <!-- </Promised> -->
  </div>
</template>

<script>
import ExamplePreviewBar from './ExamplePreviewBar'
import ExamplePreviewDemoWrapper from './ExamplePreviewDemoWrapper'
import 'focus-visible'
import ExamplePreviewFileContent from './ExamplePreviewFileContent'

export default {
  props: {
    // TODO title ?
    name: String,
    initialView: {
      type: String,
      default: 'demo',
    },
  },

  data() {
    return {
      viewCode: this.initialView === 'code',
      demoComponent: null,
      files: [],
      currentFile: null,

      // TODO use vue-promised
      examplePromise: null,
    }
  },

  methods: {
    async loadPage() {
      if (!this.name) return
      // TODO allow users to provide the same example for all locales
      this.examplePromise = this.pagePath
        ? import(`@source/${this.pagePath}/examples/${this.name}/index.js`)
        : import(`@source/examples/${this.name}/index.js`)
      const Example = await this.examplePromise
      // TODO dev warnings
      if (!Example || !Example.App) return
      let { App, files, codesandbox } = Example

      App.name = 'Demo'
      this.demoComponent = App

      // reset file, files
      this.currentFile = null
      // this.codesandboxParams = null
      this.files = []

      // files is usually an object, transform if it's not
      if (Array.isArray(files)) {
        files = files.reduce((filesDict, name) => {
          filesDict[name] = name
          return filesDict
        }, {})
      }

      // load the content of all the files
      Object.keys(files).forEach((name, i) => {
        const handleImport = ({ default: content }) => {
          const file = { name, content }
          this.files.push(file)
          // set the currentFile as the first one in the object
          if (i === 0) this.currentFile = file
        }

        if (this.pagePath) {
          import(
            `!raw-loader!@source/${this.pagePath}/examples/${this.name}/${files[name]}`
          ).then(handleImport)
        } else {
          import(
            `!raw-loader!@source/examples/${this.name}/${files[name]}`
          ).then(handleImport)
        }
      })
    },
  },

  computed: {
    containerClasses() {
      return { explorer: this.viewCode }
    },
    // this seems to be necessary to correctly code split
    // it allows import path to have the slashes in them
    pagePath() {
      return this.$localePath.replace(/^\//, '').replace(/\/$/, '')
    },
  },

  watch: {
    name: {
      handler: 'loadPage',
      immediate: true,
    },
  },

  components: {
    ExamplePreviewBar,
    ExamplePreviewFileContent,
    ExamplePreviewDemoWrapper,
  },
}
</script>

<style scoped lang="stylus">
.demo {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1rem;

  & .example {
    padding: 1rem 1.5rem;
    overflow: hidden;

    &.error {
      color: #ff2828;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .demo {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    border-radius: 0;
  }
}

.action-button {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #389d70;

  &:hover {
    background-color: #4abf8a;
    cursor: pointer;
  }
}
</style>

<style>
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
}
</style>
