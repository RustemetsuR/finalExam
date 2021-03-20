import React, {useEffect, useState} from 'react';
import './SinglePlacePage.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchAddPlaceImage, fetchAddPlaceReview, fetchGetSinglePlace} from "../../store/actions/placesActions";
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import ReviewsListItem from "../../components/ReviewsListItem/ReviewsListItem";

const SinglePlacePage = props => {
    const dispatch = useDispatch();
    const place = useSelector(state => state.places.singlePlace);
    const user = useSelector(state => state.user.user);

    const placeInfo = place.place;
    const averageScore = place.averageScore;
    const finalScore = place.scoreOfPlace;

    const [anotherImage, setAnotherImage] = useState({
        url: "",
    });

    const [reviewTextState, setReviewTextState] = useState({
        text: "",
    });

    const [scoresInputData, setScoresInputData] = useState({
        qualityOfFood: 1,
        serviceQuality: 1,
        interior: 1
    });

    const reviewData = {
        text: reviewTextState.text,
        scores: {
            qualityOfFood: scoresInputData.qualityOfFood,
            serviceQuality: scoresInputData.serviceQuality,
            interior: scoresInputData.interior
        }
    };

    const onChangeText = event => {
        setReviewTextState({text: event.target.value});
    };

    const changeScores = event => {
        const name = event.target.name;
        const value = event.target.value;

        setScoresInputData({...scoresInputData, [name]: parseInt(value)});
    };


    useEffect(() => {
        dispatch(fetchGetSinglePlace(props.match.params.id));
    },[dispatch, props.match.params.id]);


    const changeImage = event => {
        setAnotherImage( {url: event.target.files[0]});
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('url', anotherImage.url);
        if(anotherImage.url !== ""){
            dispatch(fetchAddPlaceImage(formData));
        }
    };

    const addReview = () => {
        dispatch(fetchAddPlaceReview(reviewData));
    };

    return (
        <div>
            <div>
                {placeInfo && averageScore &&
                <div className="single-place-box">
                    <div className="single-place-box-inner single-place-info-box">
                        <h1>
                            {placeInfo.title}
                        </h1>

                        <p>
                            {placeInfo.description}
                        </p>
                        <p>
                            Final Score: {finalScore.finalScore}
                        </p>
                        <p>
                            Quality Of Food: {averageScore.qualityOfFood}
                        </p>

                        <p>
                            Service Quality: {averageScore.serviceQuality}
                        </p>

                        <p>
                            Interior: {averageScore.interior}
                        </p>



                        <div className="other-images-box">
                            <NavLink to={"/places/" + props.match.params.id + "/gallery"}>
                                Gallery
                            </NavLink>

                            <div className="other-images-list-box">
                                {place && place.place.othersImages && place.place.othersImages.length < 3 ?
                                    place.place.othersImages.map(oi => {
                                        return  <img src={apiURL + "/uploads/" + oi.url} key={oi._id} alt={place.title}/>
                                    }) :
                                    <div>
                                        <img
                                            src={place && place.place.othersImages && apiURL + "/uploads/" + place.place.othersImages[0].url}
                                            key={place && place.place.othersImages && place.place.othersImages[0]._id}
                                            alt={place && place.title}/>
                                        <img
                                            src={place && place.place.othersImages && apiURL + "/uploads/" + place.place.othersImages[1].url}
                                            key={place && place.place.othersImages && place.place.othersImages[1]._id}
                                            alt={place && place.place.title}/>
                                        <img
                                            src={place && place.place.othersImages && apiURL + "/uploads/" + place.place.othersImages[2].url}
                                            key={place && place.place.othersImages && place.place.othersImages[2]._id}
                                            alt={place && place.place.title}/>
                                    </div>
                                }

                            </div>
                            {user && user.length !== 0 ?
                                <form onSubmit={submitFormHandler}>
                                    <input type="file" onChange={changeImage}/>

                                    <button type="submit">
                                        Add Image
                                    </button>
                                </form>: null}
                        </div>

                    </div>
                    <div className="single-place-box-inner single-place-image-box">
                        <img src={place && apiURL + "/uploads/" + place.place.mainImage} alt={place.place.title}/>
                    </div>
                </div>}
            </div>

            <div className="reviews-box">
                {placeInfo &&
                <div>
                    <div className="reviews-list-item-box">
                        {place.place.reviews && place.place.reviews.map(r => {
                            return <ReviewsListItem
                                key={r._id}
                                username={r.userID.username}
                                dateTime={r.dateTime}
                                text={r.text}
                                qualityOfFood={r.scores && r.scores.qualityOfFood}
                                serviceQuality={r.scores && r.scores.serviceQuality}
                                interior={r.scores && r.scores.interior}
                            />
                        })}
                    </div>

                    {user && user.length !== 0 ? <div className="add-reviews-box">
                        <input type="text" onChange={onChangeText} value={reviewTextState.text}/>

                        <input
                            type="number"
                            name="qualityOfFood"
                            min={1}
                            max={5}
                            onChange={changeScores}
                            placeholder="Quality Of Food"
                            value={scoresInputData.qualityOfFood}/>
                        <input
                            type="number"
                            name="serviceQuality"
                            min={1}
                            max={5}
                            onChange={changeScores}
                            placeholder="Service Quality"
                            value={scoresInputData.serviceQuality}/>
                        <input
                            type="number"
                            name="interior"
                            min={1}
                            max={5}
                            onChange={changeScores}
                            placeholder="Interior"
                            value={scoresInputData.interior}/>

                        <button onClick={addReview}>Add Review</button>
                    </div>: null}
                </div>}
            </div>
        </div>
    );
};

export default SinglePlacePage;