<template>
    <div> 
        <div class="item border-1px">
            <div class="inner">
                <div class="left"><span class="text">与投保人关系</span></div>
                <div class="right" v-if="relationId === '5'">
                    <span class="text" :class="{'special-text': relationId !== '5'}">本人</span>
                </div>
                <div class="right" @click="showSelectdrop" v-else>
                    <span class="text" :class="{'special-text': text === '请选择关系'}">{{text}}</span><i class="icon-right_arrow"></i>
                </div>
            </div>
        </div>
        <select-Drop :selectArray="relationArray" :defaultValue="defaultRelationId" selectTitle="请选择关系" :client="client" v-show="showSelectdropWrap" @sureSelectDrop="sureSelectDrop" 
        @hideSelectDrop="hideSelectDrop">
        </select-Drop>
    </div>
</template>
<script>
    import SelectDrop from 'components/insurance/life/first_step/children/common/selectDrop/selectDrop'
    import {mapMutations} from 'vuex'
    export default {
        props: {
            relationId: {
                type: String,
                default: ''
            },
            client: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            relationArray: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data () {
            return {
                showSelectdropWrap: false
            }
        },
        updated () {
            this.firstIn = false
        },
        computed: {
            text () {
                for (let obj of this.relationArray) {
                    if (obj.nativeCode === this.relationId) {
                        return obj.name
                    }
                }
                return '请选择关系'
            },
            defaultRelationId () {
                if (this.relationId !== null) return this.relationId.toString()
            },
            validate () {
                if (this.text === '请选择关系') return false
                else return true
            }
        },
        methods: {
            showSelectdrop () {
                this.showSelectdropWrap = true
            },
            sureSelectDrop (data) {
                this.showSelectdropWrap = false
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'relationId',
                    value: data.nativeCode
                })
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'relationName',
                    value: data.name
                })
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