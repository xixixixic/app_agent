<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>学校/单位地址</p>
            <p class="placeholders" :class="{'placeholdersAdd': values.length > 14}">
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
            return this.InfoDetail.address
        }
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
.detail
    .info
        .desTitle
            width: 40%
        .placeholdersAdd
            line-height: (52/$scale)
            color: #bbb
</style>