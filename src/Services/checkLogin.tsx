export const checkLogin = () => {
    if(!localStorage.getItem("user-info"))
    {
        return true
    }
    return false
} 