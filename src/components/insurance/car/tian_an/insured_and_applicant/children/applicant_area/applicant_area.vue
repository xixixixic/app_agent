<template>
	<div class="detail">
		<div class="info">
			<p class="desTitle">地址</p>
			<p class="placeholders">
				 <a id="address" class="text" :class="{'active': value !== '请填写地址'}"> {{value}}</a>			 
			</p>
			<div id="applicantArea"></div>
		</div>
	</div>
</template>

<script>
import {linkage} from 'common/js/linkage-util.js'
import {mapMutations, mapGetters} from 'vuex'
import API from 'service/config.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
export default {
    data () {
        return {
           value: '',
           pcArray: []
        }
    },
    computed: {
         ...mapGetters([
             'carPolicy'
            ])
    },
    created () {
        this.value = this.carPolicy.applicant.address
        this.getResidence()
    },
    mounted () {
        this.choiceResidence()
    },
    methods: {
       ...mapMutations({
           setApplicantAddress: 'SET_CAR_POLICY'
       }),
       getResidence () {
                this.axios.get(API.selectArea, {}).then(response => {
                    response = response.data
                    console.log(response)
                    console.log('gghh')
                    if (response.ret === RET_OK) {
                        if (response.data.code === CODE_OK) {
                            this.pcArray = response.data.pcs
                            this.choiceResidence()
                        }
                    }
                })
            },
       choiceResidence () {
            let vm = this
                linkage('address', 'applicantArea', vm.pcArray, function (arr) {
                    let str = ''
                    for (let obj of arr) {
                        str += obj.value + ' '
                    }
                    vm.residence = str
                    vm.setRequirementEvaluation({
                        field: 'residence',
                        value: arr
                    })
                })
       }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
	.info
		font-size: (28/$scale)
		line-height: (100/$scale)
		position: relative
		.desTitle
			color: #444
		.placeholders
			color: #BBB
			position:absolute
			right: 0
			.text
				color: #bbb
				&.active
					color $color-main
</style>