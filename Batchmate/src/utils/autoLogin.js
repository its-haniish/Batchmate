import { getCookie } from './cookies';

const autoLogin = async (isUserLoggedIn, dispatch, setIsAutoLoginLoading) => {
    setIsAutoLoginLoading(true)
    const token = getCookie("batchmate");
    if (!isUserLoggedIn && token !== null) {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auto-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        })

        const result = await response.json();

        const { message } = result;
        if (message === "Auto login successful") {
            const resp = await fetch(`${process.env.REACT_APP_BASE_URL}/get-user-info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const parsedResp = await resp.json();
            // console.log(parsedResp);
            dispatch({
                type: 'saveUserData',
                ...parsedResp
            })

            dispatch({
                type: "loginUser",
                token
            })
            console.log("User auto login success");
            setIsAutoLoginLoading(false)
            return true
        } else {
            console.log("Try login manually.");
            setIsAutoLoginLoading(false)
            return false
        }

    } else {
        setIsAutoLoginLoading(false)
        return getCookie("batchmate") === null;
    }
}

export default autoLogin;