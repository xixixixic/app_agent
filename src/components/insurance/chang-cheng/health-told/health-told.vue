<template>
    <div class="detail">
        <slider-bar></slider-bar>
        <b-title title="健康告知事项" :state ='0' @clickhealthTold="togglehealthTold" :showhealthTold="showhealthTold"></b-title>
        <div v-show="showhealthTold" class='jkgz'>
           <div class="health-title">(以下项目4至12项勾选为“是”时，请在“健康告知说明栏”中详细描述；如所投保险种不涉及投保人保险费豁免责任时，投保人健康告知栏无需填写)</div>
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
                        (被保险人)身高<input v-model="insured.iheight" @blur="getiheight" type="text">厘米;体重<input v-model="insured.iweight" @blur="getiweight" type="text">公斤。<br>
                        (投保人)身高<input v-model="applicant.aheight" @blur="getaheight" type="text">厘米;体重<input v-model="applicant.aweight" @blur="getaweight" type="text">公斤。
                    </div>
                    <div class="health-que" v-else-if="index === 26">
                        (被保险人)出生时孕周<input v-model="baby.babyweek" type="text">周;身高<input v-model="baby.babyheight" type="text">厘米,体重<input v-model="baby.babyweight" type="text">公斤.,出生时留院<input v-model="baby.babyday" type="text">天,
                        如超过7天,请详细说明<input v-model="baby.babyinfo" type="text">;<br>
                    </div>
                    <div class="health-que" v-else>
                        {{item.question}}
                    </div>
                    <div v-if="index !== 0 && index !==26" class="health-insured">
                        <span v-if="item.queList" class="right-yes" :class="{'active': item.iselectcode === item.code}" @click="selectYes(item, healthVersion, 1)">是</span>
                        <span v-if="item.queList" :class="{'active': item.iselectcode !== item.code }" @click="selectNo(item,healthVersion,1)">否</span>
                    </div>
                    <div v-if="index !== 0 && index !==26" class="health-applicant">
                        <span v-if="item.queList" class="right-yes"  :class="{'active': item.aselectcode === item.code}" @click="selectYes(item, healthVersion, 2)">是</span>
                        <span v-if="item.queList" :class="{'active': item.aselectcode !== item.code }" @click="selectNo(item,healthVersion,2)">否</span>
                    </div>
                </li>
            </ul>
        </div>
        <b-title title="财务和其他告知事项" :state ='1' @clickmoneyTold="togglemoneyTold" :showmoneyTold="showmoneyTold"></b-title>
        <div class="jkgz moneybox" v-show="showmoneyTold">
           <div class="health-title">(以下项目4至12项勾选为“是”时，请在“健康告知说明栏”中详细描述；如所投保险种不涉及投保人保险费豁免责任时，投保人健康告知栏无需填写)</div>
            <ul class="health-content">
                <li class="health-content-title">
                    <div class="health-num">序号</div>
                    <div class="health-que">问题</div>
                    <div class="health-insured financial-insured">被保人</div>
                    <!-- <div class="health-applicant">投保人</div> -->
                </li>
                <li class="financial-content-list" v-for="(item, index) in financialQuestion" :key="index">
                    <div class="health-num">{{item.num}}</div>
                    <div class="health-que" v-if="index === 0">
                        每年固定收入及收入来源:<br>
                        (1)被保人<input @blur="getimoney" v-model="insured.idata.imoney"  type="text">万元;
                        收入来源<input @change="geticheck0" v-model="insured.idata.icheck[0]" value="1" name="icheck" type="checkbox">工资<input v-model="insured.idata.icheck[1]" value="2" name="icheck" type="checkbox">房屋出租<input v-model="insured.idata.icheck[2]" value="3" name="icheck" type="checkbox">投资收益
                        <input v-model="insured.idata.icheck[3]" value="4" name="icheck" type="checkbox">个体经营<input value="5" v-model="insured.idata.icheck[4]" name="icheck" type="checkbox">农业收入<input value="6" v-model="insured.idata.icheck[5]" name="icheck" type="checkbox">其他<br>
                        (2)投保人<input @blur="getamoney" v-model="applicant.adata.amoney" type="text">万元;
                         收入来源<input value="1" v-model="applicant.adata.acheck[0]" type="checkbox">工资<input value="2" v-model="applicant.adata.acheck[1]" type="checkbox">房屋出租<input value="3" v-model="applicant.adata.acheck[2]" type="checkbox">投资收益
                        <input value="4" v-model="applicant.adata.acheck[3]" type="checkbox">个体经营<input value="5" v-model="applicant.adata.acheck[4]" type="checkbox">农业收入<input value="6" v-model="applicant.adata.acheck[5]" type="checkbox">其他<br>
                    </div>
                    <div class="health-que" v-else>
                        {{item.question}}
                    </div>
                    <div v-if="index !==0" class="health-insured health-insuredChange">
                        <span v-if="item.queList" class="right-yes" :class="{'active': item.iselectcode === item.code}"  @click="selectYes(item, financialToldVersion, 1)">是</span>
                        <span v-if="item.queList" :class="{'active': item.iselectcode !== item.code}" @click="selectNo(item,financialToldVersion,1)" >否</span>
                    </div>
                    <!-- <div v-if="index !==0" class="health-applicant">
                        <span v-if="item.queList" class="right-yes" :class="{'active': item.aselectcode === item.code}" @click="selectYes(item, financialToldVersion, 2)">是</span>
                        <span v-if="item.queList" :class="{'active': item.aselectcode !== item.code}" @click="selectNo(item,financialToldVersion,2)">否</span>
                    </div> -->
                </li>
            </ul>
        </div>
       <div class="footer">
          <div class="btn" @click="goNext">下一步</div>
       </div>
       <confirm ref="confirm" :text="confirmText"></confirm>
       <popUp v-if="showpopup" @hidepopup="hidepopup" :data="data" :queList="queList"></popUp>
    </div>
</template>
<script>
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import sliderBar from 'base/sliderBar/sliderBar'
import popUp from 'base/popup/popup'
import title from 'base/title/title'
import {mapGetters, mapMutations} from 'vuex'
import {initBankInfo} from 'api/long-life/chang-cheng/insurance'
import {RET_OK, CODE_OK} from 'service/variable'
import {checkNum} from 'common/js/validate-util.js'
import {getAge} from 'components/product/life/js/age-util.js'
    export default {
        mixins: [confirm],
        data () {
            return {
                confirmText: '',
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
                },
                data: {}
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
            ...mapGetters(['changChengBaseInfo','changChengHealthQuestion', 'changchengHealthPolicy', 'changchengHealthdefault']),
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
            },
            relationShip () {
                return this.changChengBaseInfo.insured.relaToAppntCode
            },
            insuredSex () {
                return this.changChengBaseInfo.insured.sex
            },
            applicantSex () {
                return this.changChengBaseInfo.applicant.sex
            },
            applicantAge () {
                return getAge(this.changChengBaseInfo.applicant.birthday,undefined,true)
            },
            insuredAge () {
                return getAge(this.changChengBaseInfo.insured.birthday,undefined,true)
            }
        },
        methods: {
            getiheight () {
                this.setBenRen()
            },
            getiweight () {
                 this.setBenRen()
            },
            getaheight () {
                 this.setBenRen()
            },
            getaweight () {
                 this.setBenRen()
            },
            getimoney () {
                 this.setBenRen()
            },
            getamoney () {
                this.setBenRen()
            },
            geticheck0() {
                this.setBenRen()
            },
            setBenRen () {
                if (this.relationShip === '00') {
                    this.applicant.aheight = this.insured.iheight 
                    this.applicant.aweight = this.insured.iweight
                    this.applicant.adata.amoney = this.insured.idata.imoney
                    this.applicant.adata.acheck = this.insured.idata.icheck
                }
            },
            goNext () {
                let iheight = this.insured.iheight
                let iweight = this.insured.iweight
                let aheight = this.applicant.aheight
                let aweight = this.applicant.aweight
                if ((iheight !== '' && iweight !== '') && (aheight !== '' && aweight !== '')) {
                    let iheightTip = checkNum(iheight)
                    let iweightTip = checkNum(iweight)
                    let aheightTip = checkNum(aheight)
                    let aweightTip = checkNum(aweight)
                    if (iheightTip === '' && iweightTip === '' && aheightTip === '' && aweightTip === '') {
                        if ((50 <= iheight && iheight <= 200) && (140 <= aheight && aheight <= 200) && (3 <= iweight && iweight <= 150 ) && (40 <= aweight && aweight <= 150)) {
                            let value = {
                                remark: iheight + ',' + iweight,
                                content: this.healthQuestion[0].remark,
                                code: this.healthQuestion[0].code,
                                version: this.healthVersion
                            }
                            let value1 = {
                                remark: aheight + ',' + aweight,
                                content: this.healthQuestion[0].remark,
                                code: this.healthQuestion[0].code,
                                version: this.healthVersion
                            }
                            this.setpolicy(1, value)
                            this.setpolicy(2, value1)
                        } else {
                            this.showConfirm('请检查被保人和投保人身高体重是否正常')
                            return false
                        }
                    } else {
                        this.showConfirm('请检查被保人和投保人身高体重是否为数字')
                        return false
                    }
                } else {
                    this.showConfirm('请检查被保人和投保人身高体重是否填写完整')
                    return false
                }
                let babycontent
                let babyweek = this.baby.babyweek
                let babyheight = this.baby.babyheight
                let babyweight = this.baby.babyweight
                let babyday = this.baby.babyday
                let babyinfo = this.baby.babyinfo
                let birthday = this.changChengBaseInfo.insured.birthday
                let age = getAge(birthday,undefined,true)
                if (age < 2 && (babyheight === ''|| babyweight === '' || babyweek === '' || babyday === '')) {
                    this.showConfirm('投保人小于2周岁,请填写儿童告知')
                    return false
                }
                if (babyweek !== '' || babyheight !== '' || babyweight !== '') {
                  if (babyweek === '' || babyheight === '' || babyweight === '') {
                      this.showConfirm('请检查儿童告知是否填写完整')
                      return false
                    } else {
                        let babyweekTip = checkNum(babyweek)
                        let babyheightTip = checkNum(babyheight)
                        let babyweightTip = checkNum(babyweight)
                        let babydayTip = checkNum(babyday)
                        if (babyweekTip === '' && babyheightTip === '' && babyweightTip === '' && babydayTip === '') {
                            babycontent = babyweek + ',' + babyheight + ',' + babyweight
                            if ((30 >= babyheight || babyheight >= 100) || (2.5 >= babyweight || babyweight >= 10)) {
                                this.showConfirm('请检查儿童告知内儿童的身高体重是否正常')
                                return false
                            }
                            if (babyday !== '' && Number(babyday) > 7) {
                                if (babyinfo === '') {
                                    this.showConfirm('请检查儿童告知详细说明是否填写完整')
                                    return false
                                }
                            } else {
                                babyinfo = 'N'
                            }
                            babycontent = babycontent + ',' + babyday + ',' + babyinfo
                                let value = {
                                        remark: babycontent,
                                        content: this.healthQuestion[26].remark,
                                        code: this.healthQuestion[26].code,
                                        version: this.healthVersion
                                }
                                this.setpolicy(1, value)
                        } else {
                            this.showConfirm('请检查儿童告知出生周及身高体重留院天数是否为数字')
                            return false
                        }   
                    }
                }
                let imoney = this.insured.idata.imoney
                let amoney = this.applicant.adata.amoney
                let icheckFlag, acheckFlag
                let icheck = this.insured.idata.icheck
                let acheck = this.applicant.adata.acheck
                for(let i = 0; i < icheck.length; i++) {
                    if (icheck[i]) {
                        icheckFlag = true
                    }
                }
                for (let i = 0; i < acheck.length; i++) {
                    if (acheck[i]) {
                        acheckFlag = true
                    }
                }
                if (imoney === '' || amoney === '') {
                    this.showConfirm('请检查投保人及被保人的收入是否填写完整')
                    return false
                } else if ( !icheckFlag || !acheckFlag) {
                    this.showConfirm('请检查投保人及被保人的收入来源是否选择')
                    return false
                } else {
                    let imoneyTip = checkNum(imoney)
                    let amoneyTip = checkNum(amoney)
                    if (imoneyTip === '' && amoneyTip === '') {
                        let iArr = this.insured.idata.icheck
                        let aArr = this.applicant.adata.acheck
                        let icontent = ''
                        let acontent = ''
                        if (iArr.indexOf(true) === -1 || aArr.indexOf(true) === -1) {
                            this.showConfirm('请检查投保人及被保人收入来源是否填写完整')
                        } else {
                            for (let i = 0; i < iArr.length; i++) {
                                if (iArr[i] !== '') {
                                    icontent += (i + 1)
                                }
                            }
                            for (let i = 0; i < aArr.length; i++) {
                                if (aArr[i]) {
                                    acontent += (i + 1)
                                }
                            }
                        }
                        let value = {
                            remark: imoney + ',' + icontent,
                            content: this.financialQuestion[0].remark,
                            code: this.financialQuestion[0].code,
                            version: this.financialToldVersion
                        }
                        this.setpolicy(1, value)
                        let value1 = {
                            remark: amoney + ',' + acontent,
                            content: this.financialQuestion[0].remark,
                            code: this.financialQuestion[0].code,
                            version: this.financialToldVersion
                        }
                        this.setpolicy(2, value1)
                    } else {
                            this.showConfirm('请检查投保人及被保人的收入是否为数字')
                            return false
                    }
                }
                let params = {
                    insured: this.insured,
                    applicant: this.applicant,
                    baby: this.baby,
                    flag: 1
                }
                this.SET_HEALTH_INPUT(params)
                this.$router.push({
                    name: 'policy-should-know'
                })
            },
            togglehealthTold () {
                this.showhealthTold = !this.showhealthTold
            },
            togglemoneyTold () {
                this.showmoneyTold = !this.showmoneyTold
            },
            hidepopup (param) {
                if (param !== undefined) {
                    this.selectNo(param.data, param.version, param.type)
                }
                this.showpopup = false
            },
            selectYes (data, version, type) {
                if (type === 2) {
                    if (data.code === 'P425') {
                        return false
                    }
                }
                let flag 
                if (data.code === 'P421' || data.code === 'P422' || data.code === 'P423') {
                   if (type === 1 && (this.applicantSex === '2' || this.applicantAge < 14)) {
                       this.showConfirm('请检查投保人性别和年龄')
                       return false
                   } else if (type === 2 && (this.insuredSex === '2' || this.insuredAge < 14)){
                       this.showConfirm('请检查被保人性别和年龄')
                       return false
                   } else {
                       flag = true
                   }
                } else {
                    flag = true
                }
                if (flag) {
                    if (this.relationShip === '00') {
                        let param1 = {
                            type: 1,
                            data: data
                        }
                        this.SET_HEALTH_CODE(param1)
                        let param2 = {
                            type: 2,
                            data: data
                        }
                        this.SET_HEALTH_CODE(param2)
                    } else {
                        let param = {
                            type: type,
                            data: data
                        }
                        this.SET_HEALTH_CODE(param)
                    }
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
                    this.data = data
                    this.showpopup = true
                }
            },
            selectNo (data, version, type) {
                console.log('获取选择否selectNo')
                if (this.relationShip === '00') {
                    let param1 = {
                            type: 1,
                            data: data
                        }
                    this.DELETE_HEALTH_CODE(param1)
                    let param2 = {
                            type: 2,
                            data: data
                        }
                    this.DELETE_HEALTH_CODE(param2)
                } else {
                    let param = {
                        type: type,
                        data: data
                    }
                    this.DELETE_HEALTH_CODE(param)
                }
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
        },
        components: {
            Confirm,
            sliderBar,
            'b-title': title,
            popUp
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .detail
        font-size (26/$scale)
        background-color #fff
        margin-bottom: (100/$scale)
        .jkgz
        	margin 0 (20/$scale)
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
                    .health-insuredChange
                        width: 36%!important
                        color: red
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