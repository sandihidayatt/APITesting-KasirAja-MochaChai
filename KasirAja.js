const request_url = require("supertest")("https://kasir-api.belajarqa.com");
const assert = require("chai").expect;

// Scenario Pengujian Regitrasi
describe("Registation Testing", function () { 
  it("Verify Success Register", async function () { // TEST CASE
    let random_email = Math.random().toString(36).substring(7); 
    // console.log(random_email)
    const response = await request_url 
      .post("/registration")
      .send({ email: random_email + "@gmail.com", password: random_email, name: random_email }); 

    const hasil_response = response.body; 

    assert(response.body.status).to.eql('success');
    assert(response.body.message).to.eql('Toko berhasil didaftarkan');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
    
  });

  it("Verify Failed Register with Empty Body", async function () {
    let random_pass = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ });
    const hasil_response = response.body;

    assert(response.body.status).to.eql('fail');
    assert(response.status).to.eql(400);
    assert(response.body.message).to.eql('\"name\" is required');
  });

  it("Verify Failed Register with Empty Password", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ email: random_email + "@gmail.com", password: "", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);
    assert(response.body.message).to.eql('\"password\" is not allowed to be empty');
  });

  it("Verify Failed Register with Empty Email", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ email: "", password: "sandihidayat", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);
    assert(response.body.message).to.eql('\"email\" is not allowed to be empty');
  });

  it("Verify Failed Register with Invalid Email", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ email: "123", password: random_email, name: random_email });
    
    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);
    assert(response.body.message).to.eql('\"email\" must be a valid email');
  });

  it("Verify Failed Register with Invalid Password", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ email: "123", password: random_email, name: random_email });
    
    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);
    assert(response.body.message).to.eql('\"email\" must be a valid email');
  });

  it("Verify Failed Register with Email Only", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ email: random_email + "@gmail.com" });

    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);
  });

  it("Verify Failed Register with Name Only", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ name: random_email });

    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);
    // assert(response.body.message).to.eql('\"name\" is not allowed to be empty');
  });

  it("Verify Failed Register with Password Only", async function () {
    let random_password = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")
      .send({ password: random_password });

    assert(response.body.status).to.eql("fail");
    assert(response.status).to.eql(400);

  });

  it("Verify Failed Register without Body", async function () {
    let random_pass = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/registration")

    assert(response.status).to.eql(400);
  });
});

// Scenario Pengujian Login
var token = {}
describe("Login Testing", function () { 
    it("Verify Success Login", async function () { // TEST CASE
      const response = await request_url 
        .post("/authentications")
        .send({ email: "sanber@gmail.com", password: "sanber" }); 
  
      const hasil_response = response.body; 
      
      assert(response.status).to.eql(201);
      assert(response.body.status).to.eql('success');
      assert(response.body.message).to.eql('Authentication berhasil ditambahkan');
      token =response.body.data.accessToken
      // console.log (token);
    });

    it("Verify Failed Login with invalid email and invalid password", async function () { // TEST CASE
        const response = await request_url 
          .post("/authentications")
          .send({ email: "emailpalsu@gmail.com", password: "palsu" }); 
    
        const hasil_response = response.body; 
        
        assert(response.status).to.eql(401);
        assert(response.body.status).to.eql('fail');
        assert(response.body.message).to.eql("Kredensial yang Anda berikan salah");
        // token =response.body.data.accessToken
      //   console.log (token);
      });

      it("Verify Failed Login with invalid email and valid password", async function () { // TEST CASE
        const response = await request_url 
          .post("/authentications")
          .send({ email: "emailpalsu@gmail.com", password: "sanber" }); 
    
        const hasil_response = response.body; 
        
        assert(response.status).to.eql(401);
        assert(response.body.status).to.eql('fail');
        assert(response.body.message).to.eql("Kredensial yang Anda berikan salah");
        // token =response.body.data.accessToken
      //   console.log (token);
      });

      it("Verify Failed Login with valid email and invalid password", async function () { // TEST CASE
        const response = await request_url 
          .post("/authentications")
          .send({ email: "sanber@gmail.com", password: "passwordpalsu123" }); 
    
        const hasil_response = response.body; 
        
        assert(response.status).to.eql(401);
        assert(response.body.status).to.eql('fail');
        assert(response.body.message).to.eql("Kredensial yang Anda berikan salah");
        // token =response.body.data.accessToken
      //   console.log (token);
      });

      it("Verify Failed Login with empty email and valid password", async function () { // TEST CASE
        const response = await request_url 
          .post("/authentications")
          .send({ email: "", password: "sanber" }); 
    
        const hasil_response = response.body; 
        
        assert(response.status).to.eql(400);
        assert(response.body.status).to.eql('fail');
        assert(response.body.message).to.eql('\"email\" is not allowed to be empty');
        // token =response.body.data.accessToken
      //   console.log (token);
      });

      it("Verify Failed Login with valid email and empty password", async function () { // TEST CASE
        const response = await request_url 
          .post("/authentications")
          .send({ email: "sanber@gmail.com", password: "" }); 
    
        const hasil_response = response.body; 
        
        assert(response.status).to.eql(400);
        assert(response.body.status).to.eql('fail');
        assert(response.body.message).to.eql('\"password\" is not allowed to be empty');
        // token =response.body.data.accessToken
      //   console.log (token);
      });

      it("Verify Failed Login with empty email and empty password", async function () { // TEST CASE
        const response = await request_url 
          .post("/authentications")
          .send({ email: "", password: "" }); 
    
        const hasil_response = response.body; 
        
        assert(response.status).to.eql(400);
        assert(response.body.status).to.eql('fail');
        assert(response.body.message).to.eql('\"email\" is not allowed to be empty');
        // token =response.body.data.accessToken
      //   console.log (token);
      });

      it("Verify Failed Login with empty Body", async function () { 
        const response = await request_url 
          .post("/authentications")
          .send({ });
    
          assert(response.status).to.eql(400);
          assert(response.body.status).to.eql('fail');
        //   assert(response.body.message).to.eql('\"value\" must be of type object');
      });
});


// Scenario Pengujian User
var userID = {}
  describe("Users Testing", function () { 
      it("Verify Success Create User", async function () { 
        const response = await request_url 
          .post("/users")
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "ade", email: "ade123@gmail.com", password: "ade"});
          
          assert(response.status).to.eql(201);
          userID =response.body.data.userId
          // console.log(userID);
          // console.log(response.body.data.name);
        //   assert(response.body.message).to.eql('\"value\" must be of type object');
      });
      it("Verify Create User with empty name, email and password", async function () { 
        const response = await request_url 
          .post("/users")
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "", email: "", password: ""});

          assert(response.status).to.eql(400);
          assert(response.body.status).to.eql('fail');
          // assert(response.body.message).to.eql('name\" is not allowed to be empty');
      });
      it("Verify Create User with empty name", async function () { 
        const response = await request_url 
          .post("/users")
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "", email: "udin@gmail.com", password: "12345"});

          assert(response.status).to.eql(400);
          assert(response.body.status).to.eql('fail');
          // assert(response.body.message).to.eql('name\" is not allowed to be empty');
      });
      it("Verify Create User with empty email", async function () { 
        const response = await request_url 
          .post("/users")
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "udin", email: "", password: "12345"});

          assert(response.status).to.eql(400);
          assert(response.body.status).to.eql('fail');
          // assert(response.body.message).to.eql('name\" is not allowed to be empty');
      });
      it("Verify Create User with empty passwod", async function () { 
        const response = await request_url 
          .post("/users")
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "udin", email: "udinn@gmail.com", password: ""});

          assert(response.status).to.eql(400);
          assert(response.body.status).to.eql('fail');
          // assert(response.body.message).to.eql('name\" is not allowed to be empty');
      });
      it("Verify Create User with invalid email", async function () { 
        const response = await request_url 
          .post("/users")
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "udin", email: "udinngmail.com", password: ""});

          assert(response.status).to.eql(400);
          assert(response.body.status).to.eql('fail');
          // assert(response.body.message).to.eql('name\" is not allowed to be empty');
      });
      it("Verify Success Update User", async function () { 
        const response = await request_url 
          .put(`/users/${userID}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "sandi", email: "sandisandi@gmail.com", password: "zxcv123"});
            
          assert(response.body.status).to.eql('success');
          assert(response.status).to.eql(200);
      });

      it("Verify Update User with invalid email", async function () { 
        const response = await request_url 
          .put(`/users/${userID}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "sandi", email: "sandisandi@gmailcom", password: "zxcv123"});
            
          assert(response.body.status).to.eql('fail');
          assert(response.status).to.eql(400);
      });

      it("Verify Update User with empty email", async function () { 
        const response = await request_url 
          .put(`/users/${userID}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ name: "sandi", email: "", password: "zxcv123"});
            
          assert(response.body.status).to.eql('fail');
          assert(response.status).to.eql(400);
      });

      it("Verify Success Delete User", async function () { 
        const response = await request_url 
          .delete(`/users/${userID}`)
          .set('Authorization', `Bearer ${token}`)
      
          assert(response.body.status).to.eql('success');
          assert(response.status).to.eql(200);
      });
        
});
