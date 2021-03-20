import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDeletePlace, fetchGetPlaces} from "../../store/actions/placesActions";
import PlacesListItem from "../../components/PlacesListItem/PlacesListItem";
import './MainPage.css';

const MainPage = () => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetPlaces());
    }, [dispatch]);

    const deletePlace = id => {
        dispatch(fetchDeletePlace(id));
        dispatch(fetchGetPlaces());
    };

    return (
        <div>
            <div className="places-list-box">
                {places && places.map(p => {
                    return <PlacesListItem
                        key={p._id}
                        placeID={p._id}
                        image={p.mainImage}
                        title={p.title}
                        description={p.description}
                        imagesValue={p.othersImages.length}
                        reviewsValue={p.reviews.length}
                        delete={() => deletePlace(p._id)}/>
                })}
            </div>
        </div>
    );
}

export default MainPage;