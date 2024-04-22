import { getCookie } from "../utils/cookies"

const getTeachersList = async (setTeachers) => {
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(getCookie("batchmate")).token}`
        },
    });
    let result = await res.json();
    setTeachers(result);
}

export default getTeachersList;