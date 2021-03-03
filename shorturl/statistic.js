const DataBase = require("../public/classes");
const express = require("express");
const router = express.Router();
const dataBase = new DataBase();
const {getSQLFormat} = require("../public/functions");

router.get("/:shorturl",(req, res)=>{
    const {shorturl} = req.params
    dataBase.read().then((resolve)=>{
        try{
            let urlToShow = resolve.find(url => url.new_URL === shorturl);
            urlToShow.creationDate = getSQLFormat(urlToShow.creationDate);
            res.send(urlToShow);
        }
        catch(err){
            res.status(404);
            res.send({"error":"No short URL found for the given input"});
        }
    }).catch(()=>{
        res.status(500);
        res.send({"msg":"We have a problem in our server please try again later"});
    })
})


module.exports = router;