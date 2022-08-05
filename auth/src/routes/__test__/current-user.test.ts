import request from "supertest";
import app from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await signup()

  const response = await request(app)
    .get("/api/users/currentuser").set('Cookie',cookie)
    .send()
    .expect(200);
  console.log(response.body);
  expect(response.body.currentUser.email).toEqual(email_test)
});
it("responds with null if not authencticated", async () => {
  

  const response = await request(app)
    .get("/api/users/currentuser").set('Cookie',[''])
    .send()
    .expect(401);
  expect(response.body.errors[0].message).toEqual('Not Authorized')
});
