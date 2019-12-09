<template>
  <div class="dolist">
    <div>
      已完成:
      <span data-test="count">{{ list.length }}</span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in list" :key="index" data-test="item">
        <div data-test="item-value" class="text">{{ item.value }}</div>
        <div>
          <span data-test="delete-button" @click="handleDelete(index)" class="btn">删除</span>
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
  },
}

</script>

<style lang='scss' scoped>
.dolist {
  width: 600px;
  margin: 20px auto;
  .content {
    margin-top: 20px;
    li {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    .text {
      text-decoration: line-through;
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