<template>
    <div class="detail">
        <div class="detailTitle">
            <a class="titleLeft">健康告知事项</a>
        </div>
        <div v-show="showhealthTold">
            <ul class="health-content">
                <li class="health-content-title">
                    <div class="health-num">序号</div>
                    <div class="health-que">问题</div>
                    <div class="health-insured">被保人</div>
                    <div class="health-applicant">投保人</div>
                </li>
                <li class="health-content-list" v-for="(item, index) in healthQuestion" :key="index">
                    <div class="health-num">{{item.num}}</div>
                    <div class="health-que" v-if="index === 0">
                        (被保险人)身高<input v-model="insured.iheight" type="text" disabled='disabled'>厘米;体重<input v-model="insured.iweight" type="text" disabled='disabled'>公斤。<br>
                        (投保人)身高<input v-model="applicant.aheight" type="text" disabled='disabled'>厘米;体重<input v-model="applicant.aweight" type="text" disabled='disabled'>公斤。
                    </div>
                    <div class="health-que" v-else-if="index === 26">
                        (被保险人)出生时孕周<input v-model="baby.babyweek" type="text" disabled='disabled'>周;身高<input v-model="baby.babyheight" type="text" disabled='disabled'>厘米,体重<input v-model="baby.babyweight" type="text" disabled='disabled'>公斤.,出生时留院<input v-model="baby.babyday" type="text" disabled='disabled'>天,
                        如超过7天,请详细说明<input v-model="baby.babyinfo" type="text" disabled='disabled'>;<br>
                    </div>
                    <div class="health-que" v-else>
                        {{item.question}}
                    </div>
                    <div v-if="index !== 0 && index !==26" class="health-insured">
                        <span v-if="item.queList" class="right-yes" :class="{'active': item.iselectcode === item.code}">是</span>
                        <span v-if="item.queList" :class="{'active': item.iselectcode !== item.code }">否</span>
                    </div>
                    <div v-if="index !== 0 && index !==26" class="health-applicant">
                        <span v-if="item.queList" class="right-yes"  :class="{'active': item.aselectcode === item.code}">是</span>
                        <span v-if="item.queList" :class="{'active': item.aselectcode !== item.code }">否</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="detailTitle">
            <a class="titleLeft">财务和其他告知事项</a>
        </div>
        <div class="moneybox" v-show="showmoneyTold">
            <ul class="health-content">
                <li class="health-content-title">
                    <div class="health-num">序号</div>
                    <div class="health-que">问题</div>
                    <div class="health-insured">被保人</div>
                    <div class="health-applicant">投保人</div>
                </li>
                <li class="financial-content-list" v-for="(item, index) in financialQuestion" :key="index">
                    <div class="health-num">{{item.num}}</div>
                    <div class="health-que" v-if="index === 0">
                        每年固定收入及收入来源:<br>
                        (1)被保人<input v-model="insured.idata.imoney"  type="text" disabled='disabled'>万元;
                        收入来源<input v-model="insured.idata.icheck[0]" value="1" name="icheck" type="checkbox" disabled='disabled'>工资<input v-model="insured.idata.icheck[1]" value="2" name="icheck" type="checkbox" disabled='disabled'>房屋出租<input v-model="insured.idata.icheck[2]" value="3" name="icheck" type="checkbox" disabled='disabled'>投资收益
                        <input v-model="insured.idata.icheck[3]" value="4" name="icheck" type="checkbox" disabled='disabled'>个体经营<input value="5" v-model="insured.idata.icheck[4]" name="icheck" type="checkbox" disabled='disabled'>农业收入<input value="6" v-model="insured.idata.icheck[5]" name="icheck" type="checkbox" disabled='disabled'>其他<br>
                        (2)投保人<input v-model="applicant.adata.amoney" type="text" disabled='disabled'>万元;
                         收入来源<input value="1" v-model="applicant.adata.acheck[0]" type="checkbox" disabled='disabled'>工资<input value="2" v-model="applicant.adata.acheck[1]" type="checkbox" disabled='disabled'>房屋出租<input value="3" v-model="applicant.adata.acheck[2]" type="checkbox" disabled='disabled'>投资收益
                        <input value="4" v-model="applicant.adata.acheck[3]" type="checkbox" disabled='disabled'>个体经营<input value="5" v-model="applicant.adata.acheck[4]" type="checkbox" disabled='disabled'>农业收入<input value="6" v-model="applicant.adata.acheck[5]" type="checkbox" disabled='disabled'>其他<br>
                    </div>
                    <div class="health-que" v-else>
                        {{item.question}}
                    </div>
                    <div v-if="index !==0" class="health-insured">
                        <span v-if="item.queList" class="right-yes" :class="{'active': item.iselectcode === item.code}">是</span>
                        <span v-if="item.queList" :class="{'active': item.iselectcode !== item.code}">否</span>
                    </div>
                    <div v-if="index !==0" class="health-applicant">
                        <span v-if="item.queList" class="right-yes" :class="{'active': item.aselectcode === item.code}">是</span>
                        <span v-if="item.queList" :class="{'active': item.aselectcode !== item.code}">否</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import title from 'base/title/title'
    import {mapGetters, mapMutations} from 'vuex'
    import {healthTold, initBankInfo} from 'api/long-life/chang-cheng/insurance'
    import {RET_OK, CODE_OK} from 'service/variable'
    export default {
        data () {
            return {
                showhealthTold: true,
                smoke: true,
                drink: false,
                showmoneyTold: true,
                showpopup: false,
                queList: {
                    clientType: 1,
                    List: [],
                    num: 1,
                    version: '',
                    code: '',
                    remark: '',
                    Listflag: false,
                    ListAdd: [],
                    ListMore: []
                },
                type: 0,
                insured: {
                    iheight: '',
                    iweight: '',
                    idata: {
                        imoney: '',
                        icheck: ['', '', '', '', '', '']
                    }
                },
                applicant: {
                    aheight: '',
                    aweight: '',
                    adata: {
                        amoney: '',
                        acheck: ['', '', '', '', '', '']
                    }
                },
                baby: {
                    babyweek: '',
                    babyheight: '',
                    babyweight: '',
                    babyday: '',
                    babyinfo: ''
                }
            }
        },
        created () {
            if (this.changchengFlag === 1) {
                this.insured = this.changchengHealthdefault.insured
                this.applicant = this.changchengHealthdefault.applicant
                this.baby = this.changchengHealthdefault.baby
            }
        },
        computed: {
            ...mapGetters(['changChengHealthQuestion', 'changchengHealthPolicy', 'changchengHealthdefault']),
            healthQuestion () {
                return this.changChengHealthQuestion.changchengquestion.healthQuestion
            },
            financialQuestion () {
                return this.changChengHealthQuestion.changchengquestion.financialQuestion
            },
            healthVersion () {
                return this.changChengHealthQuestion.changchengquestion.healthToldVersion
            },
            financialToldVersion () {
                return this.changChengHealthQuestion.changchengquestion.financialToldVersion
            },
            changchengFlag () {
                return this.changchengHealthdefault.flag
            }
        },
        methods: {
            goNext () {
              if ((this.insured.iheight !== '' && this.insured.iweight !== '') && (this.applicant.aheight !== '' && this.applicant.aweight !== '')) {
                    let value = {
                        content: this.insured.iheight + ',' + this.insured.iweight,
                        remark: this.healthQuestion[0].remark,
                        code: this.healthQuestion[0].code,
                        version: this.healthVersion
                    }
                    let value1 = {
                       content: this.applicant.aheight + ',' + this.applicant.aweight,
                        remark: this.healthQuestion[0].remark,
                        code: this.healthQuestion[0].code,
                        version: this.healthVersion
                    }
                    this.setpolicy(1, value)
                    this.setpolicy(2, value1)
                } else {
                    this.confirmText = '请检查被保人和投保人身高体重是否填写完整'
                    this.$refs.confirm.show()
                    return false
                }
              let babycontent
              if (this.baby.babyweek !== '' || this.baby.babyheight !== '' || this.baby.babyweight !== '') {
                  if (this.baby.babyweek === '' || this.baby.babyheight === '' || this.baby.babyweight === '') {
                      this.confirmText = '请检查儿童告知是否填写完整'
                      this.$refs.confirm.show()
                      return false
                  } else {
                        babycontent = this.baby.babyweek + ',' + this.baby.babyheight + ',' + this.baby.babyweight
                        if (this.baby.babyday !== '' && Number(this.baby.babyday) > 7) {
                            if (this.baby.babyinfo === '') {
                                this.confirmText = '请检查儿童告知详细说明是否填写完整'
                                this.$refs.confirm.show()
                                return false
                            }
                        }
                        babycontent = babycontent + ',' + this.baby.babyday + ',' + this.baby.babyinfo
                            let value = {
                                    content: babycontent,
                                    remark: this.healthQuestion[26].remark,
                                    code: this.healthQuestion[26].code,
                                    version: this.healthVersion
                            }
                            this.setpolicy(1, value)
                  }
              }
              if (this.insured.idata.imoney === '' || this.applicant.adata.amoney === '') {
                   this.confirmText = '请检查投保人及被保人的收入是否填写完整'
                   this.$refs.confirm.show()
                   return false
              } else {
                  let iArr = this.insured.idata.icheck
                  let aArr = this.applicant.adata.acheck
                  let icontent = ''
                  let acontent = ''
                  if (iArr.indexOf(true) === -1 || aArr.indexOf(true) === -1) {
                       this.confirmText = '请检查投保人及被保人收入来源是否填写完整'
                       this.$refs.confirm.show()
                  } else {
                      for (let i = 0; i < iArr.length; i++) {
                        if (iArr[i] !== '') {
                            icontent += (i + 1) + ','
                        }
                      }
                      for (let i = 0; i < aArr.length; i++) {
                        if (aArr[i]) {
                            acontent += (i + 1) + ','
                        }
                      }
                  }
                  icontent = icontent.substring(0, icontent.length - 1)
                  acontent = acontent.substring(0, acontent.length - 1)
                  let value = {
                      content: this.insured.idata.imoney + ',' + icontent,
                       remark: this.financialQuestion[0].remark,
                       code: this.financialQuestion[0].code,
                       version: this.financialToldVersion
                  }
                  this.setpolicy(1, value)
                  let value1 = {
                       content: this.applicant.adata.amoney + ',' + acontent,
                       remark: this.financialQuestion[0].remark,
                       code: this.financialQuestion[0].code,
                       version: this.financialToldVersion
                  }
                  this.setpolicy(2, value1)
              }
              console.log('获取到的参数')
              let params = {
                  insured: this.insured,
                  applicant: this.applicant,
                  baby: this.baby,
                  flag: 1
              }
              this.SET_HEALTH_INPUT(params)
              console.log(this.changchengHealthPolicy)
              healthTold(this.changchengHealthPolicy).then(res => {
                  console.log(res)
                if (res.ret === RET_OK) {
					if (res.data.code === CODE_OK) {
                        initBankInfo().then(res => {
                            if (res.ret === RET_OK) {
                                if (res.data.code === CODE_OK) {
                                    this.setChangChengBankDetail({
                                        field1: 'init',
                                        value: res.data
                                    })
                                    this.$router.push({
                                        name: 'bank-card'
                                    })
                                }
                            }
                        })
					}
				}
              })
            },
            togglehealthTold () {
                this.showhealthTold = !this.showhealthTold
            },
            togglemoneyTold () {
                this.showmoneyTold = !this.showmoneyTold
            },
            hidepopup () {
                this.showpopup = false
            },
            selectYes (data, version, type) {
                let param = {
                    type: type,
                    data: data
                }
                this.SET_HEALTH_CODE(param)
                this.type = type
                this.queList.clientType = type
                this.queList.List = data.queList.listYes
                this.queList.num = data.num
                this.queList.version = version
                this.queList.code = data.code
                this.queList.remark = data.remark
                this.queList.Listflag = data.queList.flag
                this.queList.ListAdd = data.queList.listAdd
                this.queList.ListMore = data.queList.listMore
                this.showpopup = true
            },
            selectNo (data, version, type) {
                let param = {
                    type: type,
                    data: data

                }
                this.DELETE_HEALTH_CODE(param)
                if (!data.queList.listNo) {
                    let param = {
                        type: type,
                        value: {
                            code: data.code
                        }
                    }
                    this.DELETE_HEALTH_POLICY(param)
                } else {
                    this.queList.clientType = type
                    this.queList.List = data.queList.listNo
                    this.queList.num = data.num
                    this.queList.version = version
                    this.queList.code = data.code
                    this.queList.remark = data.remark
                    this.queList.Listflag = data.queList.flag
                    this.queList.ListAdd = data.queList.listAdd
                    this.queList.ListMore = data.queList.listMore
                    this.showpopup = true
                }
            },
            setpolicy (type, value) {
                let param = {
                        type: type,
                        value: value
                    }
                    this.DELETE_HEALTH_POLICY(param)
                    this.SET_HEALTH_POLICY(param)
            },
            ...mapMutations({
                SET_HEALTH_POLICY: 'SET_HEALTH_POLICY',
                DELETE_HEALTH_POLICY: 'DELETE_HEALTH_POLICY',
                SET_HEALTH_CODE: 'SET_HEALTH_CODE',
                DELETE_HEALTH_CODE: 'DELETE_HEALTH_CODE',
                SET_HEALTH_INPUT: 'SET_HEALTH_INPUT',
                setChangChengBankDetail: 'SET_LONGLIFE_CHANGCHENG_BANKDETAIL'
            })
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .detail
        padding (20/$scale)
        font-size (26/$scale)
        background-color #fff
        .detailTitle
            font-size: (30/$scale)
            line-height: (100/$scale)
            color: #333
            border-bottom: 1px solid $color-theme
            background: #fff
            padding-left: (30/$scale)
            margin-bottom: (40/$scale)
            .titleLeft
                color: $color-main
                font-weight: bold
            .titleRight
                color: #333
                float: right
                font-size: 15px
        .health-title
            margin (20/$scale) 0
            line-height (34/$scale)
            color #333333
        .health-content
            li:first-child
                height (60/$scale)
                line-height (60/$scale)
                text-align center
                width 100%
                display flex
                flex-direction row
                background-color #D4E4FB
                div
                    border (1/$scale) solid #DDD
                div:first-child
                    width 10%
                div:nth-child(2)
                    width 50%
                div:last-child,div:nth-child(3)
                    width 20%
            li:nth-child(2)
               div:nth-child(2)
                width (620/$scale)
                height (180/$scale)
            li:nth-child(28)
                div:nth-child(2)
                  width (620/$scale)
                  height (200/$scale) 
            .financial-content-list:nth-child(2)
               div:nth-child(2)
                width (620/$scale)
                height (400/$scale)
            .health-content-list,.financial-content-list
                text-align left
                width 100%
                display flex
                flex-direction row
                div
                    border (1/$scale) solid #DDD
                    input 
                        width (60/$scale)
                        line-height (40/$scale)
                        outline none
                        background-color transparent
                        border-bottom (2/$scale) solid #ccc
                        padding  0 (20/$scale)
                        color #437BEC
                div:first-child
                    width 10%
                    text-align center
                    line-height (200/$scale)
                div:nth-child(2)
                    width 46%
                    padding 2%
                    line-height (34/$scale)
                div:last-child,div:nth-child(3)
                    width 16%
                    padding 2%
                    line-height (60/$scale)
                    span
                        display inline-block
                        height (40/$scale)
                        width (40/$scale)
                        border-radius (20/$scale)
                        background-color rgb(221,221,221)
                        color #333
                        text-align center 
                        line-height (40/$scale)
                    span:first-child
                        margin-right (16/$scale)
                    .active
                        background-color rgb(58,138,238)
                        color #eee
            li:nth-child(3),li:nth-child(4),li:nth-child(19),li:nth-child(23),li:nth-child(24)
                height (140/$scale)
                div:first-child
                    line-height (140/$scale)
            li:nth-child(7),li:nth-child(8)
                height (180/$scale)
                div:first-child
                    line-height (180/$scale)  
            li:nth-child(16),,li:nth-child(17),,li:nth-child(18),li:nth-child(21)
                height (160/$scale)
                div:first-child
                    line-height (160/$scale)
            li:nth-child(26),li:nth-child(27)
                height (100/$scale)
                div:first-child
                    line-height (100/$scale)

        .footer{
           	position: fixed
            bottom: (0/$scale)
            left (-20/$scale)
            width: 104%
            height: (98/$scale)
            line-height: (98/$scale)
            text-align : center
            font-size: (34/$scale)
            color: $color-btn;
            background-color:#3B8AEF;
           }
        .split{
              height:(120/$scale);
            }
        .moneybox
            margin-bottom (160/$scale)      
</style>