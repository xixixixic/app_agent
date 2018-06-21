<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">投保单确认书号：</p>
            <p class="placeholders">
                <input type="text" placeholder="请填写投保单确认书号" class="placeholdersInput" v-model="values" @blur='verValue' :disabled='flagBtn'/>
                <button class='apply' @click='applyNum' :disabled='flagBtn' :class="{'active' : flagBtn}">申请</button>
            </p>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}填写有误</span>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getTradeNum} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import {RegInsPolicyNo} from 'common/js/iscardID-util.js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
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
			'changChengBankDetail'
        ]),
        flagBtn () {
            return this.changChengBankDetail.btnFlag
        }
    },
    data () {
        return {
            values: '',
            wrongTip: '',
            confirmText: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.values = this.Info.defaultInsPolicyNo
            // this.setChangChengBankDetail({
            //     field1: 'btnFlag',
            //     value: false
            // })
        },
        verValue () {
            if (RegInsPolicyNo(this.values) === false) {
                this.wrongTip = '投保单确认书号'
                this.values = ''
                this.setChangChengBankDetail({
                    field1: this.Info.type,
                    field2: 'insPolicyNo',
                    value: ''
                })               
            } else {
                this.wrongTip = ''
                this.setChangChengBankDetail({
                    field1: this.Info.type,
                    field2: 'insPolicyNo',
                    value: this.values
                })
            }
        },
        applyNum () {
            if (this.wrongTip === '' && this.values !== '') {
                // this.flagBtn = true
                getTradeNum(this.values).then(res => {
                    if (res.ret === RET_OK) {
                        if (res.data.code === CODE_OK) {
                            this.setChangChengBankDetail({
                                field1: 'btnFlag',
                                value: true
                            })
                            this.setChangChengBankDetail({
                                field1: this.Info.type,
                                field2: 'tradeNo',
                                value: res.data.tradeNo
                            })
                        } else {
                            this.setChangChengBankDetail({
                                field1: this.Info.type,
                                field2: 'tradeNo',
                                value: ''
                            })
                            this.showConfirm(res.data.remarkMsg)
                        }
                    } else {
                        this.setChangChengBankDetail({
                            field1: this.Info.type,
                            field2: 'tradeNo',
                            value: ''
                        })
                        this.showConfirm(res.data.remarkMsg)
                    }
                })
            } else {
                this.showConfirm('请检查投保单确认书号填写')
            }
        },
        ...mapMutations({
			setChangChengBankDetail: 'SET_LONGLIFE_CHANGCHENG_BANKDETAIL'
		})
    },
    components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
.desTitle
    width: (240/$scale)
.placeholders
    width: (440/$scale)
    .placeholdersInput
        width: (320/$scale)
    .apply
        border: 1px solid $color-theme
        padding: (10/$scale) (20/$scale)
        color: $color-theme
        border-radius: (10/$scale)
        background: #fff
        &.active
            border: 1px solid #bbb
            color: #bbb
            background: #fff
</style>