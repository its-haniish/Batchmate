
const likeFeedback = async (feedbackId, token, setLiked, setLikedList, userId) => {
    setLiked(true)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedbackId })
    })
    const result = await response.json();
    if (result.message === 'Liked') {
        setLikedList(prev => [...prev, userId])
    }
}

const dislikeFeedback = async (feedbackId, token, setLiked, setLikedList, userId) => {
    setLiked(false)
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/dislike`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedbackId })
    })
    const result = await response.json();
    if (result.message === 'Disliked') {
        setLikedList(prev => prev.filter(id => id !== userId))
    }
}

export { likeFeedback, dislikeFeedback }