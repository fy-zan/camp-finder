const mongoose = require("mongoose");
const Campground = require("../models/campground");
const {shehers} = require("./cities")
const {places, descriptors} = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "60d34c876613261620298a5f",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${shehers[random1000].city}, ${shehers[random1000].state}`,
            geometry: { coordinates: [ shehers[random1000].longitude, shehers[random1000].latitude ], type: 'Point' },
            images: [
                {
                  url: 'https://res.cloudinary.com/thawne/image/upload/v1624602529/YelpCamp/ikiadrpp8byrhuqwxjmb.jpg',
                  filename: 'YelpCamp/ikiadrpp8byrhuqwxjmb'
                },
                {
                  url: 'https://res.cloudinary.com/thawne/image/upload/v1624602532/YelpCamp/t4qaaikmcm7pg56pgqsy.png',
                  filename: 'YelpCamp/t4qaaikmcm7pg56pgqsy'
                },
                {
                  url: 'https://res.cloudinary.com/thawne/image/upload/v1624602532/YelpCamp/qm9v5i2xfja1lesol1ro.jpg',
                  filename: 'YelpCamp/qm9v5i2xfja1lesol1ro'
                },
                {
                  url: 'https://res.cloudinary.com/thawne/image/upload/v1624602550/YelpCamp/n7gw54zkeldcrngk7aai.png',
                  filename: 'YelpCamp/n7gw54zkeldcrngk7aai'
                }
              ],
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque veniam error expedita quos libero numquam iste sint unde esse aut repellendus non, explicabo magnam ratione rerum quia dicta debitis porro.",
            price
        })
        await camp.save()
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})