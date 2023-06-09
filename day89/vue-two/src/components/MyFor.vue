

<script>
export default {
    name:"MyFor",
    data(){
        return {
            list: [
                { id: 10100, content: '抽烟' },
                { id: 10200, content: '喝酒' },
                { id: 10300, content: '烫头' },
            ]
        }
    },
    render(createElement){
        return createElement('ul',{},[
            ...this.list.map(item=>{
                return createElement('li',{},item.content)
            })
        ])
    }
}
</script>

<style scoped>

</style>