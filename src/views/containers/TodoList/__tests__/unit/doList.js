import { shallowMount } from '@vue/test-utils';
import DoList from '../../components/DoList.vue';
import { findTestWrapper } from '@/utils/testUtils'

it('DoList 样式改变则提示', () => {
  const wrapper = shallowMount(DoList)
  expect(wrapper).toMatchSnapshot()
})

it('DoList 参数为[], count 值为0，且列表无内容', () => {
  const wrapper = shallowMount(DoList, {
    propsData: {
      list: []
    }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'item')
  expect(countElem.at(0).text()).toEqual('0')
  expect(listItems.length).toEqual(0)
})

it('DoList 参数为[1,2,3], count 值为3，列表有内容，且存在删除按钮', () => {
  const wrapper = shallowMount(DoList, {
    propsData: {
      list: [
        {
          status: 'div', value: 1,
        },
        {
          status: 'div', value: 2,
        },
        {
          status: 'div', value: 3,
        },
      ]
    }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'item')
  const deleteButton = findTestWrapper(wrapper, 'delete-button')
  expect(countElem.at(0).text()).toEqual('3')
  expect(listItems.length).toEqual(3)
  expect(deleteButton.length).toEqual(3)
})

it('删除按钮点击时，触发删除事件', () => {
  const wrapper = shallowMount(DoList, {
    propsData: {
      list: [
        {
          status: 'div', value: 1,
        },
        {
          status: 'div', value: 2,
        },
        {
          status: 'div', value: 3,
        },
      ]
    }
  })
  const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
  deleteButton.trigger('click')
  expect(wrapper.emitted().delete).toBeTruthy()
  // 传给 delete 的参数是 1
  expect(wrapper.emitted().delete[0][0]).toBe(1)
})