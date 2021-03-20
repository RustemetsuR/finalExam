const router = require("express").Router();
const config = require("../config");
const multer = require("multer");
const path = require("path");
const Places = require("../models/Places");
const Reviews = require("../models/Places");
const User = require("../models/User");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const { nanoid } = require('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const places = await Places.find();
        res.send(places);
    } catch (e) {
        res.sendStatus(401).send(e);
    }
});

router.get("/:id", async (req, res) => {
    const place = await Places.findById(req.params.id).populate("reviews.userID");

    if (!place) {
        return res.status(401).send({ error: "Place does not exist" });
    }


    let averageScore = {
        qualityOfFood: 0,
        serviceQuality: 0,
        interior: 0,
    };

    let scoreOfPlace = {
        finalScore: 0
    };

    for(let i = 0; i < place.reviews.length; i++){
        averageScore.qualityOfFood = averageScore.qualityOfFood + place.reviews[i].scores.qualityOfFood;
        averageScore.serviceQuality = averageScore.serviceQuality + place.reviews[i].scores.serviceQuality
        averageScore.interior = averageScore.interior + place.reviews[i].scores.interior
    }

    averageScore.qualityOfFood = Math.round(averageScore.qualityOfFood / place.reviews.length)
    averageScore.serviceQuality = Math.round(averageScore.serviceQuality / place.reviews.length)
    averageScore.interior = Math.round(averageScore.interior / place.reviews.length)

    const sumOfScores = averageScore.qualityOfFood + averageScore.serviceQuality + averageScore.interior;
    scoreOfPlace.finalScore = Math.round(sumOfScores / 3);

    try {
        res.send({place, averageScore, scoreOfPlace});
    } catch (e) {
        res.sendStatus(401).send(e);
    }
});

router.post("/", [auth, upload.single("mainImage")], async (req, res) => {
    const placeData = req.body;
    const token = req.get("Authorization");

    const user = await User.findOne({ token });

    if(user){
        req.body.userID = user._id
    }else{
        res.status(401).send({error: "Wrong token"});
    }

    if (req.file) {
        placeData.mainImage = req.file.filename;
    };

    const newPlace = new Places(placeData);

    //В postman не получается отправить Boolean значения, поэтому сделал условие на присутствие поля agreement с любым значением.

    if(req.body.agreement){
        try {
            await newPlace.save();
            res.send(newPlace);
        } catch (e) {
            res.status(400).send(e);
        }
    }else{
        res.status(401).send({error: "Please, submit agreement!"});
    }
});

router.put("/:id/newImages", [auth, upload.single("url")], async (req, res) => {
    const placeData = req.body;
    const token = req.get("Authorization");

    const user = await User.findOne({ token });

    if(user){
        req.body.userID = user._id
    }else{
        res.status(401).send({error: "Wrong token"});
    }

    if (req.file) {
        placeData.url = req.file.filename;
    };

    const place = await Places.findByIdAndUpdate(req.params.id, {$push: {othersImages: {url: req.body.url}}});

        try {
            await place.save();
            res.send(place);
        } catch (e) {
            res.status(400).send(e);
        }
});

router.put("/:id/newReview", auth, async (req, res) => {

    const token = req.get("Authorization");

    const user = await User.findOne({ token });

    if(user){
        req.body.userID = user._id
    }else{
        res.status(401).send({error: "Wrong token"});
    }

    const place = await Places.findByIdAndUpdate(req.params.id,
        {$push:
                {reviews:
                        {
                            userID: req.body.userID,
                            text: req.body.text,
                            scores: req.body.scores
                        }}});

    try {
        await place.save();
        res.send(place);
    } catch (e) {
        res.status(400).send(e);
    }
});




router.delete("/deletePlace/:id", [auth, permit("admin")], async (req, res) => {
    const result = await Places.findByIdAndDelete(req.params.id);
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;