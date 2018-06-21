<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">性别</p>
            <p class="placeholders">
                <button :class="choiceflag === 2? 'redSex' : 'sex'" @click='choice(2)'>女</button>
                <button :class="choiceflag === 1? 'redSex' : 'sex'" @click='choice(1)'>男</button>
            </p>
        </div>
    </div>
</template>

<script>
import event from 'common/js/event.js'
import {mapGetters, mapMutations} from 'vuex'
import {getSexId} from 'common/js/iscardID-util.js'
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
		])
    },
    data () {
        return {
            choiceflag: 1,
            edit : true
        }
    },
    created () {
        this.setDefalut()
        // event.$on('getCard',(data) =>{
        //     this.choiceflag = Number(getSexId(data.card))
        //     console.log('sex获取type1')
        //     console.log(data.type)
        //     console.log(this.Info.type)
        //     if (data.type === this.Info.type) {
        //         this.SET_LONGLIFE_GUANGDA_POLICYINFO({
        //             field1: this.Info.type,
        //             type: 1,
        //             field2: 'sex',
        //             value: this.choiceflag
        //         })
        //         this.SET_LONGLIFE_GUANGDA_POLICYINFO({
        //             type: 2,
        //             field1: 'sex',
        //             value: this.choiceflag
        //         })
        //         this.edit = false
        //     }
        // })
        // event.$on('getCardType',(data) =>{
        //     console.log('sex获取type2')
        //     console.log(data.type)
        //     console.log(this.Info.type)
        //     if (data.type === this.Info.type) {
        //         if (data.type !== '11'){
        //             this.edit = true
        //         }
        //     }
        // })
    },
    methods: {
        setDefalut () {
                if (this.Info.type === 'appnt' || this.Info.type === 'insurants') {
                    this.edit = false
                    if (this.Info.type === 'appnt') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'appntSex',
                            value: (this.guangdaPremiumRisk.applicant.sex - 1).toString()
                        })
                        this.choiceflag = Number(this.guangdaPremiumRisk.applicant.sex)
                    } else if (this.Info.type === 'insurants') {
                         this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: this.Info.type,
                            field2: 'insurant#0',
                            field3: 'sex',
                            value: (this.guangdaPremiumRisk.insured.sex - 1).toString()
                        })
                        this.choiceflag = Number(this.guangdaPremiumRisk.insured.sex)
                    }
                } else {
                    if (this.Info.defaultIdType === '11'){
                        if (this.Info.defaultIdNo !== '') {
                            this.choiceflag = Number(getSexId(this.Info.defaultIdNo))
                            this.edit = false
                        }
                    } else if (this.Info.type === 'insured' &&  this.Info.defaultRelationId === '00') {
                            this.edit = false
                    } else {
                        this.choiceflag = Number(this.Info.defaultSex)
                    }
                }
        },
        choice(type) {
           if (this.edit) {
                this.choiceflag = type
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        field1: this.Info.type,
                        type: 1,
                        field2: 'sex',
                        value: type
                })
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 2,
                    field1: 'sex',
                    value: type
                 })
           }
        },
        setSame () {
            this.choiceflag = Number(this.guangdaPremiumRisk.applicant.sex)
        },
        clearSame () {
            this.choiceflag = 1
        },
        setCardType () {
            let idType, idNo
            if (this.Info.type === 'applicant') {
                idType = this.guangdaPremiumRisk.applicant.idType
                idNo = this.guangdaPremiumRisk.applicant.idNo
            } else if (this.Info.type === 'insured') {
                idType = this.guangdaPremiumRisk.insured.idType
                idNo = this.guangdaPremiumRisk.insured.idNo
            }
            if (idType === '11') {
                this.edit = false
                this.choiceflag = Number(getSexId(idNo))
            } else {
                this.edit = true
            }
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 2,
                    field1: 'sex',
                    value: Number(this.choiceflag)
            })
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                type: 1,
                field1: this.Info.type,
                field2: 'sex',
                value: Number(this.choiceflag)
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