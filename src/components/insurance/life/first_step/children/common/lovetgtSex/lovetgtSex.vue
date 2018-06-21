<template>
    <div class="item">
        <div class="inner">
            <div class="left"><span class="text">心上人性别</span></div>
            <div class="right">
                <div v-show="hideSex">{{defaultSexId}}</div>
                <div class="sex" :class="{'active': sexVal === sex.nativeCode}" v-for="sex in sexArray"
                     @click="choiceSex(sex.nativeCode)" :nativeCode="sex.nativeCode">
                     {{sex.name}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import {getSexId} from 'common/js/iscardID-util.js'
    import {mapMutations} from 'vuex'
    export default {
        props: {
            client: {
                type: Object,
                default: {}
            },
            sexArray: {
                type: Array,
                default: function () {
                    return []
                }
            },
            defaultSexId: {
                type: String,
                default: ''
            },
            sexEditable: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                sexVal: '',
                nativeCode: '',
                hideSex: false
            }
        },
        created () {
            this.setDefaultSexValue()
        },
        updated () {
            if (!this.sexEditable) {
                this.setDefaultSexValue()
            }
        },
        methods: {
            choiceSex (nativeCode) {
                this.sexVal = nativeCode
                this.SET_LIFE_POLICYINFO({
                    field1: this.client.typeField,
                    field2: 'loveTgtSex',
                    value: this.sexVal
                })
            },
            setDefaultSexValue () {
                this.sexVal = this.defaultSexId
            },
            ...mapMutations({
                SET_LIFE_POLICYINFO: 'SET_LIFE_POLICYINFO'
            })
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>