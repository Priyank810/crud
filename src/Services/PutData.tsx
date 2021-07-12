export const put = async (to:any,data:any) => {
    const response = await fetch(`https://localhost:44358/api/${to}`,{
        method:'PUT',
        headers:{
            'Authorization':'Bearer '+JSON.parse(localStorage.getItem("user-info")||'{}').access_token,
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:data
    })
    const result = await response.json()
    return result
}

export const putData = async (to:any,data:any) => {
    const response = await fetch(to,{
        method:'PUT',
        headers:{
            'Authorization':'Bearer '+JSON.parse(localStorage.getItem("user-info")||'{}').access_token,
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body:data
    })
    const result = await response.json()
    return result
}