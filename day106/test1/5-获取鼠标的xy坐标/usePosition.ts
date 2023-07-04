
import { onMounted, ref,onBeforeUnmount } from 'vue'

export default function usePosition (){
  //横坐标
  const x = ref(-1)
  // 纵坐标
  const y = ref(-1)
  const clickHandler = (event:MouseEvent)=>{
    x.value = event.pageX
    y.value = event.pageY
  }
  // 页面挂载后window、document绑定点击事件
  onMounted(()=>{
    window.addEventListener('click',clickHandler,false)
  })
  // 页面下载前

  onBeforeUnmount(()=>{
    window.removeEventListener('click',clickHandler)
  })


    return {
      x,y
    }
}
