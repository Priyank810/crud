import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE} from "./userType"
import history from "../history"
import { get } from "../../Services/GetData"

export const userLoginRequest = () => {
    return {
        type : USER_LOGIN
    }
}

export const userLoginSuccess = (result:any) => {
    return {
        type : USER_LOGIN_SUCCESS,
        payload : result
    }
}

export const userLoginFailure = (errorMsg:any) => {
    return {
        type : USER_LOGIN_FAILURE,
        payload : errorMsg
    }
}

export const loginUser = (email:any,password:any) => {
    return async (dispatch:any) => {

        dispatch(userLoginRequest)
        
        let  data = new URLSearchParams()
        data.append('username', email)
        data.append('password', password)
        data.append('grant_type', 'password')

        const response = await fetch('https://localhost:44358/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: data.toString()
        })

        const result = await response.json()
        
        if(result.error_description==="Username or password is incorrect")
        {
            dispatch(userLoginFailure(result.error_description))
        }
        else
        {
            dispatch(userLoginSuccess(result))
            localStorage.setItem("user-info",JSON.stringify(result))
            setUserData(email)
        }
    }
}

const setUserData = async (email:string) => {

    const parameters = new URLSearchParams({
        email:email
    })

    const userdata = await get("login",parameters).then(data=>data)
    
    localStorage.setItem("data",JSON.stringify(userdata))
    
    if(userdata.isadmin) {
        history.push("/employee")
    }
    else {
        history.push("/dashboard")
    }
}

export const logOutUser = () => {
    return (dispatch:any) => {
        localStorage.removeItem("user-info")
        localStorage.removeItem("data")
        history.push("/")
    }
}

