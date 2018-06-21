<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">居民类型</p>
            <p class="placeholders">
                <button :class="choiceflag === '2'? 'redRes' : 'res'" @click='choice(2)'>非城镇</button>
                <button :class="choiceflag === '1'? 'redRes' : 'res'" @click='choice(1)'>城镇</button>
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
    data () {
        return {
            choiceflag: '1',
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.choiceflag = this.Info.defaultResidentType
        },
        choice(type) {
            this.choiceflag = type.toString()
            if (this.Info.type === 'appnt') {
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'residentType',
                    value: type.toString()
                })
            } else if (this.Info.type === 'insurants') {
                 this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: this.Info.type,
                    field2: 'insurant#0',
                    field3: 'residentType',
                    value: type.toString()
                })
            }
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