<template>
  <div class="app-container">
    <el-row :gutter="30" class="filter-container">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-layout">
          <span class="key">车棚名称：</span>
          <el-input v-model="searchCarNameKey" class="input-search" placeholder="请输入车棚名称" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-layout">
          <span class="key-middle">车棚联系人：</span>
          <el-input v-model="searchOperationsNameKey" class="input-search" placeholder="请输入车棚联系人" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div class="item-layout">
          <span class="key">小区名称：</span>
          <el-input v-model="searchHouseNameKey" class="input-search" placeholder="请输入小区名称" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="flex">
        <el-button type="primary" @click="onLoadBikeShedData">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-col>
    </el-row>

    <el-table :key="bikeShedListKey" v-loading="bikeShedListLoading" :data="bikeShedList" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="carCode" label="车棚编码" min-width="200" />
      <el-table-column prop="carName" label="车棚名称" min-width="100" />
      <el-table-column prop="regionHouseName" label="所属小区" min-width="200" />
      <el-table-column prop="carAddress	" label="小区地址" min-width="200" />
      <el-table-column prop="operationsPhone" label="车棚负责人电话" min-width="120" />
      <el-table-column prop="operationsName" label="车棚联系人" min-width="120" />
      <el-table-column prop="createTime" label="车棚创建时间" min-width="160" />
      <el-table-column fixed="right" prop="operation" label="操作" min-width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="onBikeShedEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="onShowAddDeviceDialog(scope.$index, scope.row)">新增设备</el-button>
          <el-button size="mini" type="danger" @click="onBikeShedDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="pageNo" :limit.sync="pageSize" @pagination="onLoadBikeShedData" />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

import {
  queryCarPortPage, // 加载车棚列表
  delCarPort, //删除车棚
} from "@/api/basics/bikeShed";

export default {
  name: "BikeShed",
  components: { Pagination },
  data() {
    return {
      searchCarNameKey: null, // 车棚名称搜索 key
      searchOperationsNameKey: null, // 车棚联系人搜索 key
      searchHouseNameKey: null, // 小区名称搜索 key
      bikeShedListLoading: true, // 表单加载状态控制
      total: 0, // 总页数
      pageSize: 10, // 分页大小
      pageNo: 1, // 分页页码
      bikeShedListKey: null, // 更新列表的key
      bikeShedList: null, // 车棚集合
    };
  },
  mounted() {},
  created() {
    this.onLoadBikeShedData();
  },
  methods: {
    /** 搜索车棚 */
    onLoadBikeShedData() {},

    /** 获取车棚列表 */
    onLoadBikeShedData() {
      var that = this;

      var queryData = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      };

      // 搜索车棚名称关键字
      if (!this.isEmpty(this.searchCarNameKey)) {
        queryData.carName = this.searchCarNameKey;
      }
      // 搜索车棚联系人关键字
      if (!this.isEmpty(this.searchOperationsNameKey)) {
        queryData.operationsName = this.searchOperationsNameKey;
      }
      // 搜索小区名称关键字
      if (!this.isEmpty(this.searchHouseNameKey)) {
        queryData.regionHouseName = this.searchHouseNameKey;
      }
      this.bikeShedListLoading = true;
      queryCarPortPage(queryData)
        .then((result) => {
          that.bikeShedListLoading = false;
          that.total = result.count; // 统计总数
          if (!that.isEmpty(result.rows)) {
            result.rows.forEach((item) => {
              item.createTime = that.timeStampToStr(item.createTime, "-");
            });
          }
          that.bikeShedList = result.rows;
        })
        .catch((err) => {
          that.bikeShedListLoading = false;
        });
    },

    /**显示新增设备对话框 */
    onShowAddDeviceDialog() {},

    /**添加设备 */
    onBikeShedAdd() {},

    /**编辑车棚 */
    onBikeShedEdit() {},

    /**删除车棚 */
    onBikeShedDelete(index, item) {
      var that = this;

      this.$confirm("是否删除该车棚信息?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var queryData = {
            carPortId: item.id,
          };
          delCarPort(queryData).then((result) => {
            that.bikeShedList.splice(index, 1);
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },

    /** 重置按钮 */
    onReset() {
      this.searchCarNameKey = null;
      this.searchOperationsNameKey = null;
      this.searchHouseNameKey = null;
    },
  },
};
</script>

<style lang="less" scoped>
.filter-container {
  display: flex;
}
.item-layout {
  flex: 1;
  display: flex;
  align-items: center;

  .key {
    width: 80px;
  }

  .key-middle {
    width: 100px;
  }

  .input-search {
    flex: 1;
  }
}
</style>
