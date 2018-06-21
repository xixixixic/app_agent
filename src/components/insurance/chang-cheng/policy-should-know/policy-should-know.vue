<template>
    <div class="policyShouldKnow">
        <slider-bar :defaultSelected='defaultSelected'></slider-bar>
        <split></split>
        <div class="contentWarp">
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
                    <span class='specialWord'>1、投保提示。</span>为了使您详知所投保的保险内容并维护您的合法权益，<span class='specialWord'>投保之前请认真阅读并签署《投保提示书》；</span>认真阅读《保险条款》，并确认已了解保险条款的各项内容（注意<span class='specialWord'>“保险责任”、“免责条款”、“犹豫期”、“退保”</span>等关键信息）。本投保单信息用途包括但不限于计算保费、核保、寄送保单和客户回访等。本公司承诺未经您同意，不会将您的信息用于人身保险公司和第三方机构的销售活动
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>2、如实告知义务。</span>根据《保险法》，您有如实告知的义务。如故意隐瞒或不实告知，本公司有权依据法律规定及本保险合同约定解除保险合同。<span class='specialWord'>所有告知事项均以书面告知为准，口头告知无效。</span>
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>3、投保人对被保险人应有保险利益。</span>如为未成年人投保以身故为保险金给付责任的保险，投保人须为未成年人的父母，且累计身故保险金不能超过保险监督管理机构的规定额度。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>4、请选择合乎自己财务状况的保险计划。</span>如果您选择分期交费，请您知晓若不能按保险合同约定交纳保险费会导致保单失效，给您带来损失和不便。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>5、临时保障。</span>在收到您的投保书和首期保险费之后，您享有本公司提供的临时保障，至本公司同意承保或拒保并退还保险费为止。临时保障仅限于条款规定的意外身故责任，且保障额度取投保保额和20万元人民币之中的较小者。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>6、保险合同生效。</span>本公司同意承保且您已经支付了足额首期保险费后，保险合同才能生效，合同成立日及生效日以保险合同所载日期为准。
                </p>
                <p class='detailContent'>
                    <span class='specialWord'>7、选择低碳，绿色相伴。</span>我司将通过官网www.greatlife.cn向您提供各类电子信函，您可随时查询下载，我司将默认您同意使用电子信函，感谢您对绿色节能的支持。您可使用任意手机号向95576发送短信申请纸质信函，例：NBY9025000012341288
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
        <div class="contentWarp">
            <div class="title">
                <span class='leftWord'>授权和声明</span>
                <div @click='SqsmArrChange' class='rightWord'>
                    <p class='agreeWord'>
                        <span class='rightWord' v-show='SqsmAgree'>已同意</span>
                    </p>
                    <i :class="this.SqsmContentStatus === false ? 'icon-down_arrow' : 'icon-top_arrow'" class="ico"></i>
                </div>
            </div>
            <div class="content" v-show='SqsmContentStatus'>
                <p class='detailContent'>
                    1、本投保书和相关问卷以及对长城人寿保险股份有限公司（以下简称“贵公司”）体检医生的各项声明与陈述准确无误。若不属实，且该不如实告知足以影响贵公司决定是否同意承保或提高保险费率的，贵公司有权依法解除保险合同，并且对合同解除前已经发生的保险事故不承担保险责任
                </p>
                <p class='detailContent'>
                    2、本人已阅读并同意本投保书、人身保险投保提示书、特别提示、投保须知及责任免除告知书中列明的各类事项。
                </p>
                <p class='detailContent'>
                    3、贵公司已向本人提供了投保险种的保险条款，本人已经阅读并理解，知晓所有保险责任以正式合同所载为准，除贵公司经正式程序修改或批注的内容外，其他任何人的口头及书面陈述、报告或附约，贵公司无需负责。保险条款已随投保书由本人同时受领。
                </p>
                <p class='detailContent'>
                    4、本人已知晓附加险的保险期间，并知晓所购产品是否提供保证续保及续保有效时间。
                </p>
                <p class='detailContent'>
                    5、本人已知晓保障功能相同或类似的费用补偿型医疗保险产品不能重复赔付。
                </p>
                <p class='detailContent'>
                    6、本人已知晓在犹豫期后解除保险合同会遭受一定损失。
                </p>
                <p class='detailContent'>
                    7、本人授权贵公司就有关保险事宜，可以向任何医生、医院、诊所、保险公司或任何组织机构查询有关投保人及被保险人的资料或索取其他证明，本人同意贵公司持有、使用该资料处理与本人保险合同相关的审核、服务、理赔事宜。
                </p>
                <p class='detailContent'>
                    8、本人已知晓在审核本人的投保申请过程中，贵公司可能会要求被保险人、投保人进行体检或补充其他材料；贵公司可能会在此合同成立前面见投保人及被保险人。贵公司可能会对投保申请做出提高费率、附加条件、拒保、延期承保、降低保额等处理；在附加险续保时，贵公司有权进行重新核保。
                </p>
                <p class='detailContent'>
                    9、本人已知晓对于非本人签名的保单，合同效力不受法律保护。本人保证本投保书各项内容均为本人亲自填写，本人及被保险人/法定监护人亲笔签名确认。
                </p>
                <p class='detailContent'>
                     <span class='specialRedWord'>10、分红保险的分红收益，万能保险保障利率之上的收益与投资连结保险投资账户收益并不确定，请您详阅投保提示书第六条，如投保险种中含上述三类新型产品，按法规要求请投保人阅读并亲笔抄录以下内容: </span>
                </p>
                <div class='agreeDetail' @click='SqsmChangeCircle'>
                    <p class='agreeDetailP'>
                        <span :class="this.SqsmGouStatus === false ? 'gouIco': 'circleIco'"></span>
                    </p>
                    <p class='agreeDetailP'>
                       <span>我已阅读并同意以上内容</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="contentWarp lastWarp">
            <div class="title lastTitle">
                <span class='leftWord'>保险费及生存金自动转账授权书</span>
                <div @click='BxfScjArrChange' class='rightWord'>
                    <p class='agreeWord'>
                        <span class='rightWord' v-show='BxfScjAgree'>已同意</span>
                    </p>
                    <i :class="this.BxfScjContentStatus === false ? 'icon-down_arrow' : 'icon-top_arrow'" class="ico"></i>
                </div>
            </div>
            <div class="content" v-show='BxfScjContentStatus'>
                <p class='detailContent'>
                    1、投保人同意本公司从本投保书授权的银行账号中转账支付保险费。
                </p>
                <p class='detailContent'>
                    2、投保人保证此账号中余额充足。若因余额不足造成转账不成功，导致合同不能生效或合同失效的，后果由投保人承担。
                </p>
                <p class='detailContent'>
                    3、投保人同意本公司通过此账号进行退费操作。
                </p>
                <p class='detailContent'>
                    4、投保人因故结清账户或希望改变付费账户，应及时通知本公司进行变更。
                </p>
                <p class='detailContent'>
                    5、本公司将自保险合同约定的生存保险金给付日通过转账形式给付生存保险金，直至生存受益人（被保险人）取消生存金转账授权。
                </p>
                <p class='detailContent'>
                    6、如果本保单停效、自垫停效、终止后，生存金自动转账领取授权功能自动取消，不再支付生存保险金；保单复效、自垫复效后，保单根据自动转账授权情况恢复处理。
                </p>
                <p class='detailContent'>
                    7、如果保单发生生存受益人变更、生存受益人资料变更，生存受益人（被保险人）须取消生存金转账授权，待生存受益人重新确定。
                </p>
                <p class='detailContent'>
                    8、生存金转账授权期间，生存保险金不计息。如果生存受益人（被保险人）已经成功取消生存金转账授权，生存保险金账户从取消授权后第一次分配生存保险金的时点开始恢复计息。
                </p>
                <p class='detailContent'>
                    9、如果被保险人身故，投保人或受益人应及时通知本公司停止支付生存保险金，且本公司有权追回已给付的被保险人身故后各期的生存保险金。
                </p>
                <div class='agreeDetail' @click='BxfScjChangeCircle'>
                    <p class='agreeDetailP'>
                        <span :class="this.BxfScjGouStatus === false ? 'gouIco': 'circleIco'"></span>
                    </p>
                    <p class='agreeDetailP'>
                       <span>我已阅读并同意以上内容</span>
                    </p>
                </div>
            </div>
        </div>
        <info-footer text="下一步" @next='_next()'></info-footer>
        <!-- <div class="footer">
            下一步
        </div> -->
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import SliderBar from 'base/sliderBar/sliderBar'
import Split from 'base/split/split'
import InfoFooter from 'base/footer/footer'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import {initBankInfo} from 'api/long-life/chang-cheng/insurance'
import {RET_OK, CODE_OK} from 'service/variable'
import {mapMutations} from 'vuex'
export default {
    mixins: [confirm],
    computed: {
        defaultSelected () {
			return 5
		}
    },
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
            BxfScjContentStatus: false
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
            this.SqsmGouStatus = !this.SqsmGouStatus
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
            } else if (this.SqsmAgree !== true) {
                this.showConfirm('必须同意授权和声明')
            } else if (this.BxfScjAgree !== true) {
                this.showConfirm('必须同意保险费及生存金自动转账授权书')
            } else {
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
        },
        ...mapMutations({
                setChangChengBankDetail: 'SET_LONGLIFE_CHANGCHENG_BANKDETAIL'
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
    background: #fff
    .title
        height: (90/$scale)
        line-height: (90/$scale)
        background: #fff
        display: flex
        justify-content: space-between
        border-bottom: 1px solid #e6e6e6
        margin: 0 (30/$scale)
        &.lastTitle
            border-bottom: none
        .leftWord
            font-size: (30/$scale)
            color: #333
        .rightWord
            font-size: (28/$scale)
            color: $color-theme
            .agreeWord
                display: inline-block
            .ico
                font-size: (28/$scale)
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