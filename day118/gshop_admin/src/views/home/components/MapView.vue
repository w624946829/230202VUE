<template>
  <div class="center-2">
    <!--虚影图片-->
    <img src="./imgs/jt.png" alt="jt" class="bg-img jt" />
    <!--圆球图片-->
    <img src="./imgs/map.png" alt="map" class="bg-img map" />
    <!--球线图片-->
    <img src="./imgs/lbx.png" alt="lbx" class="bg-img lbx" />
    <v-chart class="chart-container" :option="getOption()" autoresize />
  </div>
</template>
<script lang="ts">
export default {
  name: 'MapView'
}
</script>
<script lang="ts" setup>
// 引入注册地图的api方法
import {registerMap} from 'echarts/core'
// 引入json数据
import china from './china.json'
registerMap('china',china as any)
const getOption=()=>{
    return {
        geo:[
            {
                map:'china',
                itemStyle:{
                    areaColor:'#02a774',// 区域的颜色
                    borderColor:'rgba(43,196,243,1)',//边框的颜色
                    borderWidth:2//边框的宽度
                },
                // 设置高亮效果的
                emphasis:{
                    label:{show:true,color:'#fff'},//标签的样式
                    itemStyle:{color:'#3398db'},
                }
            }
        ],
        series:[
            {
                type:'lines',
                lineStyle:{
                    // 线的样式
                    color:'#fff',//线的颜色
                    width:2,//线的宽度
                    curveness:0.3// 线的曲度
                },
                effect:{
                    // 特效的样式
                    show:true,//是否显示特效
                    symbol:'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',//特效的图形
                    symbolSize:10,//特效的大小
                    trailLength:0.5 //尾迹的大小
                },
                zlevel:1,//分层
                data:[
                    [
                        {
                        coord:[116.4551,40.8539] //起始点                            
                        },
                        {
                        coord:[121.4648,31.2891] //终点
                        }
                    ],
                    [
                        {
                        coord:[116.4551,40.8539] //起始点                            
                        },
                        {
                        coord:[114.1178,22.3242] //终点
                        }
                    ],
                    [
                        {
                        coord:[116.4551,40.8539] //起始点                            
                        },
                        {
                        coord:[87.8695,31.6846] //终点
                        }
                    ],
                ]
            },
            {
                
                type:'effectScatter',
                coordinateSystem:'geo',
                data:[
                    {
                        name:'北京',
                        value:[116.4551,40.8539]
                    },
                    {
                        name:'上海',
                        value:[121.4648,31.2891]
                    },
                    {
                        name:'深圳',
                        value:[114.1178,22.3242]
                    },
                    {
                        name:'西藏',
                        value:[87.8695,31.6846]
                    }
                ],

                label:{
                    show:true,
                    color:'#fff',
                    position:'right',
                    formatter:'{b}'
                },
                itemStyle:{
                    color:'#fff'
                }
            }
        ]
    }
}
</script>
<style scoped lang="scss">
.center-2 {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #06164a;
  // background-color: #0278a7;
  .bg-img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    opacity: 0.3;
    animation: rotate 20s linear infinite;
  }

  .jt {
    width: 430px;
    height: 430px;
    animation: rotate 15s linear infinite reverse;
  }

  .lbx {
    width: 550px;
    height: 550px;
  }

  .map {
    width: 400px;
    height: 400px;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .chart-container {
    width: 100%;
    height: 500px;
  }
}
</style>