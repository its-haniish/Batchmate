
const likeFeedback = async (feedbackId, token, setLiked, setLikedList, userId) => {
    setLiked(true)
    setLikedList(prev => [...prev, userId])
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedbackId })
    })
    const result = await response.json();
    console.log(result);
}

const dislikeFeedback = async (feedbackId, token, setLiked, setLikedList, userId) => {
    setLiked(false)
    setLikedList(prev => prev.filter(id => id !== userId))
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dislike`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedbackId })
    })
    const result = await response.json();
    console.log(result);
}

export { likeFeedback, dislikeFeedback }