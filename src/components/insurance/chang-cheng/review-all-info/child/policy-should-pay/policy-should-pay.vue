<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>保险费（元/期）</p>
            <p class="placeholders active">
                <span>{{values}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        InfoDetail: {
            type: Number,
            default: function () {
                return 0
            }
        }
    },
    computed: {
        values () {
            return this.InfoDetail
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>