<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>性别</p>
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
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        values () {
            return this.InfoDetail.sexName
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>