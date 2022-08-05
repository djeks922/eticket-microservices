import request from 'supertest'

import app from '../../app'

it('Should return 201 on successful signup',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'djeks92@test.com',
        password: 'password'
    })
    .expect(201)
})
it('Should return 400 on unsuccessful signup(email)',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'djeks92test.com',
        password: 'password'
    })
    .expect(400)
})
it('Should return 400 on unsuccessful signup(password)',async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'djeks92@test.com',
        password: 'pa'
    })
    .expect(400)
})
it('Should return 400 on unsuccessful signup(missing email or password)',async () => {
    await  request(app)
    .post('/api/users/signup')
    .send({password: 'asdasdas'})
    .expect(400)

    await  request(app)
    .post('/api/users/signup')
    .send({email: 'asda@asda.com'})
    .expect(400)
})
it('Disallows duplicate emails',async () => {
    await  request(app)
    .post('/api/users/signup')
    .send({
        email: 'djeks922@test.com',
        password: 'password'
    })
    .expect(201)

    await  request(app)
    .post('/api/users/signup')
    .send({
        email: 'djeks922@test.com',
        password: 'password'
    })
    .expect(400)
})
it('sets cookie after successful signup',async () => {
    const response = await  request(app)
    .post('/api/users/signup')
    .send({
        email: 'djeks922@test.com',
        password: 'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})