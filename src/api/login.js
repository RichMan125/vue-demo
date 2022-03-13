import service from "@/request/request";

export function login(user){
    return service({
        url:'/login',
        method:'post',
        data:user
    })
}

export function register(user){
    return service({
        url:'/register',
        method:'post',
        data:user
    })
}