export type taskinfo = {
    taskid:number,
    employeeid:number,
    tasktitle:string,
    taskdescription:string,
    startdate:Date,
    enddate:Date,
    iscompleted:boolean
}

export const radiooptions = [
    {key:'completed', value:'completed'},
    {key:'pending', value:'pending'}
]

export type taskdetail = {
    tasktitle:string,
    taskdescription:string,
    startdate:Date|null,
    enddate:Date|null,
    status:''
}

export type taskdetailedit = {
    tasktitle:string|undefined,
    taskdescription:string|undefined,
    startdate:Date|null|undefined,
    enddate:Date|null|undefined,
    status:string|undefined
}