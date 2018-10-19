import ExamplePreviewFileContent from '../lib/ExamplePreviewFileContent'
import { mount } from '@vue/test-utils'

describe('ExamplePreviewFileContent ', () => {
  it('works', () => {
    const wrapper = mount(ExamplePreviewFileContent, {
      propsData: {
        file: {
          name: 'index.js',
          content: 'let a = 0',
        },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
