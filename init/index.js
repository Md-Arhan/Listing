const mongoose = require('mongoose');
const initdata = require("./data");
const Listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then((res) =>{
    console.log("Connected Succesfully");
}).catch((err) =>{
    console.log(err);
})

const initDB = async () =>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj, owner:"685ef3b66f5cad22f3e43ea7"
    }))
    await Listing.insertMany(initdata.data);
    console.log("data initialized")
}

initDB();