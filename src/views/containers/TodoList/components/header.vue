<template>
  <div class="header">
    <div class="content">
      TodoList
      <!-- 原版 -->
      <!-- <input
        type="text"
        data-test="header-input"
        v-model="inputValue"
        @keyup.enter="addTodoItem"
        placeholder="todo item"
      /> -->
      <!-- vuex 版 -->
      <input
        type="text"
        data-test="header-input"
        :value="inputValue"
        @input="changeInputValue"
        @keyup.enter="addTodoItem"
        placeholder="todo item"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      // inputValue: ''
    };
  },

  computed: {
    ...mapState({
      inputValue: state => state.inputValue
    })
  },  

  created() {

  },

  methods: {
    ...mapMutations(["changeInputValue"]),
    addTodoItem() {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.changeInputValue({
          target: {
            value: ''
          }
        })
        // this.inputValue = ''
      }
    },
  },
}

</script>

<style lang='scss' scoped>
.header {
  background: #666;
  height: 60px;
  display: flex;
  align-items: center;
  .content {
    width: 600px;
    margin: 0 auto;
    color: #333;
    font-size: 24px;
  }
  input {
    width: 360px;
    outline: none;
    margin-left: 100px;
    text-indent: 8px;
  }
}
</style>