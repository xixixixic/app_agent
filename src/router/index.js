import Vue from 'vue'
import Router from 'vue-router'
import store from 'store/index'
import {loginUrl} from 'service/login-url.js'
const LifeInfo = resolve => require(['components/product/life/info'], resolve) // 寿险详情
const ClientTip = resolve => require(['components/product/client/client'], resolve) // 客户提示
const ClientSuccessTip = resolve => require(['components/product/client/client-success'], resolve) // 客户支付成功提示
const LifeHealthNotification = resolve => require(['components/product/life/health-notification'], resolve) // 健康告知
const LifeFirststep = resolve => require(['components/insurance/life/first_step/first_step'], resolve)
const LifeSurestep = resolve => require(['components/insurance/life/sure_step/sure_step'], resolve)
const LifePaystep = resolve => require(['components/insurance/life/pay_step/pay_step'], resolve)
const LifeNeedAttention = resolve => require(['components/insurance/life/sure_step/children/needAttention/detail'], resolve) // 寿险确认保单页注意事项
const LifeDeclaration = resolve => require(['components/insurance/life/sure_step/children/declaration/detail'], resolve) // 寿险确认保单投保声明
const SuccessPay = resolve => require(['components/insurance/life/pay_step/success_pay/success_pay'], resolve)

const CarProductAppoinment = resolve => require(['components/product/car/car_appointment/car_appointment'], resolve) // 车险预约
const CarProductDu = resolve => require(['components/product/car/du_bang/duBanginfo'], resolve) // 都邦车险的投保详情
const DuFirstStep = resolve => require(['components/insurance/car/du_bang/first_step/du_first'], resolve) // 都邦第一步 投保人被保人信息
const DuCarInfo = resolve => require(['components/insurance/car/du_bang/car_info/duCar_info'], resolve) // 都邦车主和车辆信息
const DuCarConfig = resolve => require(['components/insurance/car/du_bang/car_config/duCar_config'], resolve) // 都邦车辆配置
const DuPrice = resolve => require(['components/insurance/car/du_bang/price/du_price'], resolve) // 都邦保费计算
const DuPriceForm = resolve => require(['components/insurance/car/du_bang/priceForm/du_priceForm'], resolve) // 都邦保费计算结果
const DuCarSuccessPay = resolve => require(['components/insurance/car/du_bang/dusuccess_pay/dusuccess_pay'], resolve) // 都邦投保成功

const CarProductTian = resolve => require(['components/product/car/tian_an/tianInfo'], resolve) // 天安车险详情页
const TianCarInfo = resolve => require(['components/insurance/car/tian_an/car_info/tianCar_info'], resolve) // 天安车辆信息
const TianCarConfig = resolve => require(['components/insurance/car/tian_an/car_config/tiancar_config'], resolve) // 天安车辆配置
const TianCarInsuranceInfo = resolve => require(['components/insurance/car/tian_an/insurance_info/tian_insurance_info'], resolve) // 天安
const TianPrice = resolve => require(['components/insurance/car/tian_an/price/tian_price'], resolve) // 天安保费计算
const TianInsuredAndApplicant = resolve => require(['components/insurance/car/tian_an/insured_and_applicant/insured_and_applicant'], resolve) // 天安投保人与被保人
const TianRecipient = resolve => require(['components/insurance/car/tian_an/recipient/tian_recipient'], resolve) // 天安收件人
const TianOrder = resolve => require(['components/insurance/car/tian_an/order/order'], resolve) // 天安订单
const TianSuccessPay = resolve => require(['components/insurance/car/tian_an/tianan_success_pay/tianan_success_pay'], resolve) // 天安支付成功回调
const ServerError = resolve => require(['base/server-error/server-error'], resolve) // 服务器报错页面
const ClientError = resolve => require(['base/client-error/client-error'], resolve) // 客户端报错页面
const ChangChengClientComfirm = resolve => require(['components/insurance/chang-cheng/review-all-info/confirm/showTip'], resolve) // 长城基本信息页
const ChangChengFirst = resolve => require(['components/insurance/chang-cheng/base-info/base-info'], resolve) // 长城基本信息页
const ChangChengChoosePolicy = resolve => require(['components/insurance/chang-cheng/choose-policy/choose-policy'], resolve) // 长城选择产品页
const ChangChengMainPolicy = resolve => require(['components/insurance/chang-cheng/choose-policy/child/main-policy/main-policy'], resolve) // 长城主险
const ChangChengApplicant = resolve => require(['components/insurance/chang-cheng/perfect-info/perfect-applicant-info'], resolve) // 长城被保人信息
const ChangChengInsured = resolve => require(['components/insurance/chang-cheng/perfect-info/perfect-insured-info'], resolve) // 长城被保人信息
const ChangChengBeneficiary = resolve => require(['components/insurance/chang-cheng/perfect-info/perfect-benifit-info'], resolve) // 长城受益人信息
const ChangChengBankCard = resolve => require(['components/insurance/chang-cheng/bank-card/bank-card'], resolve) // 长城银行卡信息
const UploadCard = resolve => require(['components/insurance/chang-cheng/upload-card/upload-card'], resolve) // 上传证件
const UploadYingXiangJian = resolve => require(['components/insurance/chang-cheng/upload-yinxiangjian/upload-yinxiangjian'], resolve) // 上传影像件
const healthTold = resolve => require(['components/insurance/chang-cheng/health-told/health-told'], resolve) // 健康告知信息
const ReviewAllInfo = resolve => require(['components/insurance/chang-cheng/review-all-info/review-all-info'], resolve) // 回显页面信息
const SuccessTrial = resolve => require(['components/insurance/chang-cheng/success-trial/success-trial'], resolve) // 核保成功
const PolicyShouldKonw = resolve => require(['components/insurance/chang-cheng/policy-should-know/policy-should-know'], resolve) // 投保须知

const GuangDaFirst = resolve => require(['components/insurance/guang-da/base-info/base-info'], resolve) // 光大基本信息页
const ChoosePolicy = resolve => require(['components/insurance/guang-da/choose-policy/choose-policy'], resolve) // 光大选择产品页
const GuangDaMainPolicy = resolve => require(['components/insurance/guang-da/choose-policy/child//main-policy/main-policy'], resolve) // 光大主险
const GuangDaFuPolicy = resolve => require(['components/insurance/guang-da/choose-policy/child/fu-policy/fu-policy'], resolve) // 光大附加险

const GuangDaApplicant = resolve => require(['components/insurance/guang-da/perfect-info/perfect-applicant-info'], resolve) // 长城被保人信息
const GuangDaInsured = resolve => require(['components/insurance/guang-da/perfect-info/perfect-insured-info'], resolve) // 长城被保人信息
const GuangDaBeneficiary = resolve => require(['components/insurance/guang-da/perfect-info/perfect-benifit-info'], resolve) // 长城受益人信息
const GuangDaBankCard = resolve => require(['components/insurance/guang-da/bank-card/bank-card'], resolve) // 长城银行卡信息
const GuangDaUploadCard = resolve => require(['components/insurance/guang-da/upload-card/upload-card'], resolve) // 上传证件
const GuangDahealthTold = resolve => require(['components/insurance/guang-da/health-told/health-told.vue'], resolve) // 健康告知信息
const GuangDaPolicyShouldKonw = resolve => require(['components/insurance/guang-da/policy-should-know/policy-should-know'], resolve) // 投保须知
Vue.use(Router)
const router = new Router({
  base: '/app_insurance/',
  routes: [
    {
      path: '/serverError',
      name: 'serverError',
      component: ServerError,
      meta: {
        title: '服务器挂了'
      }
    },
    {
      path: '/clientError',
      name: 'clientError',
      component: ClientError,
      meta: {
        title: '客户端挂了'
      }
    },
    {
      path: '/lifeProductInfo/:token/:productId',
      name: 'lifeProductInfo',
      component: LifeInfo,
      meta: {
        requiresAuth: true,
        title: '产品详情'
      }
    },
    {
      path: '/client',
      name: 'client',
      component: ClientTip,
      meta: {
        requiresAuth: true,
        title: '友情提醒'
      }
    },
    {
      path: '/client-success',
      name: 'client-success',
      component: ClientSuccessTip,
      meta: {
        requiresAuth: true,
        title: '友情提醒'
      }
    },
    {
      path: '/lifeHealthNotification',
      name: 'lifeHealthNotification',
      component: LifeHealthNotification,
      meta: {
        title: '健康告知'
      }
    },
    {
      path: '/first_step',
      name: 'first_step',
      component: LifeFirststep,
      meta: {
        title: '填写投保信息'
      }
    },
    {
      path: '/sure_step',
      name: 'sure_step',
      component: LifeSurestep,
      meta: {
        title: '确认保单信息'
      }
    },
    {
      path: '/pay_step',
      name: 'pay_step',
      component: LifePaystep,
      meta: {
        title: '支付订单'
      }
    },
    {
      path: '/success_pay',
      name: 'success_pay',
      component: SuccessPay,
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/needAttention',
      name: 'needAttention',
      component: LifeNeedAttention,
      meta: {
        title: '注意事项'
      }
    },
    {
      path: '/declaration',
      name: 'declaration',
      component: LifeDeclaration,
      meta: {
        title: '投保声明'
      }
    },
    {
      path: '/car_appointment/:token',
      name: 'car_appointment',
      component: CarProductAppoinment,
      meta: {
        requiresAuth: true,
        title: '车险'
      }
    },
    {
      path: '/duBanginfo/:token',
      name: 'duBanginfo',
      component: CarProductDu,
      meta: {
        requiresAuth: true,
        title: '都邦车险'
      }
    },
    {
      path: '/du_first',
      name: 'du_first',
      component: DuFirstStep,
      meta: {
        title: '都邦车险投被保人信息'
      }
    },
    {
      path: '/duCar_info',
      name: 'duCar_info',
      component: DuCarInfo,
      meta: {
        title: '填写车辆信息'
      }
    },
    {
      path: '/duCar_config',
      name: 'duCar_config',
      component: DuCarConfig,
      meta: {
        title: '填写车辆配置'
      }
    },
    {
      path: '/du_price',
      name: 'du_price',
      component: DuPrice,
      meta: {
        title: '投保流程'
      }
    },
    {
      path: '/du_priceForm',
      name: 'du_priceForm',
      component: DuPriceForm,
      meta: {
        title: '税率详情'
      }
    },
    {
      path: '/dusuccess_pay',
      name: 'dusuccess_pay',
      component: DuCarSuccessPay,
      meta: {
        title: '保单成功'
      }
    },
    {
      path: '/tianInfo/:token',
      name: 'tianInfo',
      component: CarProductTian,
      meta: {
        requiresAuth: true,
        title: '产品详情'
      }
    },
    {
      path: '/tianCar_info',
      name: 'tianCar_info',
      component: TianCarInfo,
      meta: {
        title: '填写信息'
      }
    },
    {
      path: '/tiancar_config',
      name: 'tiancar_config',
      component: TianCarConfig,
      meta: {
        title: '填写车辆配置'
      }
    },
    {
      path: '/tian_insurance_info',
      name: 'tian_insurance_info',
      component: TianCarInsuranceInfo,
      meta: {
        title: '填写投保信息'
      }
    },
    {
      path: '/tian_price',
      name: 'tian_price',
      component: TianPrice,
      meta: {
        title: '填写报价'
      }
    },
    {
        path: '/insured_and_applicant',
        name: 'insured_and_applicant',
        component: TianInsuredAndApplicant,
        meta: {
            title: '填写投保人被保人'
        }
    },
    {
      path: '/tian_recipient',
      name: 'tian_recipient',
      component: TianRecipient,
      meta: {
        title: '填写报价'
      }
    },
    {
        path: '/order',
        name: 'order',
        component: TianOrder,
        meta: {
            title: '创建订单'
        }
    },
    {
      path: '/tianan_success_pay/:orderNo',
      name: 'tianan_success_pay',
      component: TianSuccessPay,
      meta: {
          title: '支付成功'
      }
    },
    {
      path: '/choose-policy',
      name: 'choose-policy',
      component: ChangChengChoosePolicy,
      meta: {
          title: '长城主附险保险详情'
      }
    },
    {
      path: '/showTip',
      name: 'showTip',
      component: ChangChengClientComfirm,
      meta: {
          title: '客户支付成功提示'
      }
    },
    {
      path: '/base-info',
      name: 'base-info',
      component: ChangChengFirst,
      meta: {
          title: '长城投保人被保人信息填写'
      }
    },
    {
      path: '/perfect-applicant-info',
      name: 'perfect-applicant-info',
      component: ChangChengApplicant,
      meta: {
          title: '长城投保人详细信息'
      }
    },
    {
      path: '/perfect-insured-info',
      name: 'perfect-insured-info',
      component: ChangChengInsured,
      meta: {
          title: '长城被保人详细信息'
      }
    },
    {
      path: '/main-policy',
      name: 'main-policy',
      component: ChangChengMainPolicy,
      meta: {
          title: '长城主险详情'
      }
    },
    {
      path: '/perfect-benifit-info',
      name: 'perfect-benifit-info',
      component: ChangChengBeneficiary,
      meta: {
          title: '长城受益人详细信息'
      }
    },
    {
      path: '/bank-card',
      name: 'bank-card',
      component: ChangChengBankCard,
      meta: {
          title: '长城银行卡信息'
      }
    },
    {
      path: '/policy-should-know',
      name: 'policy-should-know',
      component: PolicyShouldKonw,
      meta: {
          title: '投保须知'
      }
    },
    {
      path: '/upload-card',
      name: 'upload-card',
      component: UploadCard,
      meta: {
          title: '上传证件信息'
      }
    },
    {
      path: '/upload-yinxiangjian',
      name: 'upload-yinxiangjian',
      component: UploadYingXiangJian,
      meta: {
          title: '上传影像件'
      }
    },
    {
      path: '/health-told',
      name: 'health-told',
      component: healthTold,
      meta: {
          title: '健康告知信息'
      }
    },
    {

      path: '/review-all-info',
      name: 'review-all-info',
      component: ReviewAllInfo,
      meta: {
          title: '确认所有信息'
      }
    },
    {
      path: '/success-trial',
      name: 'success-trial',
      component: SuccessTrial,
      meta: {
          title: '支付成功'
      }
    },
    {
      path: '/guangdachoose-policy',
      name: 'guangdachoose-policy',
      component: ChoosePolicy,
      meta: {
          title: '光大主附险保险详情'
      }
    },
    {
      path: '/guangdabase-info',
      name: 'guangdabase-info',
      component: GuangDaFirst,
      meta: {
          title: '光大投保人被保人信息填写'
      }
    },
    {
      path: '/guangdamain-policy',
      name: 'guangdamain-policy',
      component: GuangDaMainPolicy,
      meta: {
          title: '光大主险详情'
      }
    },
    {
      path: '/guangdafu-policy',
      name: 'guangdafu-policy',
      component: GuangDaFuPolicy,
      meta: {
          title: '光大附加险详情'
      }
    },
    {
      path: '/guangdaApplicant-detail',
      name: 'guangdaApplicant-detail',
      component: GuangDaApplicant,
      meta: {
          title: '光大投保人详细信息'
      }
    },
    {
      path: '/guangdainsured-detail',
      name: 'guangdainsured-detail',
      component: GuangDaInsured,
      meta: {
          title: '光大被保人详细信息'
      }
    },
    {
      path: '/guangdabeneficiary-detail',
      name: 'guangdabeneficiary-detail',
      component: GuangDaBeneficiary,
      meta: {
          title: '光大受益人详细信息'
      }
    },
    {
      path: '/guangdabank-card',
      name: 'guangdabank-card',
      component: GuangDaBankCard,
      meta: {
          title: '光大银行卡信息'
      }
    },
    {
      path: '/guangdaupload-card',
      name: 'guangdaupload-card',
      component: GuangDaUploadCard,
      meta: {
          title: '光大上传银行卡'
      }
    },
    {
      path: '/guangdahealth-told',
      name: 'guangdahealth-told',
      component: GuangDahealthTold,
      meta: {
          title: '光大健康告知信息'
      }
    },
    {
      path: '/guangdapolicy-should-know',
      name: 'guangdapolicy-should-know',
      component: GuangDaPolicyShouldKonw,
      meta: {
          title: '光大投保须知'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.requiresAuth) {
    if (to.params.token === 'null') {
      location.href = loginUrl
    } else {
      store.commit('SET_REMOVE_LIFE')
      next()
    }
  } else {
    next()
  }
})
export default router