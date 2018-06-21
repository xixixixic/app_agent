<template>
    <div class="FeiJuMinInsured" v-show='showStatus'>
        <name :Info='Info'></name>
        <ming :Info='Info'></ming>
        <birthday :Info='Info'></birthday>
        <now-address :Info='Info'></now-address>
        <born-address :Info='Info'></born-address>
        <tax-num :Info='Info'></tax-num>
        <why-no-tax-num :Info='Info'></why-no-tax-num>
        <sign-identy :Info='Info'></sign-identy>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Name from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/name.vue'
import Ming from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/ming.vue'
import Birthday from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/birthday.vue'
import NowAddress from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/now-address.vue'
import BornAddress from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/born-address.vue'
import TaxNum from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/tax-num.vue'
import WhyNoTaxNum from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/why-no-tax-num.vue'
import SignIdenty from 'components/insurance/chang-cheng/perfect-info/child/fei-ju-min-content/sign-identy.vue'
export default {
    computed: {
		Info () {
			return {
                type: 'InsuredTaxBaseInfo',
                typeApp: 'insured',
                defaultName: this.changChengBaseInfo.InsuredTaxBaseInfo.lName,
                defaultMing: this.changChengBaseInfo.InsuredTaxBaseInfo.tName,
                defaultBirthday: this.changChengBaseInfo.InsuredTaxBaseInfo.birthDate,
                defaultNowAddressProvince: this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressProvince, // 现居地址省
                defaultNowAddressCity: this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressCity, // 现居地址市
                defaultNowAddressCounty: this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressCounty, // 现居地址县
                defaultNowAddressStreet: this.changChengBaseInfo.InsuredTaxBaseInfo.inAddressStreet, // 现居地址街道
                defaultBornAddressProvince: this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressProvince, // 出生地址省
                defaultBornAddressCity: this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressCity, // 出生地址市
                defaultBornAddressCounty: this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressCounty, // 出生地址县
                defaultBornAddressStreet: this.changChengBaseInfo.InsuredTaxBaseInfo.bornAddressStreet, // 出生地街道
                defaultTaxNum: this.changChengBaseInfo.InsuredTaxBaseInfo.identificationNum, // 税收居民国（地区）及纳税人识别号
                defaultWhyNoTaxNum: this.changChengBaseInfo.InsuredTaxBaseInfo.reason, // 不能提供居民国（地区）纳税人识别号原因
                defaultSignIdenty: this.changChengBaseInfo.InsuredTaxBaseInfo.autograph // 签名人身份
            }
        },
        showStatus () {
            console.log(this.changChengBaseInfo.InsuredTaxBaseInfoShow)
            console.log('this.changChengBaseInfo.InsuredTaxBaseInfoShow')
            return this.changChengBaseInfo.InsuredTaxBaseInfoShow
        },
        ...mapGetters([
            'changChengBaseInfo'
        ])
    },
    components: {
        Name,
        Ming,
        Birthday,
        NowAddress,
        BornAddress,
        TaxNum,
        WhyNoTaxNum,
        SignIdenty
    }
}
</script>

<style>

</style>