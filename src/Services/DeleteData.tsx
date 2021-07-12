export const deletedata = async (to:string,id:number) => {
    const response = await fetch(`https://localhost:44358/api/${to}/`+id,{
        method:'DELETE',
        headers:{
            'Authorization':'Bearer '+JSON.parse(localStorage.getItem("user-info")||'{}').access_token,
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    })
    const result = await response.json()
    return result
}