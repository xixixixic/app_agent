<template>
    <div class="popbox">
        <ul class="popup">
            <li><div>序号</div><div>{{clientNum}}</div></li>
            <li><div>说明对象</div><div>{{clientName}}</div></li>
            <li v-for="(item, index) in List" :key="index"><div :class="{'list':showflag}">{{item.qus}}</div><input :placeholder="item.placeholder+item.unit" v-if="!showflag"  @blur="regInfo(index)" :type="item.unit === ''? 'text':'number'" ref ="input"></li>
            <li><div @click="cancel" class="cancel">{{btncancel}}</div><div @click="sure2" class="sure">{{btnsure}}</div></li>
        </ul>
        <confirm ref="confirm" :text="confirmText"></confirm>
    </div>
</template>
<script>
import Confirm from 'base/confirm/confirm'
import {mapMutations, mapGetters} from 'vuex'
    export default {
        props: {
            queList: {
                type: Object,
                default: {}
            },
            data: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                focus: false,
                content: [],
                confirmText: null,
                btnsure: '确定',
                btncancel: '取消',
                List: [],
                showflag: false
            }
        },
        created () {
            if (this.listflag) {
                this.btnsure = '是'
                this.btncancel = '否'
                this.List = this.queList.ListAdd
                this.showflag = true
            } else {
                this.List = this.queList.List
                this.showflag = false
            }
        },
        computed: {
            ...mapGetters(['changChengBaseInfo']),
            clientNum () {
                return this.queList.num
            },
            clientName () {
                return this.queList.clientType === 1 ? '被保人' : '投保人'  // 1 投保人 2 被保人
            },
            listflag () {
                return this.queList.Listflag
            },
            relationShip () {
                return this.changChengBaseInfo.insured.relaToAppntCode
            },
            type () {
                return this.relationShip === '00'? 3 : this.queList.clientType
            }
        },
        methods: {
            cancel () {
              if (this.showflag) {
                   this.List = this.queList.ListMore
                   this.btnsure = '确定'
                   this.btncancel = '取消'
                   this.showflag = false
               } else {
                   let param = {
                       type: this.queList.clientType,
                       data: this.data,
                       version: this.queList.version
                   }
                   this.$emit('hidepopup', param)
               }
            },
            sure () {
                for (let i = 0; i < this.List.length; i++) {
                    if (this.List[i].unit !== '') {
                        let newContent = this.content[i] + this.List[i].unit
                        this.content[i] = newContent
                    }
                }
               if (this.showflag) {
                   this.List = this.queList.List
                   this.btnsure = '确定'
                   this.btncancel = '取消'
                   this.showflag = false
               } else {
                   let qulen = this.List.length
                   let anlen = this.content.length
                   if (qulen !== anlen) {
                        this.confirmText = '请检查填写项是否完整'
                        this.$refs.confirm.show()
                    } else {
                        let content
                        if (this.queList.code === 'P402' || this.queList.code === 'P403') {
                            content = this.content.join(',')
                            if (this.content.length === 2) {
                                content += ',N,N'
                            }
                        } else if (this.queList.code === 'P424') {
                            content = this.content.join(',')
                            if (this.content.length === 4) {
                                content += ',N'
                            }
                        } else if (this.queList.code === 'P506') {
                            content = this.content.join(',')

                        } else {
                            content = this.content.join('').trim()
                        }
                        let param = {
                            type: this.type,
                            value: {
                               remark: content,
                               content: this.queList.remark,
                               code: this.queList.code,
                               version: this.queList.version
                            }
                        }
                       this.DELETE_HEALTH_POLICY(param)
                       this.SET_HEALTH_POLICY(param)
                       this.$emit('hidepopup')
                    }
               }
            },
            sure2 () {
                if (this.showflag) {
                   this.List = this.queList.List
                   this.btnsure = '确定'
                   this.btncancel = '取消'
                   this.showflag = false
                } else {
                    let qulen = this.List.length
                    let anlen = this.content.length
                    if(qulen !== anlen){
                        this.confirmText = '请检查填写项是否完整'
                        this.$refs.confirm.show()
                        return false
                    } 
                    for (let i = 0; i < this.List.length; i++) {
                        if (this.List[i].unit !== '') {
                            let newContent = this.content[i] + this.List[i].unit
                            this.content[i] = newContent
                        }
                    }
                    let content
                    if (this.queList.code === 'P402' || this.queList.code === 'P403') {
                        content = this.content.join(',')
                        if (this.content.length === 2) {
                            content += ',N,N'
                        }
                    } else if (this.queList.code === 'P424') {
                        content = this.content.join(',')
                        if (this.content.length === 4) {
                            content += ',N'
                        }
                    } else if (this.queList.code === 'P506') {
                        content = this.content.join(',')

                    } else {
                        content = this.content.join('').trim()
                    }
                    let param = {
                        type: this.type,
                        value: {
                            remark: content,
                            content: this.queList.remark,
                            code: this.queList.code,
                            version: this.queList.version
                        }
                    }
                    this.DELETE_HEALTH_POLICY(param)
                    this.SET_HEALTH_POLICY(param)
                    this.$emit('hidepopup')
                }
            },
            regInfo (index) {
                if (this.$refs.input[index].value !== '') {
                    this.content[index] = this.$refs.input[index].value
                }
            },
             ...mapMutations({
                SET_HEALTH_POLICY: 'SET_HEALTH_POLICY',
                DELETE_HEALTH_POLICY: 'DELETE_HEALTH_POLICY'

            })
        },
        components: {
            Confirm
        }
    }
</script>
<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .popbox
        height 100%
        width 104%
        position fixed
        top 0
        left (-20/$scale)
        background-color rgba( 0, 0, 0, 0.5)
        font-size (30/$scale)
        color #444
        .popup
            width (712/$scale)
            height autuo
            border-radius (10/$scale)
            background-color #fff
            position: relative;
            left: 50.6%;
            top: 50%;
            transform:  translate(-50%,-50%);
            li
              height (100/$scale)
              line-height (100/$scale)
              border-bottom (2/$scale) solid #ddd
              padding 0 (20/$scale)
              div,input
                width 48%
                padding 0 1%
                display inline-block
              div:last-child
                text-align right
              .list
                width 100%
                text-align center !important
              input
                height (100/$scale)
                line-height (100/$scale)
                text-align right
              .sure,.cancel
                height (70/$scale)
                line-height (70/$scale)
                text-align center !important
                color #fff
                width (200/$scale)
                background-color #86C9FF
                border-radius (60/$scale)
              .sure
                background-color #0E95FE
                margin-left (240/$scale)     
</style>