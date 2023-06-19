<template>
    <div class="pagination" v-if="total">

        <button :disabled="pageNo" @click = "sendPageNo(pageNo-1)">上一页</button>
        <button v-show="startEnd.start !== 1" @click="sendPageNo(1)"> 1 </button>
        <span v-show="startEnd.start > 2">···</span>


        <!-- 第二种中间数字 -->
        <!-- <button 
        :class = '{active:(index + startEnd.start) === pageNo}'
            v-for="(_,index) in (startEnd.end - startEnd.start + 1)"
            :key = "index"
        >
        {{index + startEnd.start}}
    </button> -->
        <!-- 第二种中间数字 --> 
        <button
            :class="{ active: item === pageNo }"
            v-for="item in number"
            :key="item"
        >
            {{ item }}
        </button>

        <span v-show="startEnd.end < totalPage - 1">···</span>
        <button v-show="startEnd.end !== totalPage" @click="sendPageNo(totalPage)">{{totalPage}}</button>
        <button  :disabled="pageNo == totalPage" @click = "sendPageNo(pageNo+1)">下一页</button>

        <span>共 {{total}} 条</span>
        <hr>
        <br>
        <span>开始 {{startEnd.start}}</span>
        <span>结束 {{startEnd.end}}</span>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["total", "pageSize", "pageNo", "continues","sendPageNo" ] ,
    // ----------------------------------------------------------------
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        startEnd() {
            let start = 0; //连续也的起始位置
            let end = 0; //连续也得结束位置
            const { totalPage, pageNo, continues } = this;

            if (continues > totalPage) {
                console.log("过分了");
                start = 1;
                end = totalPage;
            } else {
                start = pageNo - (continues - 1) / 2; //起始位置
                end = pageNo + (continues - 1) / 2; //结束为止
                // 第二种情况判断一下左边是否超出
                if (start < 1) {
                    console.log(1);
                    start = 1;
                    end = continues;
                }
                // 第三种情况判断一下右边是否超出
                if (end > totalPage) {
                    console.log(1);
                    start = totalPage - continues + 1;
                    end = totalPage;
                }
            }

            return { start, end };
        },
        number() {
            const { start, end } = this.startEnd;
            let arr = [];
            for (let index = 0; index < end - start + 1; index++) {
                arr.push(start + index);
            }
            return arr;
        },
    },
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: gray;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #c81623;
            color: #fff;
        }
    }

    span {
        display: inline-block;
        line-height: 28px;
        font-size: 14px;
        color: gray;
        vertical-align: middle;
    }
}
</style>