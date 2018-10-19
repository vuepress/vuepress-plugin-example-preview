// @ts-check
import ExamplePreviewBarButton from '../lib/ExamplePreviewBarButton'
import bracketsSvg from '../lib/icons/brackets.svg'
import codesandboxSvg from '../lib/icons/codesandbox.svg'
import { mount } from '@vue/test-utils'

const tick = () => new Promise(resolve => process.nextTick(resolve))

describe('ExamplePreviewBarButton ', () => {
  it('lazy loads the svg', async () => {
    /** @type {import('@vue/test-utils').Wrapper<ExamplePreviewBarButton>} */
    const wrapper = mount(ExamplePreviewBarButton, {
      propsData: {
        icon: 'brackets',
      },
    })
    expect(wrapper.vm.svg).toBe('?')
    await tick()
    expect(wrapper.vm.svg).toBe(bracketsSvg)
  })

  it('lazy loads the svg when prop icon changes', async () => {
    /** @type {import('@vue/test-utils').Wrapper<ExamplePreviewBarButton>} */
    const wrapper = mount(ExamplePreviewBarButton, {
      propsData: {
        icon: 'brackets',
      },
    })
    await tick()
    wrapper.setProps({ icon: 'codesandbox' })
    await tick()
    expect(wrapper.vm.svg).toBe(codesandboxSvg)
  })
})
