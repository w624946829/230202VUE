<script>
export default {
    name:"MyDirective",
    data() {
        return { 
            msg:'i love you'
        }
    },

    //局部注册指令
    directives:{
        upper(el,binding){
            console.log(el,binding);
            el.innerHTML = binding.value.toUpperCase()
        }
    },
    render(createElement){
        return createElement('div',{
            //render函数使用指令
            directives:[
                {
                    name:'upper',
                    value:this.msg
                }
            ]
        })
    }
}
</script>

<style scoped>

</style>