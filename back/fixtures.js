const mongoose = require("mongoose");
const config = require("./config");
const User = require("./models/User");
const Places = require("./models/Places");
const { nanoid } = require("nanoid");

mongoose.connect(config.db.url + '/' + config.db.name, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("users");
        await db.dropCollection("places");
    } catch (e) {
        console.log("Collection were not presented, skipping drop...");
    };

    const [user1, user2, admin] = await User.create(
        {
            username: 'user1',
            password: '12345678Kk',
            token: nanoid(),
        },
        {
            username: 'user2',
            password: '12345678Kk',
            token: nanoid(),
        },
        {
            username: 'admin',
            password: '12345678Kk',
            token: nanoid(),
            role: 'admin'
        }
    );

    const [daamduu, kfc, macdonald] = await Places.create(
        {
            userID: user1._id,
            mainImage: "daamduu.jpeg",
            title: "Даамдуу",
            description: "Бургеры, пончики, шаурма, напитки, хотдоги",
            reviews: [
                {
                    userID: user2._id,
                    text: "Я отравился от вашей шаурмы",
                    scores: {
                        qualityOfFood: 2,
                        serviceQuality: 3,
                        interior: 4,
                    }
                },
                {
                    userID: user2._id,
                    text: "Я тоже",
                    scores: {
                        qualityOfFood: 1,
                        serviceQuality: 4,
                        interior: 2,
                    }
                },
                {
                    userID: user2._id,
                    text: "И я",
                    scores: {
                        qualityOfFood: 1,
                        serviceQuality: 2,
                        interior: 4,
                    }
                }
            ]
        },
        {
            userID: user1._id,
            mainImage: "kfc.jpeg",
            title: "KFC",
            description: "Сочная курочка",
            reviews: [
                {
                    userID: user2._id,
                    text: "Наисочнейшая курочка, но дорого!",
                    scores: {
                        qualityOfFood: 4,
                        serviceQuality: 5,
                        interior: 5,
                    }
                },
                {
                    userID: user2._id,
                    text: "А мне норм",
                    scores: {
                        qualityOfFood: 4,
                        serviceQuality: 5,
                        interior: 5,
                    }
                },
                {
                    userID: user2._id,
                    text: "И мне",
                    scores: {
                        qualityOfFood: 4,
                        serviceQuality: 5,
                        interior: 5,
                    }
                }
            ]
        },
        {
            userID: user2._id,
            mainImage: "macdonald.jpg",
            title: "MacDonald",
            description: "MacDonald",
            reviews: [
                {
                    userID: user1._id,
                    text: "Вроде +-",
                    scores: {
                        qualityOfFood: 4,
                        serviceQuality: 5,
                        interior: 5,
                    }
                },
                {
                    userID: user2._id,
                    text: "Согласен",
                    scores: {
                        qualityOfFood: 4,
                        serviceQuality: 5,
                        interior: 5,
                    }
                },
                {
                    userID: user1._id,
                    text: "И я тоже согласен",
                    scores: {
                        qualityOfFood: 4,
                        serviceQuality: 5,
                        interior: 5,
                    }
                }
            ]
        },
    );

    db.close();
});