<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>生存保证金户名</p>
            <p class="placeholders">
                <input type="text" :placeholder="placeholder" class="placeholdersInput" v-model="name" @focus="clearPlaceholder" @blur='verName'/>
            </p>
        </div>
        <div :class="this.nameTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{nameTip}}</span>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
      data () {
        return {
            name: '',
            nameTip: '',
            focus: false
        }
    },
    created () {
        this.setDefalut()
    },
    computed: {
        ...mapGetters([
            'guangdaTrail'
		]),
        placeholder () {
            return this.focus ? '' : '请输入生存保证金户名'
        }
    },
    methods: {
        setDefalut () {
            this.name = this.guangdaTrail.policy.policyInfo.sAccountName
        },
        clearPlaceholder () {
            this.focus = true
        },
        verName () {
            this.nameTip = this.checkName(this.name)
            if (this.nameTip === '') {
                this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                    type: 4,
                    field1: 'policyInfo',
                    field2: 'sAccountName',
                    value: this.name
                })
            } else {
                this.name = ''
            }
        },
        checkName (name) {
            if (name === '') {
                return '请填写生存保证金户名'
            } else if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
                  return '请检查生存保证金户名是否输入正确'
            } else {
                return ''
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