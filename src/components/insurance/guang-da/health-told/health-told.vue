<template>
    <div class="detail">
        <slider-bar></slider-bar>
        <b-title title="健康告知事项" :state ='0' @clickhealthTold="togglehealthTold" :showhealthTold="showhealthTold"></b-title>
        <div v-show="showhealthTold" class="jkgz">
           <div class="health-title">(以下项目1至14项勾选为“是”时，请在“健康告知说明栏”中详细描述；如所投保险种不涉及投保人保险费豁免责任时，投保人健康告知栏无需填写)</div>
            <ul class="health-content">
                <li class="health-content-title">
                    <div class="health-num">序号</div>
                    <div class="health-que">问题</div>
                    <div class="health-insured">被保人</div>
                </li>
                <li class="health-content-list" v-for="(item, index) in healthQuestion" :key="index">
                    <div class="health-num">{{item.num}}</div>
                    <div class="health-que" v-if="index === 0">
                        (被保险人)身高<input v-model="insured.iheight" type="text" readonly>厘米;体重<input v-model="insured.iweight" type="text" readonly>公斤。<br>
                        (投保人)身高<input v-model="applicant.aheight" type="text" readonly>厘米;体重<input v-model="applicant.aweight" type="text" readonly>公斤。
                    </div>
                    <div class="health-que" v-if="index === 27">
                        (被保险人)若已怀孕,请填写怀孕日期<input v-model="woman.year" type="text">年<input v-model="woman.month" type="text">月<input v-model="woman.day" type="text">日;
                    </div>
                    <div class="health-que" v-else-if="index !== 0">
                        {{item.question}}
                    </div>
                    <div v-if="index !== 0 && index !== 23 && index !== 27" class="health-insured">
                        <span  class="right-yes" :class="{'active': item.iselectcode === item.num}" @click="selectYes(item, 3)">是</span>
                        <span  :class="{'active': item.iselectcode !== item.num }" @click="selectNo(item,3)">否</span>
                    </div>
                </li>
            </ul>
        </div>
       <div class="footer">
          <div class="btn" @click="goNext">下一步</div>
       </div>
       <confirm ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
import sliderBar from 'base/sliderBar/sliderBar'
import title from 'base/title/title'
import {mapGetters, mapMutations} from 'vuex'
import {healthTold} from 'api/long-life/chang-cheng/insurance'
import {RET_OK, CODE_OK} from 'service/variable'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
    export default {
        mixins: [confirm],
        data () {
            return {
                confirmText: '',
                showhealthTold: true,
                smoke: true,
                drink: false,
                type: 0,
                insured: {
                    iheight: '',
                    iweight: ''
                },
                applicant: {
                    aheight: '',
                    aweight: ''
                },
                woman: {
                    year:'',
                    month:'',
                    day:''
                }
            }
        },
        created () {
            this.insured.iheight = this.guangdaTrail.policy.custInfo.insurants.insurant[0].stature
            this.insured.iweight = this.guangdaTrail.policy.custInfo.insurants.insurant[0].avoirdupois
            this.applicant.aheight = this.guangdaTrail.policy.custInfo.appnt.appntStature
            this.applicant.aweight = this.guangdaTrail.policy.custInfo.appnt.appntAvoirdupois
            if (this.guangdaPolicy.pregDate !== '') {
                let dateArr = this.guangdaPolicy.pregDate.split('-')
                this.woman.year = dateArr[0]
                this.woman.month = dateArr[1]
                this.woman.day = dateArr[2]
            }
        },
        computed: {
            ...mapGetters(['guangdaHealthQuestion','guangdaTrail','guangdaPolicy']),
            healthQuestion () {
                return this.guangdaHealthQuestion.guangdaquestion.healthQuestion
            }
        },
        methods: {
            goNext () {
                let woman = this.guangdaHealthQuestion.guangdaquestion.healthQuestion[24]
                if (woman.iselectcode === woman.num && (this.woman.year === '' || this.woman.month === '' || this.woman.day === '')) {
                    this.showConfirm('请检查怀孕日期是否填写完整')
                    return false
                } else {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        field1: 'pregDate',
                        value: this.woman.year + '-' + this.woman.month + '-' + this.woman.day 
                    })
                    this.$router.push({
                        path: 'guangdapolicy-should-know'
                    })
                }
            },
            togglehealthTold () {
                this.showhealthTold = !this.showhealthTold
            },
            selectYes (data, type) {
                let param = {
                    type: type,
                    data: data
                }
                this.SET_HEALTH_CODE(param)
            },
            selectNo (data, type) {
                let param = {
                    type: type,
                    data: data
                }
                this.DELETE_HEALTH_CODE(param)
            },
            ...mapMutations({
                SET_HEALTH_POLICY: 'SET_HEALTH_POLICY',
                SET_HEALTH_CODE: 'SET_HEALTH_CODE',
                DELETE_HEALTH_CODE: 'DELETE_HEALTH_CODE',
                SET_LONGLIFE_GUANGDA_POLICYINFO:'SET_LONGLIFE_GUANGDA_POLICYINFO'
            })
        },
        components: {
            Confirm,
            sliderBar,
            'b-title': title
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .detail
        font-size (26/$scale)
        background-color #fff
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
                    div:last-child
                        width 40%           
                .health-content-list,
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
                        width 36%
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
                            margin (46/$scale) (50/$scale)
                        .active
                            background-color rgb(58,138,238)
                            color #eee
                li:nth-child(2),li:nth-child(25),li:nth-child(29)
                    div:nth-child(2)
                        width:88%
                li:nth-child(3),li:nth-child(4),li:nth-child(5),li:nth-child(8),
                li:nth-child(9),li:nth-child(11),li:nth-child(12),li:nth-child(22),
                li:nth-child(24),li:nth-child(25),li:nth-child(26),li:nth-child(27),
                li:nth-child(29),li:nth-child(30),li:nth-child(31),li:nth-child(32)
                    height (140/$scale)
                    div:first-child
                        line-height (140/$scale)
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
        .health-content
            margin-bottom (160/$scale)      
</style>