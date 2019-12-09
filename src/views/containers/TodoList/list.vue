<template>
  <div class="todolist">
    <headers @add="addUndoItem"></headers>
    <undoList
      :list="undoList"
      @delete="handleItemDelete"
      @status="handleItemChangeStatus"
      @reset="handleItemChangeBlur"
      @change="handleItemChangeValue"
      @complete="handleItemComplete"
    ></undoList>
    <doList :list="doList" @delete="handleItemDoListDelete"></doList>
  </div>
</template>

<script>
import Headers from './components/Header'
import UndoList from './components/UndoList'
import DoList from './components/DoList'
import axios from 'axios'

export default {
  components: {
    headers: Headers,
    undoList: UndoList,
    doList: DoList
  },
  data() {
    return {
      undoList: [],
      doList: [],
    }
  },

  created() {

  },

  methods: {
    addUndoItem(item) {
      this.undoList.push({
        status: 'div',
        value: item
      })
    },
    handleItemDelete(index) {
      this.undoList.splice(index, 1)
    },
    handleItemChangeStatus(index) {
      this.$set(this.undoList, index, {
        ...this.undoList[index],
        status: 'input',
      })
    },
    handleItemChangeBlur(index) {
      this.$set(this.undoList, index, {
        ...this.undoList[index],
        status: 'div',
      })
    },
    handleItemChangeValue({ value, index }) {
      this.$set(this.undoList, index, {
        ...this.undoList[index],
        value,
      })
    },
    handleItemComplete(index) {
      const data = JSON.parse(JSON.stringify(this.undoList[index]))
      this.doList.push(data)
      this.handleItemDelete(index)
    },
    handleItemDoListDelete(index) {
      this.doList.splice(index, 1)
    },
    getList(type) {
      let url = type==='suc'?'/getUndolist.json':'/getUndolistFalid.json'
      axios.get(url).then(res => {
        this.undoList = res.list
      }).catch(e => {
        console.log('错误')
      })
    }

  },
}

</script>

<style lang='scss' scoped>
</style>