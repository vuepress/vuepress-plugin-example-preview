import ExamplePreviewFileContent from '../lib/ExamplePreviewFileContent'
import { mount } from '@vue/test-utils'

describe('ExamplePreviewFileContent ', () => {
  it('works with a language', () => {
    const wrapper = mount(ExamplePreviewFileContent, {
      propsData: {
        file: {
          name: 'index.js',
          content: 'let a = 0',
        },
      },
    })
    expect(wrapper.text()).toBe('let a = 0')
    expect(wrapper.find('.language-js').exists()).toBe(true)
  })
})
