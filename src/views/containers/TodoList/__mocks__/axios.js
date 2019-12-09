const todolist = {
  list: [
    {
      "status": "div",
      "value": "123"
    },
    {
      "status": "div",
      "value": "456"
    },
  ]
}

export default {
  get(url) {
    if (url === '/getUndolist.json') {
      return new Promise((resolve, rej) => {
        resolve(todolist)
      })
    }
    if (url === '/getUndolistFalid.json') {
      return new Promise((resolve, rej) => {
        rej()
      })
    }
  }
}
