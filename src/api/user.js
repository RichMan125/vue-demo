import service from "@/request/request";

export function getUsers(page,userinfo){
    return service({
        url:"/user",
        method:"post",
        data:{
            "pageSize":page.pageSize,
            "pageNo":page.pageNo,
            "username":userinfo.username,
            "email":userinfo.email,
            "address":userinfo.address
        }
    })
}

export function addUser(user){
    return service({
        url:"/user/add",
        method:"post",
        data:user
    })
}

export function editUser(user){
    return service({
        url:"/user/edit",
        method:"post",
        data:user
    })
}
export function delUser(ids){
    return service({
        url:"/user/del/",
        method:"post",
        data:ids
    })
}
export function getUserInfo(id){
    return service({
        url:"/user/getInfo/"+id,
        method:"get",
    })
}
