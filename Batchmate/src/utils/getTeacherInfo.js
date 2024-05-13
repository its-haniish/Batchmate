
export const getTeacherInfo = async (id, setTeachInfo) => {
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/search-teacher-by-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });
    let result = await res.json();
    // console.log(result);
    setTeachInfo(result)
}

export const getTeacherDetails = async (id, setTeachInfo, setLoading) => {
    setLoading(true)
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/search-teacher-by-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });
    let result = await res.json();
    // console.log(result);
    setTeachInfo(result)
    setLoading(false)
}