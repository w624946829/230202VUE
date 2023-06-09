<script>
export default {
    name: "MySlotChild",
    data() {
        return {
            userinfo: {
                username: '沈腾',
                age: 40
            },
            intro: '喜剧演员'
        }
    },
    render(createElement) {

        console.log('this.$slots', this.$slots)
        console.log('this.$scopedSlots', this.$scopedSlots)
        // 普通插槽 和 具名插槽
        //      使用 this.$slots 这个对象中放的是虚拟DOM, 例如
        //      this.$slots.default  默认插槽
        //      this.$slots.qwer     具名插槽
        // 也可以用
        //      this.$scopedSlots,这个对象中放的是函数,用来调用的,主要用于作用域插槽
        //      例如
        //      this.$scopedSlots.default()
        //      this.$scopedSlots.qwer()



        // 默认插槽
        // return createElement('div', {}, [
        //     createElement('h3', {}, 'slot传参 - 子组件'),
        //     // <slot></slot>
        //     this.$slots.default
        // ])


        // 具名插槽
        return createElement('div', {}, [
            createElement('h3', {}, 'slot传参 - 子组件'),
            // -----默认插槽
            // <slot></slot>
            // this.$slots.default,
            this.$scopedSlots.default(),



            createElement('div', {}, '燕子,没有你我可怎么办'),
            // -----具名插槽
            // <slot name="qwer"></slot>
            // this.$slots.qwer,
            this.$scopedSlots.qwer(),



            createElement('div', {}, '燕子,你别走'),
            // -----作用域插槽
            // <slot name="abc" :userinfo="userinfo" :intro="intro"></slot>
            this.$scopedSlots.abc({
                userinfo: this.userinfo,
                intro: this.intro
            })
        ])
    }
}
</script>

<style scoped>

</style>