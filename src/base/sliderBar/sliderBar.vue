<template>
    <div class='barWarp'>
        <div class="headerBar">
            <div class="barDetail" v-for='(item, index) in selectArray' :class="{'active' : index < defaultSelected}">
                <div class="pic">
                    <span class='circle' :class="{'active' : index < defaultSelected}"></span>
                    <span class='line' :class="{'active' : index < defaultSelected}"></span>
                </div>
                <div class="barWord" :class="{'active' : index < defaultSelected}">
                    {{item.text}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        props: {
          defaultSelected: {
                type: Number,
                default: 4
            }
        },
        data () {
            return {
               selectArray: [{
                       text: '基本信息'
                   }, {
                       text: '选择主附险'
                   }, {
                       text: '完善信息'
                   }, {
                       text: '告知项'
                   }, {
                       text: '投保须知'
                   }, {
                       text: '银行卡信息'
                   }, {
                       text: '证件上传'
                   },{
                       text: '影像件上传'
                   }, {
                       text: '确认信息'
                   }, {
                       text: '支付提示'
                   }
               ]
            }
        },
        created () {
            this.setDefault()
        },
        computed: {
            ...mapGetters(['guangdaPolicy']),
            productId () {
                return this.guangdaPolicy.productId
            }
        },
        methods: {
            setDefault () { 
                if (this.productId !== '') {
                    this.selectArray[7].text = '签字确认'
                    this.selectArray.splice(8,1)
                }
            }
        }
    }
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.barWarp
	width: (750/$scale)
	height: (140/$scale)
	overflow-x: scroll
	background: #fff
	.headerBar
		width: (1500/$scale)
		display: flex
		.barDetail
			position: relative
			width: (300/$scale)
			&:last-child
				color: red
				.pic
					.line
						display: none
			&.active
				color: $color-theme
			.pic
				height: (86/$scale)
				.circle
					width: (34/$scale)
					height: (34/$scale)
					display: inline-block
					background: #ccc
					border-radius: 50%
					position: absolute
					left: (54/$scale)
					top: (30/$scale)
					&.active
						background: $color-theme
				.line
					display: inline-block
					width: (140/$scale)
					height: (2/$scale)
					background: #ccc
					position: absolute
					left: (88/$scale)
					top: (47/$scale)
					&.active
						background: $color-theme
			.barWord
				font-size: (26/$scale)
				color: #ccc
				position: absolute
				left: (20/$scale)
				&.active
					color: $color-theme
</style>