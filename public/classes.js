class DataBase{
    constructor(){
        this.data =[]
    }

    update(priviousURLs){
        this.data = [...priviousURLs]
    }
}
module.exports = DataBase;