<template>
    <div class="content">
        <p class="item">本人已认真阅读并理解 <保险条款> 、<投保须知> 和 <客户告知书>的全部内容，且同意将电子保单发出之日的次日视为客户签收日。同意如发生有关网上投保险种、保险金额等方面的分歧，以贵公司的电子记录凭证等数据电文作为判断本保险合同的唯一合法有效凭证，该凭证具有完全证据效力。</p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable.styl'
    .content
        padding: (30/$scale)
        .item
            line-height: (46/$scale)
            font-size: (28/$scale)
            color: #444444
</style>
