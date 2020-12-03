<template>
  <div class="app-container">
    <div class="filter-container">
      <span>快速查询：</span>
      <el-input
        class="input-search"
        v-model="searchKey"
        placeholder="请输入小区名称"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-button type="primary" @click="onLoadHousingEstateData"
        >搜索</el-button
      >
      <el-button>重置</el-button>
      <div class="flex-1"></div>
      <el-button type="success" @click="onHousingEstateAdd">新增</el-button>
    </div>
    <el-table
      :key="housingEstateListKey"
      :data="housingEstateList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      v-loading="housingEstateListLoading"
    >
      <el-table-column prop="province" label="省" min-width="100">
      </el-table-column>
      <el-table-column prop="city" label="市" min-width="100">
      </el-table-column>
      <el-table-column prop="region" label="区" min-width="100">
      </el-table-column>
      <el-table-column prop="houseName" label="小区名称" min-width="200">
      </el-table-column>
      <el-table-column prop="houseAddr" label="小区地址" min-width="200">
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
          <el-button
            size="mini"
            @click="onHousingEstateEdit(scope.$index, scope.row)"
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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="onLoadHousingEstateData"
    />

    <el-dialog title="新增小区" :visible.sync="isShowDialogAddHousingEstate">
      <el-form
        ref="addHousingEstateRef"
        :rules="addHousingEstateRules"
        :model="NewHousingEstate"
        label-position="left"
        label-width="130px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="小区所在省" prop="province">
          <el-select
            v-model="NewHousingEstate.province"
            class="filter-item"
            placeholder="请选择所在省份"
            @change="onProvinceSelectChange"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="小区所在市" prop="city">
          <el-select
            v-model="NewHousingEstate.city"
            class="filter-item"
            placeholder="请选择所在市"
            @change="onCitySelectChange"
          >
            <el-option
              v-for="item in cityList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="小区所在区" prop="region">
          <el-select
            v-model="NewHousingEstate.region"
            class="filter-item"
            placeholder="请选择所在区"
          >
            <el-option
              v-for="item in regionList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="小区名字" prop="houseName">
          <el-input
            v-model="NewHousingEstate.houseName"
            placeholder="请输入小区名字"
          />
        </el-form-item>
        <el-form-item label="小区地址" prop="houseAddr">
          <el-input
            v-model="NewHousingEstate.houseAddr"
            placeholder="请输入小区地址"
          />
        </el-form-item>
        <el-form-item label="小区联系电话" prop="housePhone">
          <el-input
            v-model="NewHousingEstate.housePhone"
            placeholder="请输入小区联系电话"
          />
        </el-form-item>
        <el-form-item label="小区负责人" prop="houseContractorName">
          <el-input
            v-model="NewHousingEstate.houseContractorName"
            placeholder="请输入小区负责人"
          />
        </el-form-item>
        <el-form-item label="运维负责人" prop="operationsName">
          <el-input
            v-model="NewHousingEstate.operationsName"
            placeholder="请输入运维负责人"
          />
        </el-form-item>
        <el-form-item label="运维负责人电话" prop="operationsPhone">
          <el-input
            v-model="NewHousingEstate.operationsPhone"
            placeholder="请输入运维负责人电话"
          />
        </el-form-item>
        <el-form-item label="备注" prop="bak">
          <el-input
            v-model="NewHousingEstate.bak"
            placeholder="请输入备注"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialogAddHousingEstate = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'add' ? onAddHousingEstate() : onUpdateHousingEstate()"
        >
          添加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

import {
  queryRegionHousePage, //加载小区列表
  queryAllProvince, //加载省
  queryCityByProvince, //加载市
  queryRegionByCity, //加载区
  saveRegionHouse, //新增小区
} from "@/api/basics/housingEstate";

export default {
  name: "HousingEstate",
  data() {
    return {
      searchKey: "", //搜索关键字
      housingEstateListLoading: true, //表单加载状态控制
      total: 0, //总页数
      pageSize: 10, //分页大小
      pageNo: 1, //分页页码
      housingEstateList: null, //小区集合
      housingEstateListKey: 0, //更新列表的key
      provinceList: null, //省份集合
      cityList: null, //省份下市集合
      regionList: null, //市下面区域集合
      dialogStatus: "", //小区对话框状态  add: 新增 | update:更新
      isShowDialogAddHousingEstate: false, //是否显示新增小区对话框
      addHousingEstateRules: {
        province: [
          { required: true, message: "请选择所在省份", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择所在市", trigger: "change" }],
        region: [
          { required: true, message: "请选择所在区", trigger: "change" }
        ],
        houseName: [
          { required: true, message: "请输入小区名称", trigger: "blur" }
        ],
        houseAddr: [
          { required: true, message: "请输入小区地址", trigger: "blur" }
        ],
        housePhone: [
          { required: true, message: "请输入小区联系电话", trigger: "blur" }
        ],
        houseContractorName: [
          { required: true, message: "请输入小区联系人", trigger: "blur" }
        ],
        operationsName: [
          { required: true, message: "请输入运维负责人", trigger: "blur" }
        ],
        operationsPhone: [
          { required: true, message: "请输入运维负责人电话", trigger: "blur" }
        ]
      }, //表单验证规则
      NewHousingEstate: {} //新增小区默认对象
    };
  },
  components: { Pagination },
  mounted() {},
  created() {
    //加载小区
    this.onLoadHousingEstateData();
    //加载省份
    this.onLoadAllProvinceData(false);
  },
  methods: {
    /**获取小区列表 */
    onLoadHousingEstateData() {
      var that = this;

      var queryData = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      };

      if (!this.isEmpty(this.searchKey)) {
        queryData.houseName = this.searchKey;
      }
      this.housingEstateListLoading = true;
      queryRegionHousePage(queryData).then(result => {
        that.housingEstateListLoading = false;
        that.total = result.count; //统计总数
        that.housingEstateList = result.rows;
      });
    },

    /**编辑小区资料 */
    onHousingEstateEdit() {},

    /**新增小区资料 */
    onHousingEstateAdd() {
      //先判断省份是否加载完成
      if (!this.isEmpty(this.provinceList)) {
        this.dialogStatus = "add";
        this.isShowDialogAddHousingEstate = true;
      } else {
        this.onLoadAllProvinceData(true);
      }
    },

    /**新增小区 */
    onAddHousingEstate() {
      var that = this;
      this.$refs['addHousingEstateRef'].validate((valid) => {
        if (valid) {
          var queryData = {
            province: that.NewHousingEstate.province,
            city: that.NewHousingEstate.city,
            region: that.NewHousingEstate.region,
            houseName: that.NewHousingEstate.houseName,
            houseAddr: that.NewHousingEstate.houseAddr,
            housePhone: that.NewHousingEstate.housePhone,
            houseContractorName: that.NewHousingEstate.houseContractorName,
            operationsName: that.NewHousingEstate.operationsName,
            operationsPhone: that.NewHousingEstate.operationsPhone,
            bak: that.NewHousingEstate.bak,
          };

          saveRegionHouse(queryData).then(result => {
                that.housingEstateList.unshift(this.NewHousingEstate);
                that.isShowDialogAddHousingEstate = false;
                this.$notify({
                  title: '温馨提示',
                  message: '小区添加成功!',
                  type: 'success',
                  duration: 2000
                })
          });
        }
      })
    },

    /**更新小区 */
    onUpdateHousingEstate(){

    },

    /**加载所有省份 */
    onLoadAllProvinceData(isShowDialog) {
      var that = this;
      queryAllProvince().then(result => {
        that.provinceList = result.data;
        if (isShowDialog) {
          that.onHousingEstateAdd();
        }
      });
    },

    /**所在省变动监听 */
    onProvinceSelectChange(provinceId) {
      var that = this;

      if (!this.isEmpty(provinceId)) {
        var queryData = {
          provinceId: provinceId
        };
        queryCityByProvince(queryData).then(result => {
          that.cityList = result.data;
        });
      }
    },

    /**所在市变动监听 */
    onCitySelectChange(cityId) {
      var that = this;

      if (!this.isEmpty(cityId)) {
        var queryData = {
          cityId: cityId
        };

        queryRegionByCity(queryData).then(result => {
          that.regionList = result.data;
        });
      }
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
