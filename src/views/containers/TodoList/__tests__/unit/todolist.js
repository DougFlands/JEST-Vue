import { shallowMount } from '@vue/test-utils';
import TodoList from '../../list.vue';
import UndoList from '../../components/UndoList.vue'

// 防止多个测试中的 settimeout 互相影响 expect(setTimeout).toHaveBeenCalled(1) 不为 1
beforeEach(() => {
  jest.useFakeTimers()
})

it('组件渲染正常', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.vm.undoList
  expect(undoList).toEqual([])
})

it('add item被执行后内容增加', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [
      {
        status: 'div', value: 1,
      },
      {
        status: 'div', value: 2,
      },
      {
        status: 'div', value: 3,
      }
    ]
  })
  wrapper.vm.addUndoItem(4)
  const list = wrapper.vm.undoList
  expect(list).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'div', value: 2,
    },
    {
      status: 'div', value: 3,
    },
    {
      status: 'div', value: 4,
    }
  ])
})

it('调用 undoList， 应该传递 list 参数', () => {
  const wrapper = shallowMount(TodoList)
  const undoList = wrapper.find(UndoList)
  const list = undoList.props('list')
  expect(list).toBeTruthy()
})

it('进行列表 delete 时，列表会减少一个', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [
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
  })
  wrapper.vm.handleItemDelete(1)
  const list = wrapper.vm.undoList
  expect(list).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'div', value: 3,
    },
  ])
})

it('changeStatus 时，列表会变化', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [
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
  })
  wrapper.vm.handleItemChangeStatus(1)
  const list = wrapper.vm.undoList
  expect(list).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'input', value: 2,
    },
    {
      status: 'div', value: 3,
    },
  ])
})

it('blur 时，列表会变化', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [
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
  })
  wrapper.vm.handleItemChangeBlur(1)
  const list = wrapper.vm.undoList
  expect(list).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'div', value: 2,
    },
    {
      status: 'div', value: 3,
    },
  ])
})

it('changeValue 时，列表数据会变化', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [
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
  })
  wrapper.vm.handleItemChangeValue({
    value: 123,
    index: 1,
  })
  const list = wrapper.vm.undoList
  expect(list).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'input', value: 123,
    },
    {
      status: 'div', value: 3,
    },
  ])
})

it('进行列表 complete 时，进行列表减少一个，完成列表增加一个', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: [
      {
        status: 'div', value: 1,
      },
      {
        status: 'div', value: 2,
      },
      {
        status: 'div', value: 3,
      },
    ],
    doList: []
  })
  wrapper.vm.handleItemComplete(1)
  const undoList = wrapper.vm.undoList
  const doList = wrapper.vm.doList
  expect(undoList).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'div', value: 3,
    },
  ])
  expect(doList).toEqual([
    {
      status: 'div', value: 2,
    },
  ])
})

it('已完成列表 delete 时，列表会减少一个', () => {
  const wrapper = shallowMount(TodoList)
  wrapper.setData({
    doList: [
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
  })
  wrapper.vm.handleItemDoListDelete(1)
  const list = wrapper.vm.doList
  expect(list).toEqual([
    {
      status: 'div', value: 1,
    },
    {
      status: 'div', value: 3,
    },
  ])
})

it('获取数据， 触发 then', (done) => {
  const wrapper = shallowMount(TodoList)
  // 获取请求有 setTimeout 的话加速
  // jest.runAllTimers()
  wrapper.vm.getList('suc')
  wrapper.vm.$nextTick(() => {
    const undoList = wrapper.vm.undoList
    expect(undoList.length).toBe(2)
    done()
  })
})

it('获取数据，触发 catch', (done) => {
  const wrapper = shallowMount(TodoList)
  wrapper.vm.getList('fail')
  wrapper.vm.$nextTick(() => {
    const undoList = wrapper.vm.undoList
    expect(undoList.length).toBe(0)
    done()
  })
})


