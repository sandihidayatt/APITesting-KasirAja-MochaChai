const request = require("supertest")("https://jsonplaceholder.typicode.com")
const expect = require("chai").expect;

// memulai pengujian
describe("Scenario testing jsonplaceholder", ()=> {
    it("Add new article", async ()=>{ //test case 1
        const response = await request
        .post("/posts")
        .send({
        userId: 1,
        title: "SDLC",
        body: "Software Development Life Cycle"});
        
        expect(response.body.userId).to.eql(1)
        expect(response.body.title).to.eql("SDLC")
        expect(response.body.body).to.eql("Software Development Life Cycle")
        expect(response.status).to.eql(201)
    })
    it("Get data article", async ()=>{ //test case 2
        
        const response = await request
        // .get('https://jsonplaceholder.typicode.com/posts');
        // expect(response.status).to.eql(200)
        // expect(response.id).to.be.an(2);
    
        // Add additional assertions as needed based on the API response structure
        // For example:
        // expect(response.data.name).to.equal('John Doe');
        // expect(response.data.age).to.be.at.least(18);
      });
})