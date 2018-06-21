<template>
    <div class="duty">
        <div class="title">保险计划</div>
        <div class="inner">
            <div class="header">
                <div class="text">计划选择：</div>
                <div class="tab">
                    <ul class="list">
                        <li v-for="(item,index) in plans" class="item" :class="{'active': selected === index}" @click="tabPlans(index)">{{item.projectName}}</li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="tableWrap" v-html="plans[selected].remark1"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            plans: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                selected: 0
            }
        },
        methods: {
            tabPlans (index) {
                this.selected = index
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .duty
         margin : 0 (30/$scale)
        .title
            padding: (28/$scale) 0
            font-size: (30/$scale)
            color: rgb(51,51,51)
        .inner
            border: 1px solid #e6e6e6
            .header
                display: flex
                height: (78/$scale)
                background-color: $color-theme-opacity
                .text
                    padding: 0 (20/$scale)
                    line-height: (76/$scale)
                    font-size: (28/$scale)
                    color: rgb(51,51,51)
                .tab
                    flex: 1
                    .list
                        display: flex
                        margin: (17/$scale) 0
                        .item
                            flex: 1
                            margin-right: (10/$scale)
                            height: (46/$scale)
                            line-height: @height
                            font-size: (28/$scale)
                            text-align: center
                            border-radius: (5/$scale)
                            color: rgb(51,51,51)
                            &.active
                                background: $color-theme
                                color: #ffffff     
            .container
                .tableWrap
                    width: 100%
</style>