
export const getUserDetails = async (token, setData) => {
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-user-info`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    let result = await res.json();

    setData(result);
}