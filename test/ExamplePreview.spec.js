import ExamplePreview from '../lib/ExamplePreview'
import { mount } from '@vue/test-utils'

const tick = () => new Promise((resolve) => process.nextTick(resolve))

const mocks = {
  $localePath: '',
}

const stubs = {
  ExamplePreviewBarButton: {
    props: ['icon'],
    render (h) {
      return h('button', {}, this.icon)
    },
  },
}

describe('ExamplePreview', () => {
  /** @type {import('@vue/test-utils').Wrapper<ExamplePreview>} */
  let wrapper
  beforeEach(async () => {
    wrapper = mount(ExamplePreview, {
      mocks,
      stubs,
      propsData: {
        name: 'counter',
      },
    })

    await tick()
  })

  it('initialView defaults to demo', () => {
    expect(wrapper.vm.viewCode).toBe(false)
  })

  it.skip('initialView changes viewCode', () => {
    wrapper = mount(ExamplePreview, {
      mocks,
      stubs,
      propsData: {
        initialView: 'code',
        name: 'counter',
      },
    })
    expect(wrapper.vm.viewCode).toBe(true)
  })

  it.skip('populates files on creation', () => {
    expect(wrapper.vm.files).toHaveLength(2)
    expect(wrapper.vm.demoComponent).toBeTruthy()
    expect(wrapper.vm.currentFile).toMatchObject({ name: 'Counter.vue' })
  })
})
