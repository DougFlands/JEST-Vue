import { shallowMount } from '@vue/test-utils';
import Header from '../../components/Header.vue';
import { findTestWrapper } from '@/utils/testUtils'
import store from '../../../../../store'

// 以下测试不用 Vuex

it('Header 样式改变则提示', () => {
  const wrapper = shallowMount(Header, {store})
  expect(wrapper).toMatchSnapshot()
})

// it('Header 包含 input 框', () => {
//   const wrapper = shallowMount(Header)
//   const input = findTestWrapper(wrapper, 'header-input')
//   expect(input.exists()).toBe(true)
// })

// it('input 初始内容为空', () => {
//   const wrapper = shallowMount(Header)
//   const inputValue = wrapper.vm.inputValue
//   expect(inputValue).toBe('')
// })

// it('input 变化，数据变化', () => {
//   const wrapper = shallowMount(Header)
//   const input = findTestWrapper(wrapper, 'header-input')
//   input.setValue('123')
//   const inputValue = wrapper.vm.inputValue
//   expect(inputValue).toBe('123')
// })

// it('input 输入回车，无内容时，不触发事件', () => {
//   const wrapper = shallowMount(Header)
//   const input = findTestWrapper(wrapper, 'header-input')
//   input.setValue('')
//   input.trigger('keyup.enter')
//   expect(wrapper.emitted().add).toBeFalsy()
// })

// it('input 输入回车，有内容时，触发事件，同时清空 value', () => {
//   const wrapper = shallowMount(Header)
//   const input = findTestWrapper(wrapper, 'header-input')
//   input.setValue('123')
//   input.trigger('keyup.enter')
//   expect(wrapper.emitted().add).toBeTruthy()
//   const inputValue = wrapper.vm.inputValue
//   expect(inputValue).toBe('')
// })



