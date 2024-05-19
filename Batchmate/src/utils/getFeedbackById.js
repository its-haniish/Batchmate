const getFeedbackById = async (id, setUserFeedbacks, setIsFeedbacksLoading) => {
    setIsFeedbacksLoading(true)
    let result = await fetch(`${process.env.REACT_APP_BASE_URL}/get-feedback-by-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });
    let data = await result.json();
    setIsFeedbacksLoading(false)
    return setUserFeedbacks(prev => [...prev, data]);
}

export default getFeedbackById;