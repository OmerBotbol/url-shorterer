const express = require("express");
const router = express.Router();
const fs = require("fs");
const shortid = require("shortid")

router.use(express.json());
router.use(express.urlencoded({ extended: false }))

router.post("/:new", (req, res)=>{
    const urlData = {
        "original url":req.body.url,
        "new url": shortid.generate()
    };
    fs.writeFile("./DataBase.json",JSON.stringify(urlData),'utf8',(err)=>{
        if (err) throw err;
    })
    res.send(urlData);
})

module.exports = router;