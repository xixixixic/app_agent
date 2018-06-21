<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">性别</p>
            <p class="placeholders">
                <button :class="choiceflag === 2? 'redSex' : 'sex'" @click='choice(2)'>女</button>
                <button :class="choiceflag === 1? 'redSex' : 'sex'" @click='choice(1)'>男</button>
            </p>
        </div>
    </div>
</template>

<script>
import event from 'common/js/event.js'
import {mapGetters, mapMutations} from 'vuex'
import {getSexId} from 'common/js/iscardID-util.js'
import {setBenRen} from 'common/js/mixin.js'
export default {
    mixins: [setBenRen],
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
            'guangdaTrail'
        ])
    },
    data () {
        return {
            choiceflag: 1,
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            if (this.Info.defaultIdType === '11') {
                if (this.Info.defaultIdNo !== '') {
                    this.choiceflag = Number(getSexId(this.Info.defaultIdNo))
                }
            } else {
                this.choiceflag = Number(this.Info.defaultSex) + 1
            }
        },
        choice(type) {
            if (this.Info.defaultIdType !== '11') {
                    this.choiceflag = type
            } else {
                if (this.Info.defaultIdNo !== '') {
                    this.choiceflag = Number(getSexId(this.Info.defaultIdNo))
                }
            }
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'bfcySex',
                    index: this.Info.index,
                    value: (this.choiceflag - 1).toString()
                })
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>