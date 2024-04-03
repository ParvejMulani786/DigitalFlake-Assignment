import toast from "react-hot-toast";

export async function emailValidate(values){
    const errors = emailVerify({}, values)
    return errors;
}
/* validate email */
function emailVerify( error = {}, values){
    if(!values.email){
        error.email = toast.error("Email required..!")
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    {
        error.email = toast.error("Invalid Email..!")
    }
    return error;
}

export async function passwordValidate(values){
    const errors = passwordVerify({}, values)
    return errors;
}
/* validate password */
function passwordVerify( error = {}, values){

    
    if(!values.password){
        error.password = toast.error("password required..!")
    }
    else if (values.password.includes(" "))
    {
        error.password = toast.error("Invalid password..!")
    }
    else if (values.password.length < 4){
        error.password = toast.error("Password must br more than 4 characters..!")
    }
    
    return error;
}

