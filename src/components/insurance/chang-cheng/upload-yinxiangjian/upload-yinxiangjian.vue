<template>
    <div class="unLoad">
        <div v-if='!loadingShow'>
            <slider-bar :defaultSelected='defaultSelected'></slider-bar>
            <split></split>
            <div class="certificateWarp" v-for='(item, key, index) in card' :key="item.num">
                <div class="certificateDetail">
                    <div class="certificateTitle">
                        {{item.title}}
                    </div>
                    <div class="certificatePicWarp">
                        <div class="picLeft" v-for='(item, index) in card[key].imgList'>
                            <div class="picWarp" v-if="item.imgSrc !== ''">
                                <img :src="item.imgSrc" alt="" class='pic'>
                                <span class='close' @click='deleteA(key, index)'></span>
                            </div>
                            <div class="addPicWarp" v-if="item.imgSrc === ''">
                                <div class="addPic">
                                </div>
                                <input type="file" class="uploadInput" accept="image/*" @change='upload($event, index, key)'/>
                            </div>
                            <div class='picTitle'>
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<loading v-if='loadingShow'></loading>
        <info-footer text="下一步" @next='_next' v-if='!loadingShow'></info-footer>
        <confirm  ref="confirm" :text="confirmText"></confirm>
    </div>
</template>

<script>
import Split from 'base/split/split'
import sliderBar from 'base/sliderBar/sliderBar'
import {unloadYingXiangJian} from 'api/long-life/chang-cheng/insurance.js'
import {RET_OK, CODE_OK} from 'service/variable.js'
import InfoFooter from 'base/footer/footer'
import Exif from 'exif-js'
import {mapGetters, mapMutations} from 'vuex'
import Confirm from 'base/confirm/confirm'
import {confirm} from 'common/js/mixin.js'
import Loading from 'base/loading/loading'
export default {
    mixins: [confirm],
    data () {
        return {
            card: [
                {
                    title: '电投申请',
                    imgList: [
                        {'imgSrc': '', 'name': '电投申请正面'},
                        {'imgSrc': '', 'name': '电投申请反面'}
                    ],
                    num: 0
                },
                {
                    title: '电投辅助表',
                    imgList: [
                        {'imgSrc': '', 'name': '电投辅助表正面'}
                    ],
                    num: 1
                },
                {
                    title: '投保提示书',
                    imgList: [
                        {'imgSrc': '', 'name': '投保提示书正面'}
                    ],
                    num: 2
                },
                {
                    title: '签单影像件',
                    imgList: [
                        {'imgSrc': '', 'name': '签单影像件正面'},
                        {'imgSrc': '', 'name': '签单影像件反面'}
                    ],
                    num: 3
                }
            ],
            inita: 0,
            arr: [],
            confirmText: '',
            loadingShow: false
        }
    },
    computed: {
        defaultSelected () {
			return 8
		},
            ...mapGetters([
                'changChengCertificePic'
            ])
        },
    created () {
        this.setDefault()
    },
    methods: {
        setDefault () {
            this.setChangChengCertificate({
				field1: 'returnFlag',
				value: true
            })
            console.log('影像件')
            let flag = this.changChengCertificePic.returnYingFlag
            if (flag === true) {
                let imgInfo = this.changChengCertificePic.yxjPath
                for (let i = 0; i < imgInfo.length; i++) {
                    if (imgInfo[i].flag === '1-1') {
                        this.card[0].imgList[0].imgSrc = imgInfo[i].path
                    }
                    if (imgInfo[i].flag === '1-2') {
                        this.card[0].imgList[1].imgSrc = imgInfo[i].path
                    }
                    if (imgInfo[i].flag === '1-3') {
                        this.card[1].imgList[0].imgSrc = imgInfo[i].path
                    }
                    if (imgInfo[i].flag === '2-1') {
                        this.card[2].imgList[0].imgSrc = imgInfo[i].path
                    }
                    if (imgInfo[i].flag === '3-1') {
                        this.card[3].imgList[1].imgSrc = imgInfo[i].path
                    }
                    if (imgInfo[i].flag === '3-2') {
                        this.card[3].imgList[0].imgSrc = imgInfo[i].path
                    }
                }
            }
        },
        deleteA (key, index) {
            console.log(key)
            console.log(index)
            this.card[key].imgList[index].imgSrc = ''
        },
        // 删除头像
        deleteImg () {
            this.imgUrl = ''
            this.picShow = false
            this.addBtn = true
        },
        // 头像上传
        upload (e, index, key) {
            this.card[key].imgList[index].imgSrc = './static/image/loading@2x.gif'
            this.file = e.target.files[0];		
			// 看支持不支持FileReader
            if (!this.file || !window.FileReader)
                return false
			if (this.file.size > 4*1024*1024) {
                this.showConfirm("文件大小不能超过4M")
                this.card[key].imgList[index].imgSrc = ''
                return false
            }
            this.imgPreview(this.file, key, index)
        },
        imgPreview (file, key, index) {
            let that = this
             if (/^image/.test(file.type)) {
                 let base64
                 let reader = new FileReader()
                 reader.readAsDataURL(file)
                 reader.onloadend = function () { 
                    let canvas = document.createElement("canvas")
                    let ctx = canvas.getContext("2d")
                    let img = new Image()
                    img.src = this.result
                    let nuu
                    img.onload = function(){
                        let width = img.width
                        let height = img.height   
                        canvas.width = width            
                        canvas.height = height
                        ctx.drawImage(img, 0, 0, width, height)   
                        base64 = canvas.toDataURL('image/jpeg', 0.3)
                        if (key === 0) {
                            nuu =  (key + 1) + '-' + (index + 1)
                        } else if (key === 1) {
                            nuu =  key + '-' + (index + 3)
                        } else if (key === 2) {
                            nuu =  key + '-' + (index + 1)
                        } else if (key === 3) {
                            nuu =  key + '-' + (index + 1)
                        }
                        that.arr.push({'card': base64, 'flag': nuu})
                        that.card[key].imgList[index].imgSrc = base64
                    }
                }
             }else{
                 this.showConfirm("请选择图片")
             }
        },
         _next () {
             if (this.card[0].imgList[0].imgSrc === '') {
				this.showConfirm('请上传电投申请正面有效照片')
			} else if (this.card[0].imgList[1].imgSrc === '') {
				this.showConfirm('请上传电投申请反面有效照片')
			} else if (this.card[1].imgList[0].imgSrc === '') {
				this.showConfirm('请上传电投辅助表正面有效照片')
			} else if (this.card[2].imgList[0].imgSrc === '') {
				this.showConfirm('请上传投保提示书正面有效照片')
			} else if (this.card[3].imgList[0].imgSrc === '') {
				this.showConfirm('请上传签单影像件正面有效照片')
			} else if (this.card[3].imgList[1].imgSrc === '') {
				this.showConfirm('请上传签单影像件反面有效照片')
			} else {
                let flag = this.changChengCertificePic.returnYingFlag
                let cardArr = []
                    if (flag === true) {
                        this.loadingShow = true
                        cardArr.push({'card': this.card[0].imgList[0].imgSrc, 'flag': '1-1'})
                        cardArr.push({'card': this.card[0].imgList[1].imgSrc, 'flag': '1-2'})
                        cardArr.push({'card': this.card[1].imgList[0].imgSrc, 'flag': '1-3'})
                        cardArr.push({'card': this.card[2].imgList[0].imgSrc, 'flag': '2-1'})
                        cardArr.push({'card': this.card[3].imgList[0].imgSrc, 'flag': '3-1'})
                        cardArr.push({'card': this.card[3].imgList[1].imgSrc, 'flag': '3-2'})
                        let params = {
                            sendFlag : '1',
                            fsImgInfo: cardArr
                        }
                        unloadYingXiangJian(params).then(res => {
                            if (res.ret === RET_OK) {
                                if (res.data.code === CODE_OK) {
                                    this.loadingShow = false
                                    this.setChangChengCertificate({
                                        field1: 'yxjPath',
                                        value: res.data.fsImgInfo
                                    })
                                    this.$router.push({
                                        name: 'review-all-info'
                                    })
                                } else {
                                    this.loadingShow = false
                                    this.showConfirm(res.data.remarkMsg)
                                }
                            }
                        })
                    } else {
                        this.loadingShow = true
                        let params = {
                            sendFlag : '0',
                            fsImgInfo: this.arr
                        }
                        unloadYingXiangJian(params).then(res => {
                            if (res.ret === RET_OK) {
                                if (res.data.code === CODE_OK) {
                                    this.loadingShow = false
                                    this.setChangChengCertificate({
                                        field1: 'yxjPath',
                                        value: res.data.fsImgInfo
                                    })
                                    this.$router.push({
                                        name: 'review-all-info'
                                    })
                                } else {
                                    this.loadingShow = false
                                    this.showConfirm(res.data.remarkMsg)
                                }
                            }
                        })
                    }
            }
		},
        ...mapMutations({
            setChangChengCertificate: 'SET_LONGLIFE_CHANGCHENG_CERTIFICATEPIC'
        })
    },
    components: {
        InfoFooter,
        Confirm,
        Loading,
        Split,
		sliderBar
    }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.unLoad
    margin-bottom: (100/$scale)
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