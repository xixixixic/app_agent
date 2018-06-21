<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>受益比例</p>
            <p class="placeholders">
                <input type="text" :placeholder="placeholder"  class="placeholdersInput" @focus="clearPlaceholder"  v-model="benefitOrder" @blur='verIncome'/>%
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
        </div>
    </div>
</template>

<script>
import {checkNum} from 'common/js/validate-util.js'
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        placeholder () {
            return this.focus ? '' : '请填写受益比例'
        }
    },
    data () {
        return {
            benefitOrder: '',
            wrongTip: '',
            focus: false
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.benefitOrder = this.Info.defaultbenefitOrder
        },
        clearPlaceholder () {
            this.focus = true
        },
        verIncome () {
            this.wrongTip = checkNum(this.benefitOrder)
            if (this.wrongTip !== '') {
                this.benefitOrder = ''
            } else {
                let benefitOrder = parseInt(this.benefitOrder)
                if (benefitOrder > 100) {
                    this.wrongTip = '受益比例必须在100以内'
                    this.benefitOrder = ''
                } else if (benefitOrder === 0) {
                    this.wrongTip = '受益比例必须大于0'
                    this.benefitOrder = ''
                }
            }
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'bfcyRatio',
                    index: this.Info.index,
                    value: this.benefitOrder.toString()
            })
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>