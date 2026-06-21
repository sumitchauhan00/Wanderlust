const mongoose = require("mongoose")
const initdata = require("./data")
const listing = require("../models/listing")


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
main().then((res)=>{
    console.log("connected successfully")
})
.catch((err)=>{
    console.log(err);
})
async function main(){
   await mongoose.connect(MONGO_URL)
}


const initDB  = async ()=>{
await listing.deleteMany({});
await listing.insertMany(initdata.data);
}
initDB();