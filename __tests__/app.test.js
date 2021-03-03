const request = require("supertest");
const DataBase = require("../public/classes")
const shortid = require("shortid");
const dataBase = new DataBase();

const app = require("../app");
beforeEach(() => {
    jest.spyOn(shortid, 'generate').mockReturnValue("abcdef");
});

afterEach(() => {
    jest.spyOn(shortid, 'generate').mockRestore();
})

describe("POST entry points: ",()=>{
    const sentPost = {
        url:"https://github.com"
    }

    const newPost = {
        url:"https://instegram.com"
    }
    it("should not change the new url when exist url is enteres", async ()=>{

        const firstResponse = await request(app).post("/api/shorturl/new").send(sentPost);
        const secondResponse = await request(app).post("/api/shorturl/new").send(sentPost);
        expect(firstResponse.status).toBe(200);
        expect(firstResponse.body).toEqual(secondResponse.body);
    })

    it("should create new url when adding url that doesn't exist yet", async ()=>{
        
        const response = await request(app).post("/api/shorturl/new").send(newPost);
        
        expect(response.status).toBe(200)
        expect(response.body.original_URL).toEqual(newPost.url);
        expect(response.body.new_URL).toEqual("abcdef");
    })
})