import { getData } from "./GetData"
import { postData } from "./PostData"
import { putData } from "./PutData"

export const getLookUpList = () => {
    return getData('https://localhost:44358/api/lookup',"").then(data=>data)
}

export const getLookUps = (status:string) => {
    const parameters = new URLSearchParams({
        status:status,    
    })
    return getData('https://localhost:44358/api/lookup?',parameters).then(data=>data)
}

export const getLookUpValues = (id:string) => {
    const parameters = new URLSearchParams({
        id:id,    
    })
    return getData('https://localhost:44358/api/lookupvalues?',parameters).then(data=>data)
}

export const addLookUp = (data:any) => {
    return postData('https://localhost:44358/api/lookup',data)
}

export const addLookUpValues = (data:any) => {
    return postData('https://localhost:44358/api/lookupvalues',data)
}

export const editLookUpValues = (data:any) => {
    return putData('https://localhost:44358/api/lookupvalues',data)
}

export const editLookUp = (id:number) => {
    return putData('https://localhost:44358/api/lookup',JSON.stringify({id:id}))
}

export const getLookUpName = (value:string) => {
    const parameters = new URLSearchParams({
        value:value,
        id:""    
    })
    return getData('https://localhost:44358/api/lookup?',parameters).then(data=>data)
}


