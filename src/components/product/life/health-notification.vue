<template>
    <div class="detail">
        <div class="content" v-html="healthNotify"></div>
        <div class="footer">
            <ul class="f_nav">
                <li class="btn l_btn" @click="inCase()">有以上部分情况</li>
                <li class="btn r_btn" @click="noCase()">没有以上情况</li>
            </ul>
        </div>
        <confirm ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
    import Confirm from 'base/confirm/confirm'
    import {mapGetters} from 'vuex'
    export default {
        data () {
            return {
                confirmText: ''
            }
        },
        created () {
        },
        computed: {
            ...mapGetters([
                'lifeInsuranceRules'
            ]),
            healthNotify () {
                return (JSON.parse(this.lifeInsuranceRules.notifyingMsgType)).healthNotify
            }
        },
        methods: {
            inCase () {
                this.confirmText = '不符合本产品的投保条件，请重新确认或购买其他产品。'
                this.$refs.confirm.show()
            },
            noCase () {
                this.$router.push({
                    path: '/first_step'
                })
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
            margin-bottom: (120/$scale)
            padding: 0 (30/$scale)
            line-height: (46/$scale)
            font-size: (28/$scale)
            color: #444444
        .footer
            position: fixed
            left: 0
            bottom: (-1/$scale)
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