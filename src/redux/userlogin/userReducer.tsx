import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from "./userType"

const initialState = {
    success:'',
    error : ''
}

export const userReducer = (state = initialState, action:any) => {
    switch(action.type) {
        case USER_LOGIN : return {
            ...state,
        }

        case USER_LOGIN_SUCCESS :return {
            success:action.payload,
            error : ''
        }
        

        case USER_LOGIN_FAILURE : return {
            success:'',
            error : action.payload
        }

        case USER_LOGOUT : return {
            success:'',
            error:''
        }

        default : return state
    }
}

export default userReducer