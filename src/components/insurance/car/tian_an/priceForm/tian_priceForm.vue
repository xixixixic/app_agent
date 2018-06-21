<template>
	<div class="priceForm">
		<div class="content">
			<div class="insurance">
				<div class="insuranceTitle">
					<a href="" class="insuranceTitleA">险种</a>
					<a href="" class="insuranceTitleA">保额(元)</a>
					<a href="" class="insuranceTitleA">保费(元)</a>
				</div>
				<div class="insuranceDetailWarp">
					<div class="insuranceDetail" v-for='item in list'>
						<a href="" class="insuranceDetailA">{{item.kindName}}</a>
						<a href="" class="insuranceDetailA">{{item.amount}}</a>
						<a href="" class="insuranceDetailA">{{item.benchMarkPremium}}</a>
					</div>
				</div>
				<div class="insuranceTitle">
					<a href="" class="insuranceTitleA">折扣前总保费(元)</a>
					<a href="" class="insuranceTitleA">总保费(元)</a>
					<a href="" class="insuranceTitleA">总折扣</a>
				</div>
				<div class="insuranceDetailWarp">
					<div class="insuranceDetail">
						<a href="" class="insuranceDetailA">{{zheqianPrice}}</a>
						<a href="" class="insuranceDetailA">{{totalPrice}}</a>
						<a href="" class="insuranceDetailA">{{discount}}%</a>
					</div>
				</div>
				<div class="insuranceTitle">
					<a href="" class="insuranceTitleA">商业险(元)</a>
					<a href="" class="insuranceTitleA">交强险(元)</a>
					<a href="" class="insuranceTitleA">车船税(元)</a>
				</div>
				<div class="insuranceDetailWarp">
					<div class="insuranceDetail">
						<a href="" class="insuranceDetailA">{{shangyePrice}}</a>
						<a href="" class="insuranceDetailA">{{jiaoqiangPrice}}</a>
						<a href="" class="insuranceDetailA">{{chechuanPrice}}</a>
					</div>
				</div>
			</div>
		</div>
		<info-footer text="下一步" @next='next'></info-footer>
	</div>
</template>

<script>
	import Split from 'base/split/split'
	import InfoFooter from 'base/footer/footer'
	import {mapGetters, mapMutations} from 'vuex'
	export default {
        data () {
            return {
                zheqianPrice: '',
                totalPrice: '',
                discount: '70%',
                shangyePrice: '',
                jiaoqiangPrice: '',
                chechuanPrice: '',
                list: [
                   {'kindName': '车辆损失险', 'amount': '50000', 'benchMarkPremium': '1000'}
                ]
            }
        },
        computed: {
           ...mapGetters([
               'ducarPolicy', 'carPolicy', 'ducarOrder'
          ])
        },
        created () {
this.defaultValue()
// console.log('7755')
// console.log(this.ducarOrder)
        },
        methods: {
            ...mapMutations({
               setOrderPass: 'SET_CAR_CARORDERPASS'
            }),
            defaultValue () {
                this.zheqianPrice = this.ducarPolicy.sumBenchMarkPremium
                this.discount = (this.ducarPolicy.disCount) * 100
                this.shangyePrice = this.ducarPolicy.sumPremium
                this.list = this.ducarPolicy.riskKinds
                this.totalPrice = this.shangyePrice + this.jiaoqiangPrice + this.chechuanPrice
            },
            next () {
//              let data = this.carPolicy
//               this.axios.post(API.duCarOrder, data).then(response => {
//                  console.log(response)
//                  response = response.data
//                  if (response.ret === RET_OK) {
//                      if (response.data.code === CODE_OK) {
//                          this.setOrderPass({
//                              field1: 'carPolicyId',
//                              value: response.data.carPolicyId
//                          })
//                          this.setOrderPass({
//                              field1: 'proposalNoCi',
//                              value: response.data.proposalNoCi
//                          })
//                          this.setOrderPass({
//                              field1: 'proposalNoBi',
//                              value: response.data.proposalNoBi
//                          })
                            this.$router.push({
                                name: 'tian_recipient'
                            })
//                      }
//                  }
//               })
            }
        },
        components: {
            Split,
            InfoFooter
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    @import '~common/stylus/mixin.styl'
    .priceForm
    	.content
    		padding: 0 (30/$scale)
    		font-size: (30/$scale)
    		.insurance
    			.insuranceTitle
    				background: #FFEFEF
    				height: (100/$scale)
    				line-height: (100/$scale)
    				margin: 0 (-30/$scale)
    				padding: 0 (30/$scale)
    				.insuranceTitleA
    					float: left
    					display: inline-block
    					height: 100%
    					&:nth-child(1)
    						width: (265/$scale)
    					&:nth-child(2)
    						width: (285/$scale)
    			.insuranceDetailWarp
	    			.insuranceDetail
	    				height: (100/$scale)
	    				line-height: (100/$scale)
	    				overflow: hidden
	    				font-size: (28/$scale)
	    				.insuranceDetailA
	    					float: left
	    					display: inline-block
	    					height: 100%
	    					&:nth-child(1)
	    						width: (265/$scale)
	    					&:nth-child(2)
	    						width: (285/$scale)
</style>