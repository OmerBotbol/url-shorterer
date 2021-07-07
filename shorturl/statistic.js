const DataBase = require("../public/classes");
const express = require("express");
const router = express.Router();
const dataBase = new DataBase();
const {getSQLFormat} = require("../public/functions");

router.use(express.static(`./public`));

router.get("/", (req, res)=>{
    dataBase.read().then((resolve)=>{
        const urlFormated = resolve.map((urlObj) =>{
            urlObj.creationDate = getSQLFormat(urlObj.creationDate);
            return urlObj
        })
        if(process.env.NODE_ENV === 'test'){
            res.send(urlFormated);
        }
        else{
            res.render('allStatistic' ,{urlFormated});
        }
    })
})

router.get("/:shorturl",(req, res)=>{
    const {shorturl} = req.params
    dataBase.read().then((resolve)=>{
        try{
            let urlToShow = resolve.find(url => url.new_URL === shorturl);
            urlToShow.creationDate = getSQLFormat(urlToShow.creationDate);
            if(process.env.NODE_ENV === 'test'){
                res.send(urlToShow);
            }
            else{
                res.render("oneStatistic", urlToShow);
            }
        }
        catch(err){
            console.log(err)
            res.status(404);
            res.send({"error":"No short URL found for the given input"});
        }
    }).catch(()=>{
        res.status(500);
        res.send({"msg":"We have a problem in our server please try again later"});
    })
})


function createPage(dataToShow){
    const table = document.getElementById("table-of-data");
    const tr = document.createElement("tr")
    for (const key in dataToShow) {
        const data = dataToShow[key];
        const td = document.createElement("td");
        td.innerHTML = data;
        tr.append(td);    
    }
    table.append(tr);
}


module.exports = router;