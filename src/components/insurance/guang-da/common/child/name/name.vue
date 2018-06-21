<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>姓名</p>
            <div v-if="!edit">{{name}}</div>
            <p v-if="edit" class="placeholders">
                <input type="text" :placeholder="placeholder" class="placeholdersInput" v-model="name" @focus="clearPlaceholder" @blur='verName'/>
            </p>
        </div>
        <div :class="this.nameTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{nameTip}}</span>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import validate from 'common/js/validate-util.js'
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
        ...mapGetters([
            'guangdaPremiumRisk'
		]),
        placeholder () {
            return this.focus ? '' : '请输入姓名'
        },
        edit () {
            if (this.Info.type === 'appnt' || this.Info.type === 'insurants' ) {
                return false
            } else if (this.Info.type === 'insured' &&  this.Info.defaultRelationId === '00') {
                return false
            } else {
                return true
            }
        }
    },
    data () {
        return {
            name: '',
            nameTip: '',
            focus: false
            // edit: true
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            if (this.Info.type === 'appnt') {
            //    this.edit = false
               this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'appntName',
                    value: this.guangdaPremiumRisk.applicant.name
                })
                this.name = this.guangdaPremiumRisk.applicant.name
            } else if (this.Info.type === 'insurants') {
                // this.edit = false
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'insurant#0',
                    field3: 'name',
                    value: this.guangdaPremiumRisk.insured.name
                })
                this.name = this.guangdaPremiumRisk.insured.name
            } else {
                this.name = this.Info.defaultName
            }
            // else if (this.Info.type === 'insured' &&  this.Info.defaultRelationId === '00') {
            //         // this.edit = false
            //         this.name = this.Info.defaultName
            // }      
        },
        clearPlaceholder () {
            this.focus = true
        },
        verName () {
            if (this.edit) {
                this.nameTip = this.checkName(this.name)
                if (this.nameTip === '') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            field1: this.Info.type,
                            type:1,
                            field2: 'name',
                            value: this.name
                    })       
                    } else {
                        this.name = ''
                    }
            }
        },
        checkName (name) {
            if (name === '') {
                return '请填写姓名'
            } else if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
                  return '请检查姓名是否输入正确'
            } else {
                return ''
            }
        },
        setSame () {
            this.name = this.guangdaPremiumRisk.applicant.name
        },
        clearSame () {
            this.name = ''
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