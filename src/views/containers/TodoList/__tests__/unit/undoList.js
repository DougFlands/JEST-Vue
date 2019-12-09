import { shallowMount } from '@vue/test-utils';
import UndoList from '../../components/UndoList.vue';
import { findTestWrapper } from '@/utils/testUtils'

it('UndoList 样式改变则提示', () => {
  const wrapper = shallowMount(UndoList)
  expect(wrapper).toMatchSnapshot()
})

it('UndoList 参数为[], count 值为0，且列表无内容', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: []
    }
  })
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'item')
  expect(countElem.at(0).text()).toEqual('0')
  expect(listItems.length).toEqual(0)
})

it('UndoList 参数为[1,2,3], count 值为3，列表有内容，且存在删除按钮', () => {
  const wrapper = shallowMount(UndoList, {
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
  const wrapper = shallowMount(UndoList, {
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

it('列表项点击时，触发 status 事件', () => {
  const wrapper = shallowMount(UndoList, {
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
  const item = findTestWrapper(wrapper, 'item-value').at(1)
  item.trigger('click')
  expect(wrapper.emitted().status).toBeTruthy()
  // 传给 delete 的参数是 1
  expect(wrapper.emitted().status[0][0]).toBe(1)
})

it('列表显示为输入框，其他的不变', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        {
          status: 'div', value: 1,
        },
        {
          status: 'input', value: 2,
        },
        {
          status: 'div', value: 3,
        },
      ]
    }
  })
  const input = findTestWrapper(wrapper, 'undo-input')
  expect(input.at(0).element.value).toBe('2')
  expect(input.length).toBe(1)
})

it('输入框失去焦点时，触发reset事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        {
          status: 'div', value: 1,
        },
        {
          status: 'input', value: 2,
        },
        {
          status: 'div', value: 3,
        },
      ]
    }
  })
  const inputElement = findTestWrapper(wrapper, 'undo-input').at(0)
  inputElement.trigger('blur')
  expect(wrapper.emitted().reset).toBeTruthy()
})

it('输入框变化时，触发 changeValue 事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        {
          status: 'div', value: 1,
        },
        {
          status: 'input', value: 2,
        },
        {
          status: 'div', value: 3,
        },
      ]
    }
  })
  const inputElement = findTestWrapper(wrapper, 'undo-input').at(0)
  inputElement.trigger('change')
  expect(wrapper.emitted().change).toBeTruthy()
})

it('完成按钮点击时，触发完成事件', () => {
  const wrapper = shallowMount(UndoList, {
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
  const completeButton = findTestWrapper(wrapper, 'complete-button').at(1)
  completeButton.trigger('click')
  expect(wrapper.emitted().complete).toBeTruthy()
  expect(wrapper.emitted().complete[0][0]).toBe(1)
})


