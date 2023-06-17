<template>  
	<div class="pagination">
        <button>上一页</button>
        <button>1</button>
        <span>···</span>

        <button>14</button>
        <button>15</button>
        <button class="active">16</button>    
        <button>17</button>
        <button>18</button>

        <span>···</span>
        <button>{{totalPage}}</button>
        <button>下一页</button>

        <span>共 {{total}} 条</span>
    </div>
</template>

<script>    
  export default {      
    name: "Pagination",   
    props:['total,pageSize,pageNo,continues' ],
    computed:{
        totalPage(){
            return Math.ceil(total/pageSize)
        },
    }
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