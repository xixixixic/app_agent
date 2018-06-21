<template>
    <div>
        <div class='item'>
            <div class='inner border-1px'>
                <div class='left'>
                    <span class='text'>受益人顺序</span>
                </div>
                <div class='right'>
                    <span class='text'>{{defaultText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props: {
        client: {
            type: Object,
            default: {}
        },
        defaultValue: {
            type: Number,
            default: 0
        }
    },
    created () {
        this.SET_LIFE_POLICYINFO({
            field1: this.client.typeField,
            field2: 'benefOrder',
            value: this.defaultValue + 1
        })
    },
    computed: {
        defaultText () {
            if (this.defaultValue === 0) return '第一受益人'
            if (this.defaultValue === 1) return '第二受益人'
            if (this.defaultValue === 2) return '第三受益人'
        }
    },
    methods: {
        ...mapMutations({
            SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
        })
    }
}
</script>
<style scoped lang='stylus'>
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>