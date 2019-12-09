import store from '../store'

it(`当store接收 changeInputValue 的 commit 时 inputValue 发生变化`, () => {
  const value = {
    target: {
      value: '123'
    }
  }
  store.commit('changeInputValue', value)
  expect(store.state.inputValue).toBe('123')
})









