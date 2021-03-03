const fs = require("fs");
const shortid = require("shortid");
class DataBase{
    constructor(){
        this.data =[]
    }
    
    write(priviousURLs, url){
        this.data = [...priviousURLs]
        const urlData = {
            "original_URL":url,
            "new_URL": shortid.generate()
        };
        this.data.push(urlData);
        fs.writeFile("./DataBase.json",JSON.stringify(this.data, null, 4),'utf8',(err)=>{
            if (err) throw err;
        })
    }

    read(){
        return new Promise((resolve, reject)=>{
            fs.readFile("./DataBase.json",(err, data)=>{
                const existURLs = JSON.parse(data.toString());
                resolve(existURLs)
                if(err){
                    reject();
                }
            })
        })
    }
}
module.exports = DataBase;