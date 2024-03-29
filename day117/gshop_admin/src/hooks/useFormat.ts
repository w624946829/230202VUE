/* 
数值/人民币格式化
*/

function formatNumber(value: any) {
    if (!value) return ''
    return `${value}`.replace(/(\d{3})(?=\d)/g, '$1,')
  }
  // 格式化数字和人民币数据
  export default function useFormat() {
    const numberFormat = (value: any) => formatNumber(value)
    const moneyFormat = (value: any) => `¥ ${formatNumber(value)}`
    return {
      numberFormat,
      moneyFormat
    }
  }