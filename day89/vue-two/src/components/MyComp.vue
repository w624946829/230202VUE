<script>
import MyChild from '@/components/MyChild'
export default {
    name:"MyComp",
    data() {
        return { 
            title:'这是一个标题',
            content:'文本描述内容'
        }
    },
    render(createElement){
        return createElement('div',{},[
            createElement('h2',{},'如何使用render组件'),
            createElement('hr',{}),
            createElement(MyChild,{
                on:{
                    //给组件绑定自定义事件
                    changeCountent:(text)=>{
                        this.content  += text
                    }
                },
                //父给子传参使用props传参
                props:{
                    title:this.title,
                    description:this.content
                }
            })
        ])
    }
}
</script>

<style scoped>

</style>