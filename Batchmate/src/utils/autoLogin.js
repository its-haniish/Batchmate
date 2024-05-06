import { getCookie } from './cookies';

const autoLogin = async (isUserLoggedIn, dispatch) => {
    const token = getCookie("batchmate");
    if (!isUserLoggedIn && token !== null) {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auto-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: token
        })

        const result = await response.json();

        const { message } = result;
        if (message === "Auto login successful") {
            dispatch({
                type: "loginUser",
                token
            })
            console.log("User auto login success");
            return true
        } else {
            console.log("Try login manually.");
            return false
        }

    } else {
        return getCookie("batchmate") === null;
    }
}

export default autoLogin;