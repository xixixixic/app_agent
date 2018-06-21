<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>姓名</p>
            <p class="placeholders">
                <span>{{values}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {RegCompanyName} from 'common/js/iscardID-util.js'
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
            values: '',
            wrongTip: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.values = this.Info.defaultName
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