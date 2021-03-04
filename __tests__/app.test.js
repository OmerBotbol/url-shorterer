const request = require("supertest");
const shortid = require("shortid");
const app = require("../app");
const DataBase = require("../public/classes")
const dataBase = new DataBase();
const mockURLs = [
    {
        url:"https://github.com"
    },
    {
        url:"https://instegram.com"
    },
    {
        url:"I'mInvalidURL"
    },
    {
        url:"https://noubpiubpibpub.com"
    }
]
describe("POST entry points: ",()=>{
    // it("should create new url when adding url that doesn't exist yet", async ()=>{
        
    //     jest.spyOn(shortid, 'generate').mockReturnValue("abcdef");
        
    //     const response = await request(app).post("/api/shorturl/new").send(mockURLs[1]);
        
    //     expect(response.status).toBe(200)
    //     expect(response.body.original_URL).toEqual(mockURLs[1].url);
    //     expect(response.body.new_URL).toEqual("abcdef");

    //     jest.spyOn(shortid, 'generate').mockRestore();
    // })

    it("should not change the new url when exist url is enteres", async ()=>{

        const firstResponse = await request(app).post("/api/shorturl/new").send(mockURLs[0]);
        const secondResponse = await request(app).post("/api/shorturl/new").send(mockURLs[0]);
        expect(firstResponse.status).toBe(200);
        expect(firstResponse.body).toEqual(secondResponse.body);
    })

    it('should send "invalid url" error when invalid url is sent', async()=>{

        const response = await request(app).post("/api/shorturl/new").send(mockURLs[2]);
        expect(response.status).toBe(200);
        expect(response.body.error).toEqual("Invalid URL");

    })
    it('should send "invalid hostName" error when invalid hostName is sent', async()=>{

        const response = await request(app).post("/api/shorturl/new").send(mockURLs[3]);
        expect(response.status).toBe(200);
        expect(response.body.error).toEqual("Invalid Hostname");

    })
})

describe("GET entry points: ",()=>{
    it("should redirect to original url based on the short url and update redirectCount ",async()=>{
        const postRequest = await request(app).post("/api/shorturl/new").send(mockURLs[0]);
        let databaseArr = await dataBase.read();
        const redirectCount = databaseArr.find(url=> url.original_URL === mockURLs[0].url).redirectCount;
        const response = await request(app).get(`/api/shorturl/${postRequest.body.new_URL}`);
        databaseArr = await dataBase.read();
        const newRedirectCount = databaseArr.find(url=> url.original_URL === mockURLs[0].url).redirectCount;
        expect(response.status).toBe(302);
        expect(response.header.location).toEqual(mockURLs[0].url);
        expect(newRedirectCount).toBe(redirectCount + 1);
    })


})