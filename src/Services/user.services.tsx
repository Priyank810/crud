import { getData } from "./GetData"
import { postData } from "./PostData"
import { putData } from "./PutData"

export const getTaskList = async (email:string) => {
    const parameters = new URLSearchParams({
        email:email,    
    })
    return getData('https://localhost:44358/api/task?',parameters).then(data=>data)
}

export const getPendingTaskList = async (eid:string,date:string) => {
    const parameters = new URLSearchParams({
        eid:eid,
        date:date    
    })
    return getData('https://localhost:44358/api/task?',parameters).then(data=>data)
}

export const getUserDetails = async (email:string) => {
    const parameters = new URLSearchParams({
        email:email,    
    })
    return  getData('https://localhost:44358/api/user?',parameters).then(data=>data)
}

export const getLogList = async (showlogdate:string,eid:string) => {
    const parameters = new URLSearchParams({
        date:showlogdate,
        eid:eid
    })
    return  getData('https://localhost:44358/api/worklog?',parameters).then(data=>data)
}

export const addLog = async (data:any) => {
    return postData('https://localhost:44358/api/worklog?',data)
}

export const addTask = async (data:any) => {
    return postData('https://localhost:44358/api/task?',data)
}

export const editTask = async (data:any) => {
    return putData('https://localhost:44358/api/task?',data)
}
