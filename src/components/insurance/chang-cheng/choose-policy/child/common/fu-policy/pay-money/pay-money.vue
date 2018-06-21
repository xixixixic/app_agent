<template>
    <div class="mainInfoLi">
        <span class="spanLeft">保费</span>
        <span class="spanRight">
            {{payMoney}}啊啊啊
        </span>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: {
        mainDetailPilicyType: { // 主险附险类型
            type: String,
            default: function () {
                return ''
            }
        }
    },
    computed: {
        payMoney () {
            console.log(this.changChengPolicyInfo.mainPolicy.payMoney)
            console.log('Computed this.changChengPolicyInfo.mainPolicy.payMoney')
            return this.changChengPolicyInfo.mainPolicy.payMoney
        },
        ...mapGetters([
			'changChengPolicyInfo'
		])
    },
    created () {
        console.log(this.changChengPolicyInfo)
        console.log(this.changChengPolicyInfo.mainPolicy.payMoney)
        console.log('保费')
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/choose-policy/child/stylus/common.styl'
</style>