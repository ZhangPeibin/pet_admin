<template>
  <div class="custom-tree-node">
    <div  class="left">

      <div class="action">
        <el-button icon="el-icon-plus" @click="toAddDepartmentPage">新增部门</el-button>
        <el-button icon="el-icon-plus" @click="toDeleteDepartment">删除部门</el-button>

        <!--        <el-button type="primary" icon="el-icon-plus">新增部门</el-button>-->
      </div>

      <el-tree
        ref="tree"
        show-checkbox
        node-key="id"
        highlight-current
        :data="data1"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @check="check"
        class="filter-tree"
        default-expand-all
      >
      </el-tree>
    </div>

    <div class="right">
      <el-button icon="el-icon-plus">新增人员</el-button>
      <el-button plain icon="el-icon-delete">批量删除</el-button>

      <el-table
        class="member"
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="Author" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Pageviews" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="Status" width="110" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="Display_time" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import {list} from "@/api/department"
  import {getList} from "@/api/table";
  export default {
    data() {
      return {
        filterText: '',
        data1:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    created() {
      this.fetchTreeData()
      this.fetchData()
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      check(){
        const r = this.$refs.tree.getCurrentNode()
        // 通过监听有选择的节点没，如果有，则吧按钮显示出来
        // 如果没有选择的，那么就不显示按钮
      },

      toDeleteDepartment(){
        const r = this.$refs.tree.getCheckedNodes()
        console.log(r)
      },

      toAddDepartmentPage(){
        const r = this.$refs.tree.getCurrentNode()
        console.log(r)
        if(r){
          this.$router.push({name:'Create',params:{data:r}});
        }else{
          const d1 = this.data1[0];
          this.$router.push({name:'Create',params:{data:d1}});
        }

      },

      fetchTreeData() {
        this.listLoading = true
        list().then(response => {
          // this.data = response.data
          this.data1 = response.data
        })
      },

      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }

    }


  }
</script>

<style scoped>
  .action{
    margin-bottom:16px;
    margin-top: 32px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    justify-content:flex-start;
    font-size: 14px;
    padding-right: 8px;
  }
  .left{
    width: 300px;
    flex-grow: 1;
    margin-left: 32px;
    border-right: 2px solid lightgrey;

    margin-right: 32px;

  }
  .right{
    flex-grow: 2;
    padding-top: 64px;
  }

  .member{
    margin-top: 16px;
  }
</style>


