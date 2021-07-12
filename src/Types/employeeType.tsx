export const roptions = [
    {key:'male', value:'male'},
    {key:'female', value:'female'},
    {key:'other', value:'other'}
]

export const expoptions = [
    {key:'fresher', value:'fresher'},
    {key:'experience', value:'experience'},
]

export const hobbies = [
    {key:'cricket', value:'cricket'},
    {key:'chess', value:'chess'}
]

export type experiencedetail = {
    technology:string,
    startdate:Date|null,
    enddate:Date|null
}

export type empObj = {
    EmployeeID:number,
    EmployeeName:string,
    Department:string,
    MailID:string,
    DOJ:Date,
    gender:string,
    hobby:[],
    primaryaddress:string,
    secondaryaddress: string,
    imgFile:string,
    experience:experiencedetail[]
}

export type empObjadd = {
    EmployeeID:number|null,
    EmployeeName:string,
    Department:string,
    MailID:string,
    DOJ:Date|null,
    gender:string,
    hobby:[],
    addresses:[''],
    file:string,
    experience:experiencedetail[],
    exptype:string,
    password:string
}

export type empObjedit = {
    EmployeeID:number|string,
    EmployeeName:string,
    Department:string,
    MailID:string,
    DOJ:Date|null,
    gender:string,
    hobby:[],
    addresses:string[],
    file:string,
    experience:experiencedetail[]
}