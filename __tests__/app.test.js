const request = require("supertest");

const app = require("../app");

describe("POST entry points: ",()=>{
    const sentPost = {
        url:"https://github.com"
    }
    it("should not change the new url when exist url is enteres", async ()=>{
        const firstResponse = await request(app).post("/api/shorturl/new").send(sentPost);
        const secondResponse = await request(app).post("/api/shorturl/new").send(sentPost);
        expect(firstResponse.status).toBe(200);
        expect(firstResponse.body).toEqual(secondResponse.body);
    })
})