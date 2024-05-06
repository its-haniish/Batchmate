import { FaStar } from 'react-icons/fa';


function StarRating({ rating }) {

    return (
        <>
            {
                Array.from({ length: rating }).map((_, index) => (
                    <FaStar key={index} stroke='gray' strokeWidth="50px" fill='gold' size="20px" />
                ))
            }
        </>
    );
}

export default StarRating;