<template>
    <div class="FeiJuMin">
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
                type: 'ApplicantTaxBaseInfo',
                defaultName: this.changChengBaseInfo.ApplicantTaxBaseInfo.lName,
                defaultMing: this.changChengBaseInfo.ApplicantTaxBaseInfo.tName,
                defaultBirthday: this.changChengBaseInfo.ApplicantTaxBaseInfo.birthDate,
                defaultNowAddressProvince: this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressProvince, // 现居地址省
                defaultNowAddressCity: this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressCity, // 现居地址市
                defaultNowAddressCounty: this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressCounty, // 现居地址县
                defaultNowAddressStreet: this.changChengBaseInfo.ApplicantTaxBaseInfo.inAddressStreet, // 现居地址街道
                defaultBornAddressProvince: this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressProvince, // 出生地址省
                defaultBornAddressCity: this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressCity, // 出生地址市
                defaultBornAddressCounty: this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressCounty, // 出生地址县
                defaultBornAddressStreet: this.changChengBaseInfo.ApplicantTaxBaseInfo.bornAddressStreet, // 出生地街道
                defaultTaxNum: this.changChengBaseInfo.ApplicantTaxBaseInfo.identificationNum, // 税收居民国（地区）及纳税人识别号
                defaultWhyNoTaxNum: this.changChengBaseInfo.ApplicantTaxBaseInfo.reason, // 不能提供居民国（地区）纳税人识别号原因
                defaultSignIdenty: this.changChengBaseInfo.ApplicantTaxBaseInfo.autograph // 签名人身份
            }
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