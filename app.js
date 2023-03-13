var express = require("express")
var app = express()
var mongoose = require("mongoose");
const shortLinks = require("./models/shortLinks");
var ShortLinks = require("./models/shortLinks")
mongoose.connect("mongodb://localhost:27017/urlShortener",{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))


app.get("/", async (req, res)=>{
    var results = await ShortLinks.find()
    res.render("index", {results: results})
})

app.post("/shortLinks", async (req, res)=>{
   await ShortLinks.create({ full: req.body.fullUrl})
})
app.get("/:shortLink", async (req,res)=>{
    var oneLink = await ShortLinks.findOne({short: req.params.shortLink})
    if(oneLink == null) return res.sendStatus(404)
    
    shortLinks.clicks ++
    oneLink.save()
    res.redirect(oneLink.full)
})

// app.post("/delete/:id", async function(req, res){
//     await ShortLinks.findByIdAndRemove({_id: req.params.shortLink})
//     return res.redirect("/")
// })
app.listen(4000, ()=>{
    console.log("server started")
})