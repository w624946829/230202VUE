<script>
export default {
    name:"MyEvent",
    data() {
        return { 
            isShow: true
        }
    },
    render(createElement){
        return createElement('div', {}, [
            createElement('button', {
                on: {
                    click: () => {
                        this.isShow = !this.isShow
                    }
                }
            }, '切换'),
            this.isShow ? createElement('div', {
                class: {
                    bgRed: true,
                    fontBlue: true,
                    f30: true
                }
            }, '我爱你') : ''
        ])
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