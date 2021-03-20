import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './AddNewPlace.css';
import {addNewPlaceFailure, fetchAddNewPlace} from "../../store/actions/placesActions";

const AddNewPlace = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const error = useSelector(state => state.places.error);
    const [inputData,setInputData] = useState({
        title: "",
        description: "",
        mainImage: "",
        agreement: false,
    });

    const inputDataOnChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setInputData({
            ...inputData,
            [name]: value
        });

        console.log(inputData)
    }

    const changeAgreement = () => {
        setInputData({
            ...inputData,
            agreement: !inputData.agreement
        });
    }

    const changeImage = event => {
        setInputData({ ...inputData, mainImage: event.target.files[0] });
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('mainImage', inputData.mainImage);
        formData.append('title', inputData.title);
        formData.append('description', inputData.description);
        formData.append('agreement', inputData.agreement);
        formData.append('userID', user._id);

        if(inputData.agreement){
            dispatch(fetchAddNewPlace(formData));
        }else{
            dispatch(addNewPlaceFailure("Please"));
        }
    };

    return (
        <div className="add-new-place-box">
            {error ? <h4>{error}</h4> : null}
            <form onSubmit={submitFormHandler}>
                <input
                    id='username'
                    onChange={inputDataOnChange}
                    name="title"
                    placeholder='Title'
                    value={inputData.title} />
                <input
                    id='description'
                    onChange={inputDataOnChange}
                    name="description"
                    placeholder='Description'
                    value={inputData.description} />
                <input
                    id='mainImage'
                    onChange={changeImage}
                    type='file'/>
                <input
                    type="checkbox"
                    value={inputData.agreement}
                    checked={inputData.agreement}
                    name="agreement"
                    onChange={changeAgreement}/>
                <button id='addPlaceBtn' type='submit'>Add a new place</button>
            </form>
        </div>
    );
};

export default AddNewPlace;