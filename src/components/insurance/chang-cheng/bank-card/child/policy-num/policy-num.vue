<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">投保单串号：</p>
            <p class="placeholders active">
                <span>{{values}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        values () {
            return this.changChengBankDetail.bankInfo.tradeNo
        },
        ...mapGetters([
			'changChengBankDetail'
		])
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>