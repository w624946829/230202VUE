<script>
export default {
    name:"MyChild",
   props:['title','description'],
    render(createElement){
        return createElement('div',{},[
            createElement('h4',{},'子组件'),
            createElement('div',{},this.title),
            createElement('div',{},this.description),
            createElement('button',{
               
                on:{
                    click:()=>{
                        this.$emit('changeCountent','我爱你哦')
                    }
                }
            },'点击修改父组件中content数据'
            ),

        ])
    }
}
</script>

<style scoped>

</style>