<script>
import MySlotChild from './MySlotChild'
export default {
    name: "MySlot",
    data() {
        return {
        }
    },
    render(createElement) {

        // 默认插槽
        // return createElement('div', {}, [
        //     createElement('h2', {}, 'slot传参 - 父组件'),
        //     // <MySlotChild>我爱你</MySlotChild>
        //     createElement(MySlotChild, {}, '我爱你')
        // ])



        // 具名插槽
        return createElement('div', {}, [
            createElement('h2', {}, 'slot传参 - 父组件'),

            // <MySlotChild>
            //     <div>这个是默认插槽</div> 
            //     <div v-slot:qwer>这个是具名插槽</div> 
            // </MySlotChild>
            createElement(MySlotChild, {

                // 作用域插槽(作用域插槽需要在组件参数二配置项中去写)
                scopedSlots: {
                    abc: (props) => {
                        return createElement('div', {}, [
                            createElement('div', {}, props.userinfo?.username),
                            createElement('div', {}, props.userinfo?.age),
                            createElement('div', {}, props.intro),
                        ])
                    }
                }

            }, [
                // 组件标签之间的内容没有配置slot是默认插槽
                createElement('div', {}, '这个是默认插槽'),

                // 组件标签之间的内容配置slot是具名插槽
                createElement('div', {
                    slot: 'qwer'
                }, '这个是具名插槽'),
            ])
        ])

    }
}
</script>

<style scoped>

</style>