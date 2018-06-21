<template>
<div class="warp">
    <div class="detail">
      <div class="info lastInfo">
        <p class="desTitle desPosition">职业名称</p>
        <p class="placeholders" :class="{'placeholdersAdd': positionValue.length > 14}"  @click='choosePosition'>
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
        </section>
        <ul>
          <li class="addList" v-for="(v,k) in info" @click="getFirstId(v.id, v.value, k)" v-show="showFirst" :class="v.selected ? 'active' : ''">{{v.value}}</li>
          <li class="addList" v-for="(v,k) in showSecondList" @click="getSecondId(v.id, v.value, k)" v-show="showSecond" :class="v.selected ? 'active' : ''">{{v.value}}</li>
          <li class="addList" v-for="(v,k) in showThirdList" @click="getThirdId(v.id, v.value, k)"v-show="showThird" :class="v.selected ? 'active' : ''">{{v.value}}</li>
        </ul>
      </section>
    </section>
    <confirm  ref="confirm" :text="confirmText"></confirm>
</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {setBenRen} from 'common/js/mixin.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
    export default {
      name: 'myAddress',
      mixins: [setBenRen, confirm],
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
              'guangdaPolicy'
            ]),
            info () {
              return this.guangdaPolicy.DicList.occupations
            },
            edit () {
            if (this.Info.type === 'appnt' || this.Info.type === 'insurants' ) {
                return false
            } else if (this.Info.type === 'insured' &&  this.Info.defaultRelationId === '00') {
                return false
            } else {
                return true
            }
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
            showSecondList: false,
            showThirdList: false,
            first: 0,
            second: 0,
            third: 0,
            fourth: 0,
            First: false,
            Second: false,
            Third: false,
            Fourth: false,
            selected: false,
            appntoccupationType: 0,
            insuredoccupationType: 0
            }
      },
      methods: {
        choosePosition () {
          if (this.edit) {
              this.showChose = true
          }
        },
        setDefalut () {
            this.positionValue = (this.Info.defaultoccupationName === undefined ||this.Info.defaultoccupationName === '') ? '请选择职业名称' : this.Info.defaultoccupationName
        },
        choseAdd: function () {
            this.showChose = true
        },
        closeAdd: function () {
              this.showChose = false
        },
        _filter (add, name, code) {
          let result = []
          for (let i = 0; i < add.length; i++) {
            if (code === add[i].id) {
              result = add[i][name]
            }
          }
          return result
        },
        getFirstId: function (code, input, index) {
          this.first = code
          this.First = input
          this.showFirst = false
          this.showSecond = true
          this.showThird = false
          this.showSecondList = this._filter(this.info, 'child', this.first)
          this.info[index].selected = true
        },
        firstSelected: function () {
          // 清除市级和区级和街道列表
          this.showSecondList = false
          this.showThirdList = false
          // 清除市级和区级和街道选项
          this.Second = false
          this.Third = false
          this.Fourth = false
          // 选项页面的切换
          this.showFirst = true
          this.showSecond = false
          this.showThird = false
        },
        getSecondId: function (code, input, index) {
          this.second = code
          this.Second = input
          this.showFirst = false
          this.showSecond = false
          this.showThird = true
          this.showThirdList = this._filter(this.showSecondList, 'child', this.second)
          // 选择当前添加active
          this.showSecondList[index].selected = true
        },
        secondSelected: function () {
          this.showFirst = false
          this.showSecond = true
          this.showThird = false
        },
        getThirdId: function (code, input, index) {
          let num = input.replace(/[^0-9]/ig,""); 
          if (num === '' || parseInt(num) >= 7) {
              this.showConfirm('拒保类职业不可投保')
              return false
          } else {
            if (this.Info.type === 'applicant') {
              this.appntoccupationType = parseInt(num)
            } else if (this.Info.type === 'insured') {
              this.insuredoccupationType = parseInt(num)
            }
          }
          this.third = code
          this.Third = input
          this.positionValue = input
          this.showThirdList[index].selected = true
          this.showChose = false
          if (this.Info.defaultRelationId === '00') {
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 2,
                  field1: 'categories',
                  value: parseInt(this.appntoccupationType)
               })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  field1: 'applicantJob',
                  value: input
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  field1: 'insuredJob',
                  value: input
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 1,
                  field1: 'applicant',
                  field2: 'occupationCode',
                  value: code.toString()
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 1,
                  field1: 'insured',
                  field2: 'occupationCode',
                  value: code.toString()
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'appnt',
                  field2: 'occupationCode',
                  value: code.toString()
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'appnt',
                  field2: 'occupationType',
                  value: this.appntoccupationType
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'appnt',
                  field2: 'appOccupation',
                  value: input
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'insurants',
                  field2: 'insurant#0',
                  field3: 'occupationCode',
                  value: code.toString()
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'insurants',
                  field2: 'insurant#0',
                  field3: 'occupationType',
                  value: this.appntoccupationType
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'insurants',
                  field2: 'insurant#0',
                  field3: 'insOccupation',
                  value: input
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储职业类别
                  type: 2,
                  field1: 'categories',
                  value: this.appntoccupationType
                })
          } else {
            if (this.Info.type === 'applicant') {
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    field1: 'applicantJob',
                    value: input
                })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'appnt',
                  field2: 'occupationCode',
                  value: code.toString()
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'appnt',
                  field2: 'occupationType',
                  value: this.appntoccupationType
              })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'appnt',
                  field2: 'appOccupation',
                  value: input
              })
            } else {
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    field1: 'insuredJob',
                    value: input
                })
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'insurants',
                  field2: 'insurant#0',
                  field3: 'occupationCode',
                  value: code.toString()
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'insurants',
                  field2: 'insurant#0',
                  field3: 'occupationType',
                  value: this.insuredoccupationType
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 4,
                  field1: 'insurants',
                  field2: 'insurant#0',
                  field3: 'insOccupation',
                  value: input
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({ // 存储职业类别
                    type: 2,
                    field1: 'categories',
                    value: this.insuredoccupationType
                })
            }
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                  type: 1,
                  field1: this.Info.type,
                  field2: 'occupationCode',
                  value: code.toString()
              })
          }
        },
        thirdSelected: function () {
          this.showFirst = false
          this.showSecond = false
          this.showThird = true
        },
        setSame () {
            this.positionValue = this.guangdaPolicy.applicantJob
        },
        clearSame () {
            this.positionValue = '请选择职业名称'
        },
        ...mapMutations({
           SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
        })
      },
      components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
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
        .title
          >h4
            display:inline-block;
            margin-left:3.2rem;
            font-size:0.32rem;
            line-height:0.88rem;
            font-weight:normal;
            color:#999;
          >span
            margin:0.42rem 0 0 2.2rem;
            font-size:0.45rem;
            line-height:0.34rem;
            color:#D8D8D8;
          .area
            display:block;
            font-size:0.24rem;
            line-height:0.88rem;
            margin-left:0.42rem;
            color:#333;
            &.active
              color:#0071B8;
              border-bottom:0.02rem solid #0071B8;
        >ul
          width:95%;
          height:100%;
          max-height: 4.4rem;
          overflow:auto;
          &.active
            color:#0071B8;
          >li
              margin-left:5%;
              font-size:0.32rem;
          .addList
            width:100%;
            padding-left:0.32rem;
            font-size:0.34rem;
            line-height:0.88rem;
            color:#333;

</style>