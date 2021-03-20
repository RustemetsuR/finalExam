import React from 'react';
import './PlacesListItem.css';
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const PlacesListItem = props => {
    const user = useSelector(state => state.user.user);
    return (
        <div className="placeListItem">
            <NavLink to={"/places/" + props.placeID}>
                <img className="placeListItem-img" src={apiURL + "/uploads/" + props.image} alt={props.title}/>
            </NavLink>
            <div className="place-main-info">
                <NavLink to={"/places/" + props.placeID}>
                    <h3>{props.title}</h3>
                </NavLink>
                <p>{props.description}</p>

                <p>Images: {props.imagesValue}</p>
                <p>
                    Reviews: {props.reviewsValue}
                </p>
            </div>

            {user && user.role === "admin" ? <button onClick={props.delete}>Delete</button>: null}
        </div>
    );
};

export default PlacesListItem;