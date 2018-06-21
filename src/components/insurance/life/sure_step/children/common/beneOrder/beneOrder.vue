<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">受益人顺序</span>
            </div>
            <div class="right">
                <span class="text">{{text}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            content: {
                type: Number,
                default: 0
            }
        },
        computed: {
            text () {
                if (this.content === 1) {
                    return '第一受益人'
                } else if (this.content === 2) {
                    return '第二受益人'
                } else if (this.content === 3) {
                    return '第三受益人'
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>