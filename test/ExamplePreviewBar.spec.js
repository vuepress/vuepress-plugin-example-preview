import ExamplePreviewBar from '../lib/ExamplePreviewBar'
import { mount } from '@vue/test-utils'

const files = [
  { name: 'index.js', content: 'let a = 0' },
  { name: 'bar.js', content: `let bar = 'bar'` },
  { name: 'App.vue', content: `<template><div>App</div></template` },
]

const stubs = {
  ExamplePreviewBarButton: {
    props: ['icon'],
    render (h) {
      return h('button', {}, this.icon)
    },
  },
}

describe('ExamplePreviewBar', () => {
  /** @type {import('@vue/test-utils').Wrapper<ExamplePreviewBar>} */
  let wrapper
  beforeEach(() => {
    wrapper = mount(ExamplePreviewBar, {
      stubs,
      propsData: {
        files,
        currentFile: files[0],
        viewCode: false,
      },
    })
  })

  it('displays an empty .tabs-container with a button by default', async () => {
    expect(wrapper.find('.tabs-container').isEmpty()).toBe(true)
    // no codesandbox if no prop
    expect(wrapper.find('.actions-container form').exists()).toBe(false)
    const buttons = wrapper.findAll('.actions-container button')
    expect(buttons).toHaveLength(1)
    expect(buttons.at(0).text()).toBe('brackets')
  })

  it('displays a play-window button with viewCode', async () => {
    wrapper.setProps({ viewCode: true })
    const buttons = wrapper.findAll('.actions-container button')
    expect(buttons).toHaveLength(1)
    expect(buttons.at(0).text()).toBe('play-window')
  })

  it('toggles viewCode when clicked', () => {
    const button = wrapper.find('.actions-container button')
    expect(wrapper.emitted('update:viewCode')).toBe(undefined)
    button.trigger('click.native')
    wrapper.setProps({ viewCode: true })
    button.trigger('click.native')
    expect(wrapper.emitted('update:viewCode')).toEqual([[true], [false]])
  })
})
