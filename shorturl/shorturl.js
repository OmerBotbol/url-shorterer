const express = require("express");
const router = express.Router();
const fs = require("fs");
const shortid = require("shortid")

router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post("/:new", (req, res)=>{
    const givenUrl = req.body.url;
    if(checkValidation(givenUrl)){
        const urlData = [{
            "original_URL":givenUrl,
            "new_URL": shortid.generate()
        }];
        fs.writeFile("./DataBase.json",JSON.stringify(urlData),'utf8',(err)=>{
            if (err) throw err;
        })
        res.send(urlData);
    }
    res.send({"error":"Invalid URL"});
    
})

router.get("/:shorturl", (req, res)=>{
    const {shorturl} = req.params;
    fs.readFile("./DataBase.json",(err, data)=>{
        const dataBase = JSON.parse(data.toString())
        const urlToRedirect = dataBase.find(url => url.new_URL === shorturl).original_URL;
        res.redirect(urlToRedirect);
    })
})

function checkValidation(url){
        try {
          new URL(url);
        } catch (e) {
          console.error(e);
          return false;
        }
        return true;
}

function getFullURL(shortUrl){
    
}

module.exports = router;