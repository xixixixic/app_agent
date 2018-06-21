<template>
    <div class="detail">
        <div class="info">
            <p class="desTitle">性别</p>
            <p class="placeholders">
                <button :class="isStatusA === true ? 'sex' : 'redSex'" @click='choiceMen'>女</button>
                <button :class="isStatusB === true ? 'sex' : 'redSex'" @click='choiceWomen'>男</button>
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
        },
        client: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters([
			'changChengBaseInfo'
        ]),
        isStatusA () { // 女
            if (this.client.types === 'sgbenificiary') {
                if (this.changChengBaseInfo.sgbenificiary[this.client.num].sex === '0') {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.changChengBaseInfo.scbenificiary[this.client.num].sex === '0') {
                    return true
                } else {
                    return false
                }
            }
        },
        isStatusB () { // 男
            if (this.client.types === 'sgbenificiary') {
                if (this.changChengBaseInfo.sgbenificiary[this.client.num].sex === '1') {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.changChengBaseInfo.scbenificiary[this.client.num].sex === '1') {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    data () {
        return {
            // isStatusA: true,
            // isStatusB: false
        }
    },
    created () {
        // this.setDefalut()
    },
    methods: {
        setDefalut () {
            if (this.client.types === 'sgbenificiary') {
                if (this.changChengBaseInfo.sgbenificiary[this.client.num].sex === '1') {
                    this.isStatusA = true
                    this.isStatusB = false
                } else if (this.changChengBaseInfo.sgbenificiary[this.client.num].sex === '0') {
                    this.isStatusA = false
                    this.isStatusB = true
                }
            } else {
                if (this.changChengBaseInfo.scbenificiary[this.client.num].sex === '1') {
                    this.isStatusA = true
                    this.isStatusB = false
                } else if (this.changChengBaseInfo.scbenificiary[this.client.num].sex === '0') {
                    this.isStatusA = false
                    this.isStatusB = true
                }
            }
        },
        choiceMen () {  // 女
            // this.isStatusA = true
            // this.isStatusB = false
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'sex',
				value: '1'
			})
        },
        choiceWomen () { // 男
            // this.isStatusA = false
            // this.isStatusB = true
            this.setChangChengBaseInfo({
				field1: this.client.typeField,
				field2: 'sex',
				value: '0'
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
</style>