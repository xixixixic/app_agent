<template>
     <div class="item">
        <div class="inner">
            <div class="left" style="flex:0 0 2.6rem;width: 2.6rem;"><span class="text">{{choiceType}}</span></div>
            <div class="right">
                <div v-for="(choice, index) in choiceTypeValue" class="people" :class="{'active': selected === index}"
                 @click="withPeople(index)">
                    {{choice}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            choiceType: {
                type: String,
                default: ''
            },
            choiceTypeValue: {
                type: Array,
                default: function () {
                    return []
                }
            },
            defaultSelected: {
                type: Number,
                default: ''
            }
        },
        data () {
            return {
                selected: '0'
            }
        },
        created () {
            this.selected = this.defaultSelected
        },
        computed: {
        },
        methods: {
            withPeople (index) {
                this.selected = index
                if (index === 1) {
                    this.$emit('choice', index)
                } else {
                    this.$emit('choice', index)
                }
            }
        }
    }
</script>
<style scoped lang="stylus">
    @import '~components/insurance/life/first_step/children/common/stylus/common.styl'
</style>