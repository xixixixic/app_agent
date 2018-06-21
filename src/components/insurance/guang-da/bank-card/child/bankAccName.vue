<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>银行卡户名</p>
            <div v-if="!edit">{{name}}</div>
            <p v-if="edit" class="placeholders">
                <input type="text"  class="placeholdersInput" v-model="name" readonly/>
            </p>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    data () {
        return {
            name: '',
            nameTip: '',
            focus: false,
            edit: true
        }
    },
    created () {
        this.setDefalut()
    },
    computed: {
        ...mapGetters([
            'guangdaPremiumRisk',
            'guangdaTrail'
		])
    },
    methods: {
        setDefalut () {
            this.name = this.guangdaPremiumRisk.applicant.name
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'productInfo',
                    field2: 'bankAccName',
                    value: this.name
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