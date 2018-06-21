<template>
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="title">
          <h4>选择职业</h4>
          <span @click="closeAdd()">×</span>
        </section>
        <section class="title">
          <div class="area" @click="provinceSelected()">{{Province?Province:'请选择'}}</div>
          <div class="area" @click="citySelected()" :class="City?'':'active'" v-show="Province">{{City?City:'请选择'}}</div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
          <div class="area" @click="otherSelected()" :class="Other?'':'active'" v-show="District">{{Other?Other:'请选择'}}</div>
        </section>
        <ul>
          <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)"v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showOtherList" @click="getOtherId(v.id, v.name, k)" v-show="showOther" :class="v.selected ? 'active' : ''">{{v.name}}</li>
        </ul>
      </section>
    </section>
</template>

<script>
    export default {
  name: 'myAddress',
  data () {
    return {
        showChose: true,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showOther: false, // other
        showCityList: false,
        showDistrictList: false,
        showOtherList: false,
        province: 1,
        city: 0,
        district: 0,
        other: 0,
        GetProvinceId: 0,
        Other: false,
        District: false,
        Province: false,
        City: false,
        // v-for循环判断是否为当前
        selected: false,
        info: [
            {
                id: 1,
                name: '北京',
                city: [
                        {
                            id: 1,
                            name: '北京市',
                            district: [
                                {
                                    id: 1,
                                    name: '东城区',
                                    other: [
                                    {
                                        id: 11,
                                        name: '第四季'
                                    }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
  },
  methods: {
    choseAdd: function() {
      this.showChose = true;
    },
    closeAdd: function() {
      this.showChose = false;
    },
    _filter(add,name,code) {
        console.log("add:" + add);
        console.log("name:" + name);
        console.log("code:" + code);
      let result = [];
      for(let i=0;i<add.length;i++) {
        if(code == add[i].id){
          result = add[i][name];
        }
      }
      return result;
    },
    getProvinceId: function(code,input,index) {
      this.province = code;
      this.Province = input;
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
      this.showOther = false;
      this.showCityList = this._filter(this.info,'city',this.province);
      // 点击选择当前
      this.info.map( a => a.selected = false );
      this.info[index].selected = true;
    },
    provinceSelected: function() {
      // 清除市级和区级和街道列表
      this.showCityList = false;
      this.showDistrictList = false;
      this.showOtherList = false;
      // 清除市级和区级和街道选项
      this.City = false;
      this.District = false;
      this.OtherList = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
      this.showOhter = false;
    },
    getCityId: function(code, input, index) {
      this.city = code;
      this.City = input;
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
      this.showOther = false;
      this.showDistrictList = this._filter(this.showCityList,'district',this.city);
      // 选择当前添加active
      this.showCityList.map( a => a.selected = false );
      this.showCityList[index].selected = true;
    },
    citySelected: function() {
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
      this.showOther = false;
    },
    getDistrictId: function(code, input, index) {
      this.district = code;
      this.District = input;
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = false;
      this.showOther = true;
      this.showOtherList = this._filter(this.showDistrictList,'other',this.district);
      // 选择当前添加active
      this.showDistrictList.map( a => a.selected = false );
      this.showDistrictList[index].selected = true;
    },
    districtSelected: function() {
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
      this.showOther = false;
    },
    getOtherId: function(code, input, index) {
      this.other = code;
      this.Other = input;
      // 选择当前添加active
      this.showOtherList.map( a => a.selected = false );
      this.showOtherList[index].selected = true;
      // 选取市区选项之后关闭弹层
      this.showChose = false;
    },
    OtherSelected: function() {
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = false;
      this.showOther = true;
    }
  }
}
</script>

<style>
.showChose{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:120;
  background:rgba(0,0,0,0.5)
}
.address{
  position:absolute;
  bottom:0;
  left:0;
  z-index:121;
  background:#fff;
  width:100%;
}
.title h4{
  display:inline-block;
  margin-left:3.2rem;
  font-size:0.32rem;
  line-height:0.88rem;
  font-weight:normal;
  color:#999;
}
.title span{
  margin:0.42rem 0 0 2.2rem;
  font-size:0.45rem;
  line-height:0.34rem;
  color:#D8D8D8;
}
.area{
  display:inline-block;
  font-size:0.24rem;
  line-height:0.88rem;
  margin-left:0.42rem;
  color:#333;
}
.addList{
  width:100%;
  padding-left:0.32rem;
  font-size:0.34rem;
  line-height:0.88rem;
  color:#333;
}
/* 修改的格式 */
.address ul{
  width:95%;
  height:100%;
  max-height: 4.4rem;
  overflow:auto;
}
.address ul li{
  margin-left:5%;
}
.address .title .active{
  color:#0071B8;
  border-bottom:0.02rem solid #0071B8;
}
.address ul .active{
  color:#0071B8;
}
</style>