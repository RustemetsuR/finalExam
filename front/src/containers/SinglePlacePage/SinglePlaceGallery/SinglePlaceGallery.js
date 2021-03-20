import React, {useEffect} from 'react';
import './SinglePlaceGallery.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchGetSinglePlace} from "../../../store/actions/placesActions";
import {apiURL} from "../../../constants";

const SinglePlaceGallery = props => {

    const gallery = useSelector(state => state.places.singlePlace);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchGetSinglePlace(props.match.params.id));
        }, [dispatch, props.match.params.id])

    return (
        <div>
            <div className="gallery-box">
                {gallery && gallery.place && gallery.place.othersImages && gallery.place.othersImages.length !== 0 ? gallery.place.othersImages.map(g => {
                    return <img src={apiURL + "/uploads/" + g.url} key={g._id} alt={gallery.place.title}/>
                }): <h1>No Images!</h1>}
            </div>
        </div>
    );
};

export default SinglePlaceGallery;