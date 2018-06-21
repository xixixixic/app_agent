<template>
    <div class="item">
        <div class="inner">
            <div class="left">
                <span class="text">{{text}}</span>
            </div>
            <div class="right">
                <span class="text">{{content}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            idTypeId: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
        computed: {
            text () {
                if (this.idTypeId === '1') {
                    return '身份证'
                } else {
                    return '军官证'
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/sure_step/children/stylus/common.styl'
</style>