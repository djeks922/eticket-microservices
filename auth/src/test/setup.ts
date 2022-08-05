import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest';
import app from '../app'

declare global {
    var signup: () => Promise<string[]>;
    var password_test: string;
    var email_test: string
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_KEY = 'ASDASD'
    
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections){
        await collection.deleteMany({})
    }
});

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.close()
})

global.email_test = 'djeks922@test.com'
global.password_test = 'password'

global.signup = async (): Promise<any> => {
    const email = email_test
    const password = password_test

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,password
        })
        expect(201)

    const cookie = response.get('Set-Cookie')    

    return cookie    
}
