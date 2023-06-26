
import  {v4 as uuidv4} from 'uuid'
export function getUserTempId(){
    /*
    一定会返回一个临时的身份标识（userTempId），具体如下
    1、尝试从local中读取userTempId
        有：直接返回，无需其他操作
        没有 ：创建一个，
        
        ，存入localstorage 
        返回 ===> ===> 以后要用
    */ 

        const userTempId = localStorage.getItem('userTempId');
        if(userTempId){
            return userTempId
        }else{
            const newUserTempId = uuidv4()
            localStorage.setItem('userTempId',newUserTempId)
            return newUserTempId
        }
}

export function saveToken(token){
    localStorage.setItem('token',token)
}

export function getToken(){
    return localStorage.getItem('token')
}

export function deleteToken(){
    localStorage.removeItem('token')
}