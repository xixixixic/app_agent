<template>
    <div class="mainInfoLi">
        <span class="spanLeft">保额</span>
        <span class="spanRight">
            <span  @click="reduceMoney" class="add">-</span>
            <span>{{money}}</span>
            <span  @click="AddMoney" class="add">+</span>
        </span>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
export default {
    mixins: [confirm],
    data () {
        return {
            money:0,
            showSelectdropWrap: false
        }
    },
    computed: {
        ...mapGetters([
			'guangdaPolicy',
            'guangdaMainRisk'
		])
    },
    created () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            this.money = Number(this.guangdaMainRisk.amount)
        },
        reduceMoney() {
            if (this.money > 50000) {
                this.money -= 10000
            this.SET_LONGLIFE_GUANGDA_POLICYINFO({
				field1: 'tempAmount',
				value: this.money
           })
            } else {
                this.showConfirm('最低保额为50000')
                return false
            }
        },
        AddMoney () {
            this.money += 10000
              this.SET_LONGLIFE_GUANGDA_POLICYINFO({
				field1: 'tempAmount',
				value: this.money
           })
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        Confirm
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/choose-policy/child/stylus/common.styl'
.add
    color #ccc !important
    font-size 0.42rem !important
    margin 0.1rem
</style>