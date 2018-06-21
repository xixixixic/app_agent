<template>
    <div class="detail">
        <div class="content" :class="{'active': notifyingMsgType}">
            <ul class="list" v-if="elseTitle" v-for="item in content">
                <li class="item">
                    {{item.text}}
                </li>
            </ul>
            <ul class="list" v-else>
                <li class="item" v-html="content"></li>
            </ul>
        </div>
        <div class="footer" v-show="notifyingMsgType">
            <ul class="f_nav">
                <li class="btn l_btn" @click="inCase()">有以上部分情况</li>
                <li class="btn r_btn" @click="noCase()">没有以上情况</li>
            </ul>
        </div>
        <confirm ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
    import Confirm from '@/base/confirm/confirm'
    export default {
        data () {
            return {
                confirmText: ''
            }
        },
        created () {
            this.$emit('chanceTitle', this.title, this.backFtn)
        },
        computed: {
            title () {
                return this.$route.params.title
            },
            elseTitle () {
                return this.title === '投保声明' || this.title === '注意事项'
            },
            content () {
                return this.$route.params.content
            },
            notifyingMsgType () {
                return this.$route.params.notifyingMsgType
            },
            productId () {
                return this.$route.params.productId
            }
        },
        methods: {
            backFtn () {
                if (this.title === '健康告知') {
                    this.$router.push({
                        name: 'ProductInfo',
                        params: {
                            productId: this.productId
                        },
                        query: {
                            clear: 'true',
                            masterStat: 1
                        }
                    })
                } else if (this.title === '电子投保告知与声明') {
                    this.$router.push({
                        name: 'ProductInfo',
                        params: {
                            productId: this.productId
                        },
                        query: {
                            clear: 'true',
                            masterStat: 1
                        }
                    })
                } else if (this.title === '注意事项' || this.title === '投保声明') {
                    this.$router.push({
                        name: 'sure_step'
                    })
                }
            },
            inCase () {
                this.confirmText = '不符合本产品的投保条件，请重新确认或购买其他产品。'
                this.$refs.confirm.show()
            },
            noCase () {
               this.$router.push({path: '/first_step'})
            }
        },
        components: {
            Confirm
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .detail
        .content
            margin-top: (30/$scale)
            padding: 0 (30/$scale)
            .list
                .item
                    line-height: (46/$scale)
                    font-size: (28/$scale)
                    color: #444444
            &.active
                margin-bottom: (118/$scale)
        .footer
            position: fixed
            left: 0
            bottom: 0
            width: 100%
            height: (98/$scale)
            line-height: (98/$scale)
            text-align : center
            font-size: (34/$scale)
            color: $color-btn
            .f_nav
                display: flex
                .btn
                    flex: 1
                .l_btn
                    background: rgb(255,166,166)
                .r_btn
                    background: $color-theme
</style>