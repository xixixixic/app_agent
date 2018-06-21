<template>
    <div class="title">
        <div class="inner">
            <div class="text">{{title}}</div>
            <i @click="toggeleInfo" :class="iconDownClass"></i>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            state: {
                type: Number,
                default: 1
            },
            showApplicant: {
                type: Boolean,
                default: true
            },
            showInsured: {
                type: Boolean,
                default: true
            },
            showBeneficiary: {
                type: Boolean,
                default: true
            },
            showBank: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            iconDownClass () {
                if (this.state === 1) {
                    if (!this.showApplicant) return 'icon-circle_down'
                    else return 'icon-circle_up'
                } else if (this.state === 2) {
                    if (!this.showInsured) return 'icon-circle_down'
                    else return 'icon-circle_up'
                } else if (this.state === 3) {
                    if (!this.showBeneficiary) return 'icon-circle_down'
                    else return 'icon-circle_up'
                }
                if (!this.showBank) return 'icon-circle_down'
                else return 'icon-circle_up'
            }
        },
        methods: {
            toggeleInfo () {
                if (this.state === 1) {
                    this.$emit('clickApplicant')
                } else if (this.state === 2) {
                    this.$emit('clickInsured')
                } else if (this.state === 3) {
                    this.$emit('clickBeneficiary')
                }
                this.$emit('clickBank')
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~common/stylus/variable.styl'
    .title
        padding: 0 (30/$scale)
        border-bottom: (2/$scale) solid $color-theme
        .inner
            display: flex
            .text
                line-height: (100/$scale)
                font-weight: bold
                font-size: (30/$scale)
                color: rgb(68,68,68)
            .icon-circle_up, .icon-circle_down
                flex: 1
                line-height: (100/$scale)
                font-size: (40/$scale)
                text-align: right
                color: $color-theme
</style>