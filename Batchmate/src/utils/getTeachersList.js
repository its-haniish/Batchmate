
const getTeachersList = async (dispatch, setLoading) => {
    setLoading(true)
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let teachers = await res.json();
    setLoading(false)
    dispatch({
        type: "saveAllTeachers",
        teachers
    })
}

export default getTeachersList;