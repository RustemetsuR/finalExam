import React from 'react';
import './ReviewsListItem.css';

const ReviewsListItem = props => {
    return (
        <div className="review-box">
            <div className="review-user-box">
                <h3>{props.username}</h3>
                <span>{props.dateTime}</span>
            </div>


            <h4>{props.text}</h4>
            <p>Quality Of Food: {props.qualityOfFood}</p>
            <p>Service Quality: {props.serviceQuality}</p>
            <p>Interior: {props.interior}</p>
        </div>
    );
};

export default ReviewsListItem;