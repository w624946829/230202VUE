<script>
export default {
    name:"MyModel",
    data() {
        return { 
            keyword:'i love you 1111'
        }
    },
    render(createElement){
        return createElement('input',{
            attrs:{
                value:this.keyword
            },
            on:{
                input:e=>{
                    this.keyword = e.target.value
                }
            }
        })
    }
}
</script>

<style scoped>

</style>