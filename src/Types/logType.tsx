export type log = {
    logid:number,
    taskid:number,
    tasktitle:string,
    logdescription:string,
    logdate:Date,
    loghour:number,
    logminute:number,
    employeeid:number
}

export type LogDetail = {
    tasktitle:string,
    logdescription:string,
    logdate:Date|null,
    loghours:number|null,
    logminutes:number|null
}

export type task = {
    tasktitle:string
}