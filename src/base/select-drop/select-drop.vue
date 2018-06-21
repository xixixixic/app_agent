<template>
    <div>
        <div class="selectDrop">
            <div class="title">
                <div class="cancel-btn" @click="cancel">取消</div>
                <div class="text">{{selectTitle}}</div>
                <div class="sure-btn" @click="sure">确定</div>
            </div>
            <div class="content">
                <div class="item" :class="{'active': selected === item.nativeCode}" v-for="item in selectArray" 
                :nativeCode="item.nativeCode" @click="selectedText(item)">
                    {{item.name}}
                </div>
            </div>
        </div>
        <select-mask></select-mask>
    </div>
</template>
<script>
    import Mask from 'base/mask/mask'
    export default {
        props: {
            selectArray: {
                type: Array,
                default: []
            },
            selectTitle: {
                type: String,
                default: ''
            },
            defaultValue: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                selected: '',
                obj: {}
            }
        },
        created () {
            // console.log('获取下拉默认选择')
            // console.log(this.selectArray)
            // console.log(this.selectTitle)
            // console.log(this.defaultValue)
            this.setDefaultNativeCode()
        },
        computed: {
        },
        methods: {
            selectedText (item) {
                this.obj = {
                    'name': item.name,
                    'nativeCode': item.nativeCode
                }
                this.selected = item.nativeCode
            },
            sure () {
                if (!this.obj.name || !this.obj.nativeCode) {
                    this.obj = {
                        'name': this.selectArray[0].name,
                        'nativeCode': this.selectArray[0].nativeCode
                    }
                }
                this.$emit('sureSelectDrop', this.obj)
            },
            cancel () {
                this.$emit('hideSelectDrop')
            },
            setDefaultNativeCode () {
                this.selected = this.defaultValue
            }
        },
        components: {
            'select-mask': Mask
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .selectDrop
        position: fixed
        left: 0
        bottom: 0
        z-index: 10
        width: 100%
        background-color: #ffffff
        .title
            position: absolute
            left: 0
            top: 0
            display: flex
            width: 100%
            height: (100/$scale)
            line-height: (100/$scale)
            font-size: (30/$scale)
            border-bottom: (2/$scale) solid #e6e6e6
            .cancel-btn, .sure-btn
                flex: 0 0 (100/$scale)
                width: (100/$scale)
                text-align: center
            .text
                flex: 1
                text-align: center
                color: #666666
        .content
            margin-top: (100/$scale)
            max-height: (462/$scale)
            overflow: auto
            -webkit-overflow-scrolling: touch
            .item
                width: 100%
                height: (80/$scale)
                line-height: @height
                text-align: center
                font-size: (28/$scale)
                &.active
                    color: $color-theme
</style>