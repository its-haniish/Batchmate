function calculateAverageStars(feedbacks) {
    const sum = feedbacks.reduce((acc, feedback) => acc + feedback.stars, 0);
    const avgStars = sum / feedbacks.length;
    const roundedVal = Math.floor(avgStars)
    return roundedVal;
}

export default calculateAverageStars;