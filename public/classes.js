const fs = require("fs");
require('dotenv/config');
const shortid = require("shortid");
let DB_URI = "./DataBase.json"
if(process.env.NODE_ENV === 'test'){
    DB_URI = process.env.DB_URI;
}
class DataBase{
    constructor(){
        this.data =[]
    }
    write(priviousURLs, url){
        this.data = [...priviousURLs]
        const urlData = {
            "original_URL":url,
            "new_URL": shortid.generate(),
            "creationDate": Date.now(),
            "redirectCount": 0
        };
        this.data.push(urlData);
        fs.writeFile(DB_URI,JSON.stringify(this.data, null, 4),'utf8',(err)=>{
            if (err) throw err;
        })
    }

    read(){
        return new Promise((resolve, reject)=>{
            fs.readFile(DB_URI,(err, data)=>{
                const existURLs = JSON.parse(data.toString());
                resolve(existURLs)
                if(err){
                    reject();
                }
            })
        })
    }

    updateCount(priviousURLs, originalURL){
        this.data = [...priviousURLs];
        const indexOfChange = this.data.findIndex(url => url.original_URL === originalURL);
        this.data[indexOfChange].redirectCount++;
        fs.writeFile(DB_URI,JSON.stringify(this.data, null, 4),'utf8',(err)=>{
            if (err) throw err;
        })
    }
}

module.exports = DataBase;