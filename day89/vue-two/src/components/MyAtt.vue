<script>
export default {
    name:"MyAtt",
    data() {
        return {
            myClass: 'bgRed',
            isF30: true
        }
    },
    render(createElement){
        return createElement('div',{
            // class单独配置
            // 3种
            // 字符串
            // class:this.myClass
            // 数组写法
            // class:[this.myClass,'f30']
            // 对象写法
            class:{
                'fontBlue':true,
                'f30':this.isF30,
                //'bgRed':true
                // 对象属性名写法很少出现，一般直接写全称就行，会被解析成字符串
                // 当时当属性名需要obj.xxx 这种的时候，需要用中括号设置属性名
                [this.myClass]:true
            },
            attrs:{
                aa:'qwer'
            }
        },'桩基')
    }
}
</script>

<style scoped>
.bgRed {
    background-color: red;
}
.fontBlue {
    color: skyblue;
}
.f30 {
    font-size: 30px;
}
</style>