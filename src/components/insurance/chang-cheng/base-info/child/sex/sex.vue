<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">性别</p>
            <p class="placeholders" v-show='!this.changChengBaseInfo.backStatus'>
                <button :class="isStatusA === true ? 'sex' : 'redSex'" @click='choiceWomen'>女</button>
                <button :class="isStatusB === true ? 'sex' : 'redSex'" @click='choiceMen'>男</button>
            </p>
            <p class="placeholders" v-show='this.changChengBaseInfo.backStatus'>
                <button :class="isStatusA === true ? 'greyunsex' : 'greySex'">女</button>
                <button :class="isStatusB === true ? 'greyunsex' : 'greySex'">男</button>
            </p>
        </div>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
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
			'changChengBaseInfo'
        ]),
        isStatusA () {
            if (this.Info.type === 'applicant') {
                if (this.changChengBaseInfo.applicant.sex === '1') {
                    return false
                } else if (this.changChengBaseInfo.applicant.sex === '0' || this.changChengBaseInfo.applicant.sex === '') {
                    return true
                }
            } else if (this.Info.type === 'insured') {
                if (this.changChengBaseInfo.insured.sex === '1') {
                    return false
                } else if (this.changChengBaseInfo.insured.sex === '0' || this.changChengBaseInfo.insured.sex === '') {
                    return true
                }
            }
        },
        isStatusB () {
            if (this.Info.type === 'applicant') {
                if (this.changChengBaseInfo.applicant.sex === '1' || this.changChengBaseInfo.applicant.sex === '') {
                    return true
                } else if (this.changChengBaseInfo.applicant.sex === '0') {
                    return false
                }
            } else if (this.Info.type === 'insured') {
                if (this.changChengBaseInfo.insured.sex === '1' || this.changChengBaseInfo.insured.sex === '') {
                    return true
                } else if (this.changChengBaseInfo.insured.sex === '0') {
                    return false
                }
            }
        }
    },
    data () {
        return {
            // isStatusA: true,
            // isStatusB: false,
            confirmText: '',
            sexFlag: false
        }
    },
    created () {
        // this.setDefalut()
    },
    methods: {
        setDefalut () {
            if (this.Info.defaultSex === '1') {
                this.isStatusA = false
                this.isStatusB = true
            } else if (this.Info.defaultSex === '0') {
                this.isStatusA = true
                this.isStatusB = false
            } else {
                this.isStatusA = true
                this.isStatusB = true
            }
        },
        setSame () {
            if (this.changChengBaseInfo.applicant.sex === '1') {
                console.log('sex')
                console.log(this.sex)
                this.isStatusA = false
                this.isStatusB = true
            } else if (this.changChengBaseInfo.applicant.sex === '0') {
                this.isStatusA = true
                this.isStatusB = false
            }
        },
        clearSame () {
            if (this.changChengBaseInfo.insured.sex === '1') {
                console.log('sex')
                console.log(this.sex)
                this.isStatusA = false
                this.isStatusB = true
            } else {
                this.isStatusA = true
                this.isStatusB = false
            }
        },
        choiceWomen () {
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'sex',
				value: '1'
            })
            this.setChangChengBaseInfo({
				field1: this.Info.type,
				field2: 'sexName',
				value: '女'
            })
            this.regRelationSex('women')
        },
        choiceMen () {
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'sex',
                value: '0'
            })
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'sexName',
                value: '男'
            })
            this.regRelationSex('men')
        },
        regRelationSex (flag) {
            if (this.changChengBaseInfo.insured.relaToAppntCode === '01') { // 关系为夫妻时 性别不能相同
                if (this.changChengBaseInfo.applicant.sex === this.changChengBaseInfo.insured.sex) {
                    this.showConfirm('投被保人同性不能选择夫妻关系')
                    this.setChangChengBaseInfo({
                        field1: this.Info.type,
                        field2: 'sex',
                        value: ''
                    })
                    this.sexFlag = false
                } else {
                    // if (flag === 'men') {
                    //     this.isStatusA = true
                    //     this.isStatusB = false
                    // } else {
                    //     this.isStatusA = false
                    //     this.isStatusB = true
                    // }
                    // this.sexFlag = true
                }
            } else {
                // if (flag === 'men') {
                //     this.isStatusA = true
                //     this.isStatusB = false
                // } else {
                //     this.isStatusA = false
                //     this.isStatusB = true
                // }
                // this.sexFlag = true
            }
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    },
    components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>