import React from 'react'
import './ourreviewsdc.css';
import { PiStarBold } from "react-icons/pi";
import Rectangle1 from '../Assets/Rectangle 34624566.png'
import Rectangle2 from '../Assets/Rectangle 34624569.png'
import Rectangle3 from '../Assets/Rectangle 34624571.png'
const reviews = [
    {
      id: 1,
      name: 'Ajay',
      date: '21-11-2024',
      review: "My first, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
      avatar: Rectangle1, 
      rating: 4
    },
    {
      id: 2,
      name: 'Neha',
      date: '20-11-2024',
      review: "My first, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
      avatar: Rectangle2, 
      rating: 5
    },
    {
      id: 3,
      name: 'Rohan',
      date: '19-11-2024',
      review: "My first, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
      avatar: Rectangle3,
      rating: 3
    },
    {
      id: 4,
      name: 'Priya',
      date: '18-11-2024',
      review: "My first, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
      avatar: Rectangle2, 
      rating: 4
    },
    {
      id: 5,
      name: 'Anil',
      date: '17-11-2024',
      review: "My first, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
      avatar: Rectangle1,
      rating: 2
    },
    {
      id: 6,
      name: 'hari',
      date: '16-11-2024',
      review: "My first, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type ",
      avatar: Rectangle3, 
      rating: 5
    },
];
const OurReviewsDc = () => {
  return (
    <div className="OurReviewsDc-review-container">
        <h2>Our Reviews</h2>
        <div className="OurReviewsDc-review-card-box">
            {reviews.map(review => (
                <div key={review.id} className="OurReviewsDc-review-card">
                    <div className="OurReviewsDc-review-avatar">
                        <img src={review.avatar} alt={review.name} />
                        <p>{review.name}</p>
                    </div>
                    <div className="OurReviewsDc-review-content">
                        <div className='OurReviewsDc-review-header-container'>
                            <div className="OurReviewsDc-review-header">
                                <div className="OurReviewsDc-review-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <PiStarBold key={i} size='1rem' color={i < review.rating ? 'orange' : '#ddd'} />
                                    ))}
                                </div>
                                <p className="OurReviewsDc-review-date m-0">{review.date}</p>
                            </div>
                            <p className="OurReviewsDc-review-text">{review.review}</p>
                        </div>
                        <div className='OurReviewsDc-reply-button-container'>
                            <button className="OurReviewsDc-reply-button">Reply</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default OurReviewsDc