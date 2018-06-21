<template>
	<div v-if='Info.sign' class="sign-box">
		<div class="sign-title"><i @click="close" class="icon-left_arrow ico"></i>客户签名<span class="sign-subtitle">(请横屏签字)</span></div>
		<vueSignature ref="signature" :sigOption="option" :h="'556px'"></vueSignature> 
		<div class="clear"  @click="clear">清除</div>
		<div class="save" @click="save">确认</div>
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
	data() {
		return {
			option:{
				penColor:"rgb(0, 0, 0)",
				backgroundColor:"rgb(255,255,255)",
				width: '400px'
			},
			sign: true
		};
	},
	methods:{
		save(){
			var _this = this;
			var png = _this.$refs.signature.save()
			this.$emit('Data',{
				key: this.Info.key,
				index: this.Info.index,
				value: png
			})
			this.Info.sign = false
		},
		clear(){
			var _this = this;
			_this.$refs.signature.clear();
		},
		close() {
			this.Info.sign = false
		},
		fromDataURL(url){
			var _this = this;
			_this.$refs.signature.fromDataURL("data:image/png;base64,iVBORw0K...");
		}
	}
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.sign-box
	position fixed
	z-index  999
	top (0/$scale)
	font-size (34/$scale)
	overflow-y scroll
	.sign-title
		height (100/$scale)
		width 100%
		background-color #fff
		line-height (100/$scale)
		text-align center
		color #333
		>i 
			float left
			line-height (100/$scale)
			width (60/$scale)
		.sign-subtitle
			color #999
	div
		width 50%
		float left
		border none
		height (98/$scale)
		line-height (98/$scale)
		text-align center
		font-size (34/$scale)
	.save
		background-color #3A8AEE
		color #fff
	.clear
		background-color #fff
		color #3A8AEE

</style>