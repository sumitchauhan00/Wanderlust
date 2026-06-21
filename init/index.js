const mongoose = require("mongoose")
const initdata = require("./data")
const listing = require("../models/listing")


const MONGO_URL = "mongodb+srv://sumitchauhan2764_db_user:cvYslkV3ViEcjjsa@cluster0.ox62lej.mongodb.net/?appName=Cluster0"

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