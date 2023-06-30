import {extend} from 'vee-validate'
import {required} from 'vee-validate/dist/rules'
import {phoneReg,codeReg,pwdReg} from './reg'

// 配置规则
extend('shouji',{
    validate:value => phoneReg.test(value),
    message:'手机号格式错误！'
})

extend('yanzhengma',{
    validate:value => codeReg.test(value),
    message:'验证码必须为6为纯数字！'
})

extend('mima',{
    validate:value => pwdReg.test(value),
    message:'密码必须为6-21位字母数字下划线！'
})

extend('agree',{
    validate:value => value,
    message:'协议必须同意'
})

extend('required', {
    ...required,
    message:'{_field_}必须填写'
  });

extend('eqeq', {
  validate: (value,params) => value == params.number ,
  params:['number','type'],
  message:'{_field_}必须与{type}一致'
});