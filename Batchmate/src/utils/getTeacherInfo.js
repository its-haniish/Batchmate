import { getCookie } from "./cookies";

export const getTeacherInfo = async (id, setTeachInfo) => {
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/search-teacher-by-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(getCookie("batchmate")).token}`
        },
        body: JSON.stringify({ id })
    });
    let result = await res.json();
    console.log(result);
    setTeachInfo(result)
}