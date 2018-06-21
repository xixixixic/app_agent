<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>国籍</p>
            <p class="placeholders" @click="showSelectdrop()" :class="{'active': text === '请选择国籍'}">
                {{text}}<i class="icon-down_arrow ico"></i>
            </p>
        </div>
        <select-drop :selectArray="nationArray" :selectTitle="selectTitle"  v-show="showSelectdropWrap" 
        @sureSelectDrop="sureSelectDrop" @hideSelectDrop="hideSelectDrop" :default-value="this.selected"></select-drop>
    </div>
</template>

<script>
import SelectDrop from 'base/select-drops/select-drops'
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
            selectTitle: '选择国籍',
            showSelectdropWrap: false,
            selected: 'BHR'
        }
    },
    computed: {
        nationArray () {
            return this.guangdaPolicy.DicList.nativePlace
        },
        text () {
            for (let obj of this.nationArray) {
                if (obj.id === this.selected) {
                    return obj.value
                }
            }
            return '请选择国籍'
        },
        ...mapGetters([
			'guangdaPolicy'
		])
    },
    created () {
        this.setDefault()
    },
     methods: {
        setDefault () {
            this.selected = this.Info.defaultNation
        },
        showSelectdrop () {
            this.showSelectdropWrap = true
		},
		sureSelectDrop (data) {
            this.selected = data.id
            this.showSelectdropWrap = false
             if (this.Info.type === 'appnt') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'nativePlace',
                        value: data.id
                    })
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'appntTaxInfo',
                        field3:'birthCountry',
                        value: data.id
                    })
                    let tax = {
                        'taxInfo': [{
                                'reasonCheck': '',
                                'reasonMessage': '',
                                'taxArea': data.id,
                                'tin': this.Info.defaluttin 
                            }]
                    }
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'appntTaxInfo',
                        field3:'taxInfoList',
                        value: tax
                    })
                } else if (this.Info.type === 'insurants') {
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'nativePlace',
                        value: data.id
                    })
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'insurantTaxInfo',
                        field4: 'birthCountry',
                        value: data.id
                    })
                    let tax = {
                        'taxInfo': [{
                                'reasonCheck': '',
                                'reasonMessage': '',
                                'taxArea': data.id,
                                'tin': this.Info.defaluttin
                            }]
                    }
                    this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: this.Info.type,
                        field2: 'insurant#0',
                        field3: 'insurantTaxInfo',
                        field4: 'taxInfoList',
                        value: tax
                    })
                }
		},
		hideSelectDrop () {
			this.showSelectdropWrap = false
        },
        ...mapMutations({
			SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        SelectDrop
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>