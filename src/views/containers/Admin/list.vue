<template>
  <el-container style="min-width: 750px">
    <el-header style="height: auto">
      <el-form :model="search" inline>
        <el-form-item label="标题">
          <el-input v-model="search.title" placeholder="输入标题" style="width: 160px"></el-input>
        </el-form-item>

        <el-button type="primary" @click="getList(1)" id="getList">查询</el-button>
        <el-button type="primary" @click="addCount()" id="addCount">addCount</el-button>
        <el-button type="warning" @click="clearSearch()" id="clearSearch">清空</el-button>
        <el-button type="primary" @click="add()" id="add">新增</el-button>
        <el-button type="primary" @click="openDialog()" id="openDialog">打开弹窗</el-button>
      </el-form>
    </el-header>

    <el-main>
      <el-table :data="list" border stripe style="width: 100%" ref="table">
        <el-table-column label="id" min-width="120">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>

        <el-table-column label="标题" min-width="120">
          <template slot-scope="scope">
            <p>{{ scope.row.title }}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" size="small" @click="reverse(scope.row)" id="reverse">修改</el-button>
              <el-button
                type="danger"
                size="small"
                @click="deleteData(scope.row)"
                id="deleteData"
              >删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <el-pagination
        @size-change="getList"
        @current-change="getList"
        :current-page.sync="search.pagenum"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="status.total"
      ></el-pagination>
    </el-footer>

    <el-dialog :visible.sync="status.dialog" title="弹窗">
      <p>测试弹窗</p>
      <span slot="footer">
        <el-button @click="closeDialog" id="closeDialog">关闭</el-button>
      </span>
    </el-dialog>

    <div id="ab">
      ---
      {{a.b}}
      ---
    </div>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      search: {
        title: "",
        pagenum: 1,
      },
      status: {
        total: 0,
        dialog: false
      },
      list: [],
      count: 0,
      a: {
        
      }
    };
  },
  methods: {
    openDialog() {
      this.status.dialog = true
    },
    closeDialog() {
      this.status.dialog = false
    },
    clearSearch() {
      this.search.title = ''
      this.search.pagenum = 1
    },
    add() {
      this.$router.push({
        name: "adminForm",
      })
    },
    reverse(item) {
      this.$router.push({
        name: "adminForm",
        params: {
          id: item.id
        }
      })
    },
    deleteData() {
      this.$confirm(`确定要删除吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "warning"
      }).then(() => {
        this.getList(1)
      })
    },
    // 获取列表
    getList(pagenum) {
      this.search.pagenum = pagenum || this.search.pagenum
      return this.$api.test.getList(this.search).then(res => {
        this.count = res.data.length
        this.list = res.data
        this.status.total = res.total
      }).catch(err => {
        console.log(err);
      })
    },
    addCount() {
      this.a.b = 1
      this.a = Object.assign({}, this.a)
    }
  },
  created() {
    this.getList(1)
  },
};
</script>