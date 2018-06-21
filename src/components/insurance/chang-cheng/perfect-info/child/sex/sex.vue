<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">性别</p>
            <p class="placeholders">
                <button :class="isStatusA === true ? 'sex' : 'redSex'">女</button>
                <button :class="isStatusB === true ? 'sex' : 'redSex'">男</button>
            </p>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        Info: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters([
			'changChengBaseInfo'
		])
    },
    data () {
        return {
            isStatusA: true,
            isStatusB: false
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            if (this.Info.defaultSex === '1') {
                this.isStatusA = false
                this.isStatusB = true
            } else if (this.Info.defaultSex === '0') {
                this.isStatusA = true
                this.isStatusB = false
            }
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
</style>