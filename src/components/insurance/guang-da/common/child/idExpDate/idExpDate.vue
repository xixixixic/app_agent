<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">证件有效期</p>
            <p class="placeholders">
                <span class="choice" :id="'expDate' + Info.type" :class="{'active': birth === '请选择证件有效期'}">{{birth}}</span>		 
            </p>
        </div>
        <div :id="'expDateContainer' + Info.type"></div>
    </div>
</template>

<script>
import {calendar} from 'common/js/calendar-utils.js'
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
    },
    data () {
        return {
            birth: '请选择证件有效期',
            edit: true
        }
    },
    created () {
        this.setDefalut()
    },
    mounted () {
        this.expDateCalendar()
    },
    methods: {
        setDefalut () {
            this.birth = this.Info.defaultIdExpDate
        },
        expDateCalendar () {
            let vm = this
            calendar('expDate' + vm.Info.type, 'expDateContainer' + this.Info.type, function (arr1, arr2) {
                    vm.birth = arr2.join('-')
                if (vm.Info.type === 'appnt') {
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'idExpDate',
                        value: arr2.join('-')
                    })
                } else if (vm.Info.type === 'insurants') {
                    vm.SET_LONGLIFE_GUANGDA_POLICYINFO({
                        type: 4,
                        field1: vm.Info.type,
                        field2: 'insurant#0',
                        field3: 'idExpDate',
                        value: arr2.join('-')
                    })
                }
			})   
		},
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO:'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/guang-da/common/child/stylus/common.styl'
</style>