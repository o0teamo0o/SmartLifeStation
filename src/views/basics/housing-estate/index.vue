<template>
  <div class="app-container">
    <div class="filter-container">
      <span>快速查询：</span>
      <el-input
        class="input-search"
        v-model="searchKey"
        placeholder="请输入小区名称"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
      <div class="flex-1"></div>
      <el-button type="success">新增</el-button>
    </div>
    <el-table :data="housingEstateList" border style="width: 100%">
      <el-table-column prop="province" label="省" min-width="100">
      </el-table-column>
      <el-table-column prop="city" label="市" min-width="100">
      </el-table-column>
      <el-table-column prop="region" label="区" min-width="100">
      </el-table-column>
      <el-table-column prop="houseName" label="小区名称" min-width="200">
      </el-table-column>
      <el-table-column prop="houseAddr" label="小区地址" min-width="300">
      </el-table-column>
      <el-table-column prop="housePhone" label="小区联系电话" min-width="120">
      </el-table-column>
      <el-table-column
        prop="houseContractorName"
        label="小区联系人"
        min-width="120"
      >
      </el-table-column>
      <el-table-column prop="operationsName" label="运维负责人" min-width="120">
      </el-table-column>
      <el-table-column
        prop="operationsPhone"
        label="运维负责人电话"
        min-width="120"
      >
      </el-table-column>
      <el-table-column prop="createTime" label="加入时间" min-width="120">
      </el-table-column>
      <el-table-column prop="operation" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryRegionHousePage } from "@/api/basics/housingEstate";

export default {
  name: "HousingEstate",
  data() {
    return {
      searchKey: "", //搜索关键字
      pageSize: 10, //分页大小
      pageNo: 1, //分页页码
      housingEstateList: null //小区集合
    };
  },
  mounted() {},
  created() {
    this.onLoadHousingEstateData();
  },
  methods: {
    onLoadHousingEstateData() {
      var that = this;
      queryRegionHousePage().then(result => {
        if (result.rows.length > 0) {
          that.housingEstateList = result.rows;
        }
      });
    }
  }
};
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
}

.input-search {
  width: 20vw;
  margin-right: 3vw;
}
</style>
