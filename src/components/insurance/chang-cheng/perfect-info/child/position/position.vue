<template>
<div class="warp">
    <div class="detail">
      <div class="info">
        <p class="desTitle desPosition">职业名称</p>
        <p class="placeholders" @click='choosePosition'>
          <span id='tianCarAddress' class="normal" :class="{'active': positionValue === '请选择职业名称'}">{{positionValue}}</span>
        </p>
      </div>
    </div>
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="title">
          <h4>选择职业</h4>
          <span @click="closeAdd()">×</span>
        </section>
        <section class="title">
          <div class="area" @click="firstSelected()">职业大类：{{First?First:'请选择'}}</div>
          <div class="area" @click="secondSelected()" :class="Second?'':'active'" v-show="First">职业中类：{{Second?Second:'请选择'}}</div>
          <div class="area" @click="thirdSelected()" :class="Third?'':'active'" v-show="Second">职业小类：{{Third?Third:'请选择'}}</div>
          <div class="area" @click="fourthSelected()" :class="Fourth?'':'active'" v-show="Third">职业细类：{{Fourth?Fourth:'请选择'}}</div>
        </section>
        <ul>
          <li class="addList" v-for="(v,k) in info" @click="getFirstId(v.id, v.name, k)" v-show="showFirst" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showSecondList" @click="getSecondId(v.id, v.name, k)" v-show="showSecond" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showThirdList" @click="getThirdId(v.id, v.name, k)"v-show="showThird" :class="v.selected ? 'active' : ''">{{v.name}}</li>
          <li class="addList" v-for="(v,k) in showFourthList" @click="getFourthId(v.id, v.name, k)" v-show="showFourth" :class="v.selected ? 'active' : ''">{{v.name}}</li>
        </ul>
      </section>
    </section>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
    export default {
      name: 'myAddress',
      props: {
          Info: {
              type: Object,
              default: function () {
                  return {}
              }
          }
      },
      computed: {
            ...mapGetters([
              'changChengBaseInfo'
            ]),
            info () {
              return this.Info.joblist
            }
      },
      created () {
        this.setDefalut()
      },
      data () {
        return {
            positionValue: '请选择职业名称',
            showChose: false,
            showFirst: true,
            showSecond: false,
            showThird: false,
            showFourth: false, // other
            showSecondList: false,
            showThirdList: false,
            showFourthList: false,
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            First: false,
            Second: false,
            Third: false,
            Fourth: false,
            // v-for循环判断是否为当前
            selected: false
            }
      },
      methods: {
        choosePosition () {
          this.showChose = true
        },
        setDefalut () {
            this.positionValue = this.Info.defaultJob === '' ? '请选择职业名称' : this.Info.defaultJob
        },
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
        getFirstId: function(code,input,index) {
          this.first = code;
          this.First = input;
          this.showFirst = false;
          this.showSecond = true;
          this.showThird = false;
          this.showFourth = false;
          this.showSecondList = this._filter(this.info,'child',this.first);
          // 点击选择当前
          this.info.map( a => a.selected = false );
          this.info[index].selected = true;
        },
        firstSelected: function() {
          // 清除市级和区级和街道列表
          this.showSecondList = false;
          this.showThirdList = false;
          this.showFourthList = false;
          // 清除市级和区级和街道选项
          this.Second = false;
          this.Third = false;
          this.Fourth = false;
          // 选项页面的切换
          this.showFirst = true;
          this.showSecond = false;
          this.showThird = false;
          this.showFourth = false;
        },
        getSecondId: function(code, input, index) {
          this.second = code;
          this.Second = input;
          this.showFirst = false;
          this.showSecond = false;
          this.showThird = true;
          this.showFourth = false;
          this.showThirdList = this._filter(this.showSecondList,'child',this.second);
          // 选择当前添加active
          this.showSecondList.map( a => a.selected = false );
          this.showSecondList[index].selected = true;
        },
        secondSelected: function() {
          this.showFirst = false;
          this.showSecond = true;
          this.showThird = false;
          this.showFourth = false;
        },
        getThirdId: function(code, input, index) {
          this.third = code;
          this.Third = input;
          this.showFirst = false;
          this.showSecond = false;
          this.showThird = false;
          this.showFourth = true;
          this.showFourthList = this._filter(this.showThirdList,'child',this.third);
          // 选择当前添加active
          this.showThirdList.map( a => a.selected = false );
          this.showThirdList[index].selected = true;
        },
        thirdSelected: function() {
          this.showFirst = false;
          this.showSecond = false;
          this.showThird = true;
          this.showFourth = false;
        },
        getFourthId: function(code, input, index) {
          this.fourth = code;
          this.Fourth = input;
          if (this.Info.type === 'applicant') {
            this.setChangChengBaseInfo({
              field1: 'applicantJob',
              value: input
            })
          } else {
            this.setChangChengBaseInfo({
              field1: 'induredJob',
              value: input
            })
          }
          this.setChangChengBaseInfo({
            field1: this.Info.type,
            field2: 'jodCode',
            value: code.toString()
          })
          // this.setChangChengBaseInfo({
          //   field1: 'applicantJob',
          //   value: input
          // })
          this.positionValue = input
          // 选择当前添加active
          this.showFourthList.map( a => a.selected = false );
          this.showFourthList[index].selected = true;
          // 选取市区选项之后关闭弹层
          this.showChose = false;
        },
        fourthSelected: function() {
          this.showFirst = false;
          this.showSecond = false;
          this.showThird = false;
          this.showFourth = true;
        },
        ...mapMutations({
          setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
        })
      }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
@import '~common/stylus/variable.styl'
  .detail
    .info
      .placeholdersAdd
        line-height: (52/$scale)
  .showChose
      width:100%
      height:100%
      position:fixed
      top:0
      left:0
      z-index:120
      background:rgba(0,0,0,0.5)
      .address
        position:absolute
        bottom:0
        left:0
        z-index:121
        background:#fff
        width:100%
        .bigTitle
          background: #f6f6f6
          height: (94/$scale)
          line-height: (94/$scale)
          font-size: 0
          text-align: center
          border-bottom: 1px solid #DCDCDC
        .title
          >h4
            display:inline-block;
            margin-right:(-10/$scale);
            font-size:0.32rem;
            line-height:0.88rem;
            color:#333;
          >span
            font-size:0.45rem;
            color:#D8D8D8;
            margin-right:(10/$scale)
            float: right;
          .area
            display:block;
            font-size:0.30rem;
            line-height:0.88rem;
            margin-left:0.42rem;
            color:#333;
            &.active
              color:$color-theme;
              border-bottom:0.02rem solid $color-theme;
        >ul
          width:95%;
          height:100%;
          max-height: 4.4rem;
          overflow:auto;
          &.active
            color:$color-theme;
          >li
              margin-left:5%;
              font-size:0.32rem;
          .addList
            width:100%;
            padding-left:0.32rem;
            font-size:0.28rem;
            line-height:0.88rem;
            color:#222;
</style>