<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle" ref='nameTitle'>税收居民国（地区）及纳税人识别号</p>
        </div>
        <div class="getNum">
            <input type="text" placeholder="请填写税收居民国（地区）及纳税人识别号" class="placeholdersInput" v-model="values" @blur='verValue'/>
        </div>
        <div :class="this.wrongTip !== '' ? 'errTip' : 'hide'">
            <span class="errIco"></span>
            <span class="errText">{{wrongTip}}</span>
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
            values: '',
            wrongTip: ''
        }
    },
    created () {
        this.setDefalut()
    },
    methods: {
        setDefalut () {
            this.values = this.Info.defaultTaxNum
        },
        verValue () {
            this.setChangChengBaseInfo({
                field1: this.Info.type,
                field2: 'identificationNum',
                value: this.values
            })
        },
        ...mapMutations({
			setChangChengBaseInfo: 'SET_LONGLIFE_CHANGCHENG_BASEINFO'
		})
    }
}
</script>

<style lang='stylus' scoped>
@import '~components/insurance/chang-cheng/base-info/child/stylus/common.styl'
.getNum
    height: (90/$scale)
    line-height: (90/$scale)
    font-size: (28/$scale)
</style>