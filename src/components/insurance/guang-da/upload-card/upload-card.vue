<template>
    <div class="unLoad">
        <div v-if="!loadingShow">
            <slider-bar :defaultSelected="defaultSelected"></slider-bar>
            <div class="certificateWarp" v-for='(item, key) in cardList' :key="key">
                <div class="certificateDetail">
                    <div class="certificateTitle">
                        {{item.title}}
                    </div>
                    <div class="certificatePicWarp">
                        <div class="picLeft" v-for='(item, index) in cardList[key].imageList' :key="index">
                            <div class="picWarp" v-if="item.imgSrc !== ''">
                                <img :src="item.imgSrc" alt="" class='pic'>
                                <span class='close' @click='deleteImg(key, index)'></span>
                            </div>
                            <div class="addPicWarp" v-if="item.imgSrc === ''">
                                <div class="addPic"  @click ="upSign(index, key, item.id)"></div>
                                <input v-if="item.id !== '910' && item.id !=='920' && item.id !=='930'" type="file" class="uploadInput" multiple accept="image/*" @change ="upload($event, index, key, item.id)"/>
                            </div>
                            <div class='picTitle'>
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <upload-sign :Info="Info" @Data="_Data"></upload-sign>
        <info-footer text="下一步" @next='_next' v-if="!loadingShow"></info-footer>
        <confirm  ref="confirm" :text="confirmText"></confirm>
        <loading v-if='loadingShow'></loading>
    </div>
</template>

<script>
import sliderBar from 'base/sliderBar/sliderBar'
import {uploadImage, imageReload, trail} from 'api/long-life/guang-da/insurance.js'
import uploadSign from 'components/insurance/guang-da/upload-card/upload-sign.vue'
import {RET_OK, CODE_OK} from 'service/variable.js'
import InfoFooter from 'base/footer/footer'
import Exif from 'exif-js'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import Loading from 'base/loading/loading'
import {mapGetters, mapMutations} from 'vuex'
export default {
    mixins: [confirm],
    data () {
        return {
            Info:{
                sign:false,
                key:0,
                index:0,
                id:''
            },
            cardList: [{
                'title': '投保人有效证件',
                'imageList': [
                    {'imgSrc': '', 'name': '身份证正面', 'id': '820'},
                    {'imgSrc': '', 'name': '身份证反面', 'id': '820'}
                ]},{
                    'title': '被保人有效证件',
                    'imageList': [
                        {'imgSrc': '', 'name': '身份证正面', 'id': '821'},
                        {'imgSrc': '', 'name': '身份证反面', 'id': '821'}
                    ]
                },{
                    'title': '银行卡资料上传',
                    'imageList': [
                        {'imgSrc': '', 'name': '银行卡正面', 'id': '823'},
                        {'imgSrc': '', 'name': '银行卡反面', 'id': '823'}
                    ]
                },{
                    'title': '投保人签名照及签名',
                    'imageList': [
                        {'imgSrc': '', 'name': '投保人正面照', 'id': '843'},
                        {'imgSrc': '', 'name': '投保人签名', 'id': '910'}
                    ]
                },{
                    'title': '被保人签名照及签名',
                    'imageList': [
                        {'imgSrc': '', 'name': '被保人正面照', 'id': '844'},
                        {'imgSrc': '', 'name': '被保人签名', 'id': '920'}
                    ]
                },{
                    'title': '代理人签名照及签名',
                    'imageList': [
                        {'imgSrc': '', 'name': '代理人正面照', 'id': '845'},
                        {'imgSrc': '', 'name': '代理人签名', 'id': '930'}
                    ]
                }],
                defaultSelected: 8,
                loadingShow: false
        }
    },
    computed: {
        bnfType () {
            return this.guangdaTrail.policy.custInfo.bnfInfo.bnfType
        },
        bnfCount() {
            return this.guangdaTrail.policy.custInfo.bnfInfo.beneficiaries.bnfCount
        },
        prtNo() {
            return this.guangdaTrail.policy.policyInfo.prtNo
        },
        ...mapGetters([
            'webStatus',
            'guangdaPolicy',
            'guangdaTrail'
        ])
        },
    created () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            imageReload(this.prtNo).then(res =>{
                if (res.ret === RET_OK) {
                    if (res.data.resultCode === '1') {
                        this.cardList = res.data.result.imageInfo
                    } else {
                        if (this.bnfType !== '0') { // 法定受益人
                            for(let i = 0; i < this.bnfCount; i++) {
                                let obj = {
                                        'title': '受益人'+ (i+1) + '有效证件',
                                        'imageList': [
                                            {'imgSrc': '', 'name': '身份证正面', 'id': '822'},
                                            {'imgSrc': '', 'name': '身份证反面', 'id': '822'}
                                        ]
                                    }
                                this.cardList.push(obj) 
                            }
                        }
                    }
                }
            })
        },
        deleteImg (key, index) {
             this.cardList[key]['imageList'][index]['imgSrc'] = ''
        },
        _Data(data) {
            this.cardList[data.key]['imageList'][data.index]['imgSrc'] = data.value
        },
        upSign(index, key, id) {
            if (id === '910' || id === '920' || id === '930') {
                this.Info.sign = true
                this.Info.key = key
                this.Info.index = index
                this.Info.id = id
            }
        },
        // 图片上传
        upload (e, index, key, id) {
            let files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.picValue = files[0]
            if (this.picValue.size > 3*1024*1024) {
                this.showConfirm("文件大小不能超过3M")
                return false
            }
            this.imgPreview(this.picValue, key, index)
        },
        // 处理input拿到的图片
        imgPreview (file, key, index) {
            let self = this
            if (!file || !window.FileReader) return
            if (/^image/.test(file.type)) {
                let base64
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = async function () {
                    let canvas = document.createElement("canvas")
                    let ctx = canvas.getContext("2d")
                    let img = new Image()
                    img.src = this.result
                    // self.cardList[key]['imageList'][index]['imgSrc'] = this.result
                    img.onload = function(){
                        let width = img.width
                        let height = img.height   
                        canvas.width = width            
                        canvas.height = height
                        ctx.drawImage(img, 0, 0, width, height)   
                        base64 = canvas.toDataURL('image/jpeg', 0.3)
                        self.cardList[key]['imageList'][index]['imgSrc'] = base64
                    }
                }
            }
        },
         _next () {
             for(let i = 0; i < this.cardList.length; i++) {
                 let item = this.cardList[i].imageList
                 for(let j = 0; j < item.length; j++){
                     if (item[j].imgSrc === '') {
                        this.showConfirm("请检查图片和签名是否已上传")
                        return false
                     }
                 }
             }
             let param = {
                 'imageInfo': this.cardList,
                 'insPolicyCode': this.prtNo
             }
             this.loadingShow = true
             uploadImage(param).then(res =>{
                 if (res.ret === RET_OK) {
                     this.loadingShow = false
                     if (res.data.resultCode === '1') {
                        this.SET_LONGLIFE_GUANGDA_POLICYINFO({
                            type: 4,
                            field1: 'photo',
                            value: res.data.result
                        })
                        // console.log('获取投保数据')
                        // console.log(this.guangdaTrail)
                        this.goTrail()
                     }
                 }
             })
        },
        goTrail () {
            this.loadingShow = true
            trail(this.guangdaTrail).then(res =>{
                if (res.ret === RET_OK) {
                    this.loadingShow = false
                    // 跳转完善信息页面
                    console.log('获取代理人平台状态')
                    console.log(this.webStatus)
                    if (this.webStatus === true) { // 代理人
							this.$router.push({
								name: 'success-trial'
							})
					} else {
							this.$router.push({
								name: 'showTip'
							})
					}
                } else {
                    this.loadingShow = false
                    this.showConfirm(res.data.remarkMsg)
                    return false 
                }
            })
        },
        ...mapMutations({
            SET_LONGLIFE_GUANGDA_POLICYINFO: 'SET_LONGLIFE_GUANGDA_POLICYINFO'
		})
    },
    components: {
        InfoFooter,
        uploadSign,
        Confirm,
        Loading,
        sliderBar
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.unLoad
    padding-bottom (160/$scale)
    .certificateWarp
        .certificateDetail
            .certificateTitle
                font-size: (30/$scale)
                height: (90/$scale)
                line-height: (90/$scale)
                text-align: center
                color: $color-theme
                background: #fff
            .certificatePicWarp
                display: flex
                padding-top: (30/$scale)
                .picLeft
                    position: relative
                    &:nth-child(1)
                        margin-right: (30/$scale)
                        margin-left: (40/$scale)
                    .picWarp
                        width: (320/$scale)
                        height: (210/$scale)
                        .pic
                            width: 100%
                            height: 100%
                        .close
                            display: inline-block
                            width: (40/$scale)
                            height: (40/$scale)
                            bg-image('close')
                            background-size cover
                            position: absolute
                            right: -(20/$scale)
                            top: -(20/$scale)
                    .addPicWarp
                        width: (320/$scale)
                        height: (210/$scale)
                        display: flex
                        align-items: center
                        justify-content: center
                        position: relative
                        border: 1px solid #e6e6e6
                        .addPic
                            width: (150/$scale)
                            height: (150/$scale)
                            bg-image('add')
                            background-size cover
                        .uploadInput
                            position: absolute
                            left: 0
                            top: 0
                            width: 100%
                            height: 100%
                            opacity: 0
                    .picTitle
                        font-size: (26/$scale)
                        margin: (20/$scale) auto (24/$scale) auto
                        text-align: center
</style>