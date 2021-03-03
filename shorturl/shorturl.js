const DataBase = require("../public/classes");
const {checkValidationOfUrl, checkValidationOfHost, checkRepeat} = require("../public/functions");
const express = require("express");
const router = express.Router();
const dataBase = new DataBase();


router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post("/new", (req, res)=>{
    const givenUrl = req.body.url;
    if(!checkValidationOfUrl(givenUrl)){
        res.send({"error":"Invalid URL"});
    } else{
        checkValidationOfHost(givenUrl).then(()=>{
            checkRepeat(givenUrl).then((resolve)=>{
                res.send(resolve);
            }).catch((reject)=>{
                dataBase.write(reject, givenUrl)
                res.send(dataBase.data[dataBase.data.length - 1]);
            })
    
        }).catch(()=>{
            res.send({"error":"Invalid Hostname"});
        })
    }
})

router.get("/:shorturl", (req, res)=>{
    const {shorturl} = req.params;
            dataBase.read().then((resolve) =>{
                try{
                    const urlToRedirect = resolve.find(url => url.new_URL === shorturl).original_URL;
                    res.redirect(urlToRedirect);
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