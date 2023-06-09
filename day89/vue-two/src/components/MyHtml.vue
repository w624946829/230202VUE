

<script>
export default {
    name:"MyHtml",
    data(){
        return {
            msg:'我爱你',
            message:'<b>我爱你</b>'
        }
    },
    render(createElement){
        // <div >我爱你</div>
        // return createElement('div',{},'我爱你高圆圆')

        // 插值语法
        // return createElement('div',{},this.msg)

        // v-html 和v-text
        return createElement('div',{
            //domProps 是用来配置DOM的原生配置
            domProps:{
                // innerText:this.msg
                innerHTML:this.message
            }
        })
    }
}
</script>

<style scoped>

</style>