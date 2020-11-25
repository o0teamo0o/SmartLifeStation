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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="province" label="省" width="180">
      </el-table-column>
      <el-table-column prop="city" label="市" width="180"> </el-table-column>
      <el-table-column prop="area" label="区"> </el-table-column>
      <el-table-column prop="communityName" label="小区名称"> </el-table-column>
      <el-table-column prop="address" label="小区地址"> </el-table-column>
      <el-table-column prop="communityNumber" label="小区联系电话">
      </el-table-column>
      <el-table-column prop="contacts" label="小区联系人"> </el-table-column>
      <el-table-column prop="personnel" label="运维负责人"> </el-table-column>
      <el-table-column prop="personnelNumber" label="运维负责人电话">
      </el-table-column>
      <el-table-column prop="time" label="加入时间"> </el-table-column>
      <el-table-column prop="operation" label="操作">
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
import { getHousingEstateList } from "@/api/basics/housingEstate";

export default {
  name: "HousingEstate",
  data() {
    return {
      searchKey: ""
    };
  },
  mounted() {},
  created() {
    this.onLoadHousingEstateData();
  },
  methods: {
    onLoadHousingEstateData() {
      getHousingEstateList().then(result => {
        console.error("result:", result);
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
