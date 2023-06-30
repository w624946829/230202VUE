import {extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'

// 配置规则
extend('odd',{
    validate:value => value % 2,
    message:'{_field_}的数量必须为奇数'
})

extend('required',{
    ...required,
    message:'{_field_}的数量必须填写'
})

extend('eqeq',{
    validate:(value,params)=>{
        console.log('@',value,params);
        return  value === params.number
    },
    params:['number','type'],
    message:'{_field_}的数量必须与{type}数量一致'
})

extend('verifyPhone',{
    validate:value => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value),
})