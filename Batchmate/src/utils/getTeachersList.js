
const getTeachersList = async (setTeachers) => {
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let result = await res.json();
    setTeachers(result);
}

export default getTeachersList;