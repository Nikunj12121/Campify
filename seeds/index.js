const express = require('express');
const path =require('path');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities =require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/campify',{
    useNewUrlParser:true,
   // useCreateIndex:true,
    useUnifiedTopology:true,
    //useFindAndModify: false
});

const db = mongoose.connection;
    db.on("error",console.error.bind(console,"connection error:"));
    db.once("open",()=>{
        console.log("Database connected");
    });

const sample = (array) => array[Math.floor(Math.random()*array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    
    for(let i=1;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp =  new Campground({
            author:'67962eff66e8e2f5babfbc81',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minus atque perferendis dolorem velit, accusantium animi dolore quibusdam quasi, fuga quia placeat dolores reprehenderit, excepturi deserunt modi aliquam eligendi aperiam.',
            price:price
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});