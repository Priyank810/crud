export const get = async (to:string,parameters:any) => {
    const response = await fetch(`https://localhost:44358/api/${to}?` + parameters,{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+JSON.parse(localStorage.getItem("user-info")||'{}').access_token,
            'Content-Type':'application/json',
            'Accept':'application/json'
        }})
    const result = await response.json()
    return result
}

export const getData = async (to:string,parameters:any) => {
    const response = await fetch(to + parameters,{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+JSON.parse(localStorage.getItem("user-info")||'{}').access_token,
            'Content-Type':'application/json',
            'Accept':'application/json'
        }})
    const result = await response.json()
    return result
}

