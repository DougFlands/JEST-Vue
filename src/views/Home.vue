<template>
  <div class='page'>
    <el-button type="primary" @click="ng('adminList')">adminList</el-button>
    <el-button type="primary" @click="ng('todolist')">todolist</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  created() {

  },

  methods: {
    ng(name) {
      this.$router.push({
        name
      })
    }
  },
}

</script>

<style lang='scss' scoped>

</style>