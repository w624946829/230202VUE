<template>
    <div class="todo-footer">
          <label>
            <input type="checkbox" :checked="isSelAll"/>
          </label>
          <span>
            <span>已完成{{selCount}}</span> / 全部{{todos.length}}
          </span>
          <button class="btn btn-danger">清除已完成任务</button>
        </div>
  
</template>

<script>
export default {
    name:"Footer",
    props:{
        todos:{
            type: Array,
            required: true,
        }
    },
    computed:{
        isSelAll(){
           return this.todos.every(item=>item.isSel) 
        
    },
    selCount (){
        let res = this.todos.reduce((prev,item)=>{
            return prev +item.isSel
        },0)
        return res;
    }
}
}
</script>

<style scoped>
/*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }
  
  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }
  
  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }
  
  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>