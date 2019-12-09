<template>
  <div class="undolist">
    <div>
      正在进行:
      <span data-test="count">{{ list.length }}</span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in list" :key="index" data-test="item">
        <div
          data-test="item-value"
          v-if="item.status === 'div'"
          @click="handleChangeStatus(index)"
        >{{ item.value }}</div>
        <input
          data-test="undo-input"
          v-else
          type="text"
          :value="item.value"
          @blur="handleInputBlur(index)"
          @change="$event => handleChangeValue($event.target.value, index)"
        />
        <div>
          <span data-test="delete-button" @click="handleDelete(index)" class="btn">删除</span>
          <span data-test="complete-button" @click="handleComplete(index)" class="btn">已完成</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    };
  },

  created() {

  },

  methods: {
    handleDelete(index) {
      this.$emit('delete', index)
    },
    handleChangeStatus(index) {
      this.$emit('status', index)
    },
    handleInputBlur(index) {
      this.$emit('reset', index)
    },
    handleChangeValue(value, index) {
      this.$emit('change', {
        value,
        index
      })
    },
    handleComplete(index) {
      this.$emit('complete', index)
    }

  },
}

</script>

<style lang='scss' scoped>
.undolist {
  width: 600px;
  margin: 20px auto;
  .content {
    margin-top: 20px;
    li {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .btn {
      cursor: pointer;
      margin-left: 20px;
      &:nth-child(1) {
        color: red;
      }
    }
  }
}
</style>