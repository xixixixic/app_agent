<template>
    <div class="item">
        <div class="inner border-1px" :class="{'active': mistakeTip !== true && !(firstIn === true && beneScaleValue === '')}">
            <div class="left">
                <span class="text">受益比例（%）</span>
            </div>
            <div class="right">
                <div v-show="hide">{{defaultValue}}</div>
                <input type="text" class="input-text" :placeholder="placeholder" v-model="beneScaleValue" @focus="clearPlaceholder" 
                @blur="regInfo">
            </div>
        </div>
        <div class="reg border-1px" v-show="mistakeTip !== true && !(firstIn === true && beneScaleValue === '')">
            <div class="warn"></div>
            <span class="text">{{mistakeTip}}</span>
        </div>
    </div>      
</template>

<script>
import {validate} from 'components/insurance/life/first_step/children/common/validate/validate-util.js'
import {mapMutations} from 'vuex'
export default {
    props: {
        client: {
            type: Object,
            default: {}
        },
        insureFieldsBeneScale: {
            type: Object,
            default: function () {
                return {}
            }
        },
        defaultValue: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            beneScaleValue: '',
            focus: false,
            hide: false,
            firstIn: true
        }
    },
    created () {
        this.setDefaultBeneScaleValue()
    },
    computed: {
        placeholder () {
            return this.focus ? '' : '请输入受益比例'
        },
        mistakeTip () {
            return validate(this.insureFieldsBeneScale, this.beneScaleValue)
        },
        validate () {
            return this.mistakeTip === true
        }
    },
    methods: {
        clearPlaceholder () {
            this.focus = true
        },
        regInfo () {
            this.focus = false
            this.SET_LIFE_POLICYINFO({
                field1: this.client.typeField,
                field2: 'benefScale',
                value: this.beneScaleValue
            })
        },
        setDefaultBeneScaleValue () {
            this.beneScaleValue = this.defaultValue
        },
        ...mapMutations({
            SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
        })
    }
}
</script>

<style scoped lang="stylus">
     @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>
