const getPopularTeachers = async (setTeachers, setIsTeacherLoading) => {
    setIsTeacherLoading(true)
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/get-popular-teachers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let result = await res.json();
    setTeachers(result);
    setIsTeacherLoading(false)
}

export default getPopularTeachers;