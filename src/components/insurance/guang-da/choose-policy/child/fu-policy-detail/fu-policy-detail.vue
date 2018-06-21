<template>
    <div class="mianPolicy" v-show='fuShow'>
        <div class="policyWarp">
            <div class="mainTitle">
                选择附加险
            </div>
            <div class="mainInfo">
                <div class='mainInfoUl'>
                    <choose-fu-policy></choose-fu-policy>
                </div>
            </div>
            <div class="btnGrounp">
                <div class='btnGrey' @click='cancle'>取消</div>
                <div class='btn' @click='sure'>确定</div>
            </div>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import ChooseFuPolicy from 'components/insurance/guang-da/choose-policy/child/common/choose-fu-policy/choose-fu-policy.vue'
import {culatePremiumForOneAddRisk} from 'api/long-life/guang-da/insurance.js'
import {CODE_OK} from 'service/variable.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            fuShow: false
        }
    },
    computed: {
        ...mapGetters([
            'guangdaPremiumRisk',
            'guangdaPolicy'
        ])
    },
    methods: {
        sure () {
             for(let i = 0; i < this.guangdaPolicy.selectFuPolicy.length; i++) {
                   if (this.guangdaPolicy.selectFuPolicy[i].localProductId === this.guangdaPremiumRisk.policy.productId.toString()) {
                        this.showConfirm('已选择该附加险,请选择其它附加险')
                        return false
                   }
               }
            if(this.guangdaPremiumRisk.policy.amount === 0) {
                this.showConfirm('请检查附加险选择项')
                return false
            } else if (this.guangdaPremiumRisk.policy.productId === 0) {
                this.showConfirm('请检查附加险选择项')
                return false
            } else {
                culatePremiumForOneAddRisk(this.guangdaPremiumRisk).then(res =>{
                    if (res.data.code === CODE_OK) {
                        if (res.data.result.resultCode === '1') {
                            this.fuShow = false
                            this.ADD_GUANGDA_FU(res.data.result.resultMsg)
                        }
                    }
                })
            }
        },
        cancle () {
            this.fuShow = false
        },
        ...mapMutations({
            ADD_GUANGDA_FU:'ADD_GUANGDA_FU'
		})
    },
    components: {
        ChooseFuPolicy,
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.mianPolicy
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: rgba(0,0,0,0.5)
    z-index: 99
    .policyWarp
        width: (710/$scale)
        margin: (100/$scale) auto 0 auto
        background: #fff
        border-radius: (10/$scale)
        .mainTitle
            height: (100/$scale)
            line-height: (100/$scale)
            text-align: center
            color: $color-main
            background: #AAD0ff
            font-size: (34/$scale)
            border-radius: (10/$scale) (10/$scale) 0 0
        .mainInfo
            .mainInfoUl
                .mainInfoLi
                    list-style: none
                    font-size: (30/$scale)
                    height: (100/$scale)
                    line-height: (100/$scale)
                    border-bottom: 1px solid #dcdcdc
                    padding: 0 (40/$scale) 0 (30/$scale)
                    display: flex
                    justify-content: space-between
                    .spanLeft
                        color: $color-a-left
                    .spanRight
                        color: $color-a-right
                        .ico
                            margin-left: (20/$scale)
                            color: $color-theme-placeholder
                        input
                            text-align: right
        .btnGrounp
            .btn
                width: (200/$scale)
                height: (70/$scale)
                line-height: (70/$scale)
                text-align: center
                font-size: (30/$scale)
                color: #fff
                bg-image('blue')
                background-size: cover
                margin: (70/$scale) 0
                display: inline-block
                margin-left: (50/$scale)
            .btnGrey
                width: (200/$scale)
                height: (70/$scale)
                line-height: (70/$scale)
                text-align: center
                font-size: (30/$scale)
                color: #fff
                bg-image('lightBlue')
                background-size: cover
                margin: (70/$scale) 0
                display: inline-block
                margin-left: (110/$scale)
</style>