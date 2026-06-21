const express = require("express")
const app = express()
const mongoose = require("mongoose")
const listing = require("./models/listing")
const path = require("path")
const methodoverride = require("method-override")
const ejsMate = require("ejs-mate")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);



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

// app.get("/",(req,res)=>{
//     res.send("home route is working")
// })
//index route
app.get("/listing",async (req , res)=>{
  const lists = await listing.find({});
  res.render("./listings/index.ejs",{lists});
});

//new route
app.get("/listing/new",(req,res)=>{
    res.render("./listings/new.ejs");

})

//create route
app.post("/listing",async (req,res)=>{
    let {title , description , image , price , location , country} = req.body;
  const newListing = new listing({
    title,
    description,

    image: {
        filename: "listingimage",
        url: image,
    },

    price,
    location,
    country
});
    await newListing.save();
   console.log(newListing);
    res.redirect("/listing");
})

app.get("/listing/:id/edit",async (req,res)=>{
    let {id}  = req.params;
     const list = await listing.findById(id);
    res.render("./listings/edit.ejs",{list});
})

app.put("/listing/:id",async (req,res)=>{
    let {id}  = req.params;
     let {title , description , image , price , location , country} = req.body.list;
    let updatedList = await listing.findByIdAndUpdate(id , {
         title,
        description,

        image: {
            filename: "listingimage",
            url: image,
        },

        price,
        location,
        country
     },{new : true});
    //   console.log(updatedList);
    //   res.redirect(`/listing`)
    // await listing.findByIdAndUpdate(id,{...req.body.list});
    res.redirect(`/listing/${id}`)

});
//delete
app.delete("/listing/:id",async (req,res)=>{
     let {id}  = req.params;
     await listing.findByIdAndDelete(id);
     res.redirect("/listing");
})

app.get("/listing/:id",async (req,res)=>{
    let {id}  = req.params;
     const list = await listing.findById(id);
     res.render("./listings/show.ejs",{list});
})


app.listen(8080,()=>{
    console.log("server is listening")
})
