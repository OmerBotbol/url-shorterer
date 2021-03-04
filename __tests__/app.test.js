const request = require("supertest");
const shortid = require("shortid");
const nock = require('nock')
const app = require("../app");
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
    it("should not change the new url when exist url is enteres", async ()=>{

        const firstResponse = await request(app).post("/api/shorturl/new").send(mockURLs[0]);
        const secondResponse = await request(app).post("/api/shorturl/new").send(mockURLs[0]);
        expect(firstResponse.status).toBe(200);
        expect(firstResponse.body).toEqual(secondResponse.body);
    })

    // it("should create new url when adding url that doesn't exist yet", async ()=>{
        
    //     jest.spyOn(shortid, 'generate').mockReturnValue("abcdef");
        
    //     const response = await request(app).post("/api/shorturl/new").send(mockURLs[1]);
        
    //     expect(response.status).toBe(200)
    //     expect(response.body.original_URL).toEqual(mockURLs[1].url);
    //     expect(response.body.new_URL).toEqual("abcdef");

    //     jest.spyOn(shortid, 'generate').mockRestore();
    // })

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