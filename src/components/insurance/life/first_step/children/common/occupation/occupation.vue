<template>
    <div>
        <div class="item">
            <div class="inner">
                <div class="left">
                    <span class="text">职业类型</span>
                </div>
                <div class="right" @click="showSelectdrop">
                    <span class="text" :class="{'special-text': text === '请选择职业类型'}">{{text}}</span><i class="icon-right_arrow" :class="{'special-text': text === '请选择职业类型'}"></i>
                </div>
            </div>
        </div>
        <select-Drop :selectArray="occupationArray" :defaultValue="defaultOccupationCode" selectTitle="请选择职业类型" :client="client" v-show="showSelectdropWrap" @sureSelectDrop="sureSelectDrop" 
        @hideSelectDrop="hideSelectDrop">
        </select-Drop>
    </div>
</template>
<script>
    import SelectDrop from 'components/insurance/life/first_step/children/common/selectDrop/selectDrop'
    import {setBenRen} from 'common/js/mixin.js'
    import {mapMutations} from 'vuex'
    export default {
        mixins: [setBenRen],
        props: {
            occupationArray: {
                type: Array,
                default: function () {
                    return []
                }
            },
            client: {
                type: Object,
                default: {}
            },
            defaultOccupationCode: {
                type: String,
                default: ''
            },
            editable: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                showSelectdropWrap: false
            }
        },
        computed: {
            text () {
                for (let obj of this.occupationArray) {
                    if (obj.nativeCode === this.defaultOccupationCode) {
                        return obj.name
                    }
                }
                return '请选择职业类型'
            },
            validate () {
                if (this.text === '请选择职业类型') return false
                return true
            }
        },
        methods: {
            showSelectdrop () {
                if (this.editable === false) return false
                this.showSelectdropWrap = true
            },
            sureSelectDrop (data) {
                this.showSelectdropWrap = false
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'occupationCode',
                    value: data.nativeCode
                })
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'occupationName',
                    value: data.name
                })
                this.setBenrenInfo()
            },
            hideSelectDrop () {
                this.showSelectdropWrap = false
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        },
        components: {
            SelectDrop
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>