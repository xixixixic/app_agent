<template>
    <div class="policyShouldKnow">
        <slider-bar :defaultSelected='defaultSelected'></slider-bar>
        <split></split>
        <div class="contentWarp lastWarp">
            <div class="title">
                <span class='leftWord'>投保须知</span>
                <div @click='arrChange' class='rightWord'>
                    <p class='agreeWord'>
                        <span class='rightWord' v-show='agree'>已同意</span>
                    </p>
                    <i :class="this.contentStatus === false ? 'icon-down_arrow' : 'icon-top_arrow'" class="ico"></i>
                </div>
            </div>
            <div class="content" v-show='contentStatus'>
                <p class='detailContent'>
                    <span class='specialWord'>1、您的权益。</span>您有权要求保险代理人出示有效工作证件及身份证，您有权要求保险代理人提供保险条款,为详知您所投保的保险内容，建议您先行浏览所投保的保险条款,特别提示您应注意<span class='specialWord'>“免除保险人责任条款”和“免责条款”、“犹豫期与合同解除权条款”。</span>
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>2、您的义务。</span>对我公司在投保书中所询问的事项，您和被保险人应在投保书中向我们如实告知。您和被保险人的任何隐瞒或遗漏，均有可能影响到我公司的承保决定。一经发现，我公司可以依法解除保险合同，对保险合同解除前发生的保险事故不承担保险责任。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>3、填写要求。</span>请您亲笔填写投保书，并请您和被保险人在投保书上亲笔签字，严禁代签字行为。投保书应由投保人用蓝黑色、黑色墨水的钢笔或签字笔亲自填写，字迹清晰，不应有涂改。在投保人，被保险人/法定监护人签名栏应分别由投保人、被保险人或被保险人的法定监护人本人亲笔签名。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>4、交费须知。</span>我公司已全面实行委托银行划转保险费,保险代理人、保险代理机构以及保险兼业代理机构均无权要求您以现金方式交付保险费用。我司自收到资料之日起开始划转保险费。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>5、您的信息。</span>为维护您的权益，您应真实、完整的填写客户信息栏。如您不提供真实、完整客户信息可能带来的后果将自行承担。如果您的邮寄地址、电话等个人信息发生变化，应及时联系本公司办理变更。客户年龄、邮寄地址和电话等信息的采集，其用途包括但不限于计算保费、核保、寄送保单和客户回访等。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>6、未成年人保险金。</span>如果被保险人是未成年人，其死亡给付保险金额的总和不能超过保险监督管理机构规定的当地最高限额。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>7、正式保险合同生效日。</span>您提交本投保书、交付保险费的行为均为您的投保申请，如果经过我公司审核通过，我公司将签发保险单作为承保凭证，并自保险单上载明的生效日起开始承担保险责任，保险单周年日以该日期为基础计算。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>8、公司申明。</span>保险代理人及其他人的与本投保书或保险合同条款内容不符的说明或承诺均无效。任何告知事项均应由您和被保险人完整无误的填写在投保书中，我公司及代理人不接受您和被保险人的任何口头告知事项，所有告知事项均以投保书中的填写为准。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>9、公司承诺。</span>我公司将严格保障您个人信息资料的安全性，在未经您同意的情况下，不会将您的信息用于任何第三方机构的销售活动。
                </p>
                <div class='agreeDetail' @click='changeCircle'>
                    <p class='agreeDetailP'>
                        <span :class="this.gouStatus === false ? 'gouIco': 'circleIco'"></span>
                    </p>
                    <p class='agreeDetailP'>
                       <span>我已阅读并同意以上内容</span>
                    </p>
                </div>
            </div>
        </div>
        <info-footer text="下一步" @next='_next()'></info-footer>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SliderBar from 'base/sliderBar/sliderBar'
import Split from 'base/split/split'
import InfoFooter from 'base/footer/footer'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {mapMutations} from 'vuex'
export default {
    mixins: [confirm],
    data () {
        return {
            confirmText: '',
            agree: false,
            gouStatus: true,
            contentStatus: false,
            SqsmAgree: false,
            SqsmGouStatus: true,
            SqsmContentStatus: false,
            BxfScjAgree: false,
            BxfScjGouStatus: true,
            BxfScjContentStatus: false,
            defaultSelected: 5
        }
    },
    methods: {
        arrChange () {
            this.contentStatus = !this.contentStatus
        },
        changeCircle () {
            this.gouStatus = !this.gouStatus
            this.agree = !this.agree
            this.contentStatus = !this.contentStatus
        },
        SqsmArrChange () {
            this.SqsmContentStatus = !this.SqsmContentStatus
        },
        SqsmChangeCircle () {
            this.SqsmGouStatus = !this.gouStatus
            this.SqsmAgree = !this.SqsmAgree
            this.SqsmContentStatus = !this.SqsmContentStatus
        },
        BxfScjArrChange () {
            this.BxfScjContentStatus = !this.BxfScjContentStatus
        },
        BxfScjChangeCircle () {
            this.BxfScjGouStatus = !this.BxfScjGouStatus
            this.BxfScjAgree = !this.BxfScjAgree
            this.BxfScjContentStatus = !this.BxfScjContentStatus
        },
        _next () {
            console.log(this.agree)
            console.log('this.agree')
            if (this.agree !== true) {
                this.showConfirm('必须同意投保须知')
            } else {
                this.$router.push({
                    path: 'guangdabank-card'
                })
            }
        },
        ...mapMutations({

            })
    },
    components: {
		InfoFooter,
		SliderBar,
		Split,
		Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.contentWarp
    font-size: 0
    .title
        height: (90/$scale)
        line-height: (90/$scale)
        background: #fff
        display: flex
        justify-content: space-between
        .leftWord
            font-size: (30/$scale)
            color: #333
            margin-left: (30/$scale)
        .rightWord
            font-size: (28/$scale)
            color: $color-theme
            .agreeWord
                display: inline-block
            .ico
                font-size: (28/$scale)
                margin: 0 (15/$scale)
                vertical-align: middle
    .content
        padding: (30/$scale) (30/$scale) 0 (30/$scale)
        // margin-bottom: (100/$scale)
        .detailContent
            font-size: (24/$scale)
            color: #666
            line-height: (46/$scale)
            .specialWord
                font-weight: bold
            .specialRedWord
                color: #ff4456
        .agreeDetail
            font-size: (26/$scale)
            color: $color-theme
            height: (100/$scale)
            line-height: (100/$scale)
            text-align: center
            display: flex
            justify-content: center
            .agreeDetailP
                >span
                    vertical-align: middle
                .circleIco
                    bg-image: ('blueCircle')
                    display: inline-block
                    width: (34/$scale)
                    height: (34/$scale)
                    background-size: contain
                    margin-right: (20/$scale)
                    vertical-align: middle
                .gouIco
                    bg-image: ('blueGou')
                    display: inline-block
                    width: (34/$scale)
                    height: (34/$scale)
                    background-size: contain
                    margin-right: (20/$scale)
.lastWarp
    margin-bottom: (100/$scale)
</style>