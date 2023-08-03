const expect = require('chai').expect
const CError = require('../errors/customeError');
const { getCurrentUserOrError, getUserOrError } = require('../controllers/helpers/user');
const User = require('../models/users');
const mongoose = require('mongoose')

const PRE_INFO = {};

const getUserOrErrorTests =  () => describe('get user or error', () => {
    it('user not found', async () => {
        let userId = PRE_INFO.user._id.toString();
        userId = userId.slice(0, userId.length - 1) + (userId[userId.length-1] == 'o' ? 'm' : 'o');

        let result;
        try {
            result = await getUserOrError(userId)
        } catch (error) {
            result = error;
        }
        expect(result).instanceOf(CError);
        const statusCode = result.getStatusCode();
        expect(statusCode).equals(404);
    });

    it('get found user', async () => {
        let userId = PRE_INFO.user._id.toString();

        let result;
        try {
            result = await getUserOrError(userId)
        } catch (error) {
            result = error;
        }

        expect(result).instanceOf(User);
        const resultId = result._id.toString();
        expect(resultId).equals(userId);
    });

     
})


const getCurrentUserOrErrorTests =  () => describe('get current user or error', () => {
    

    it('if user not provided in the request', async ()=>{
        req = {}

        let err;
        try {
            await getCurrentUserOrError(req)
        } catch (error) {
            err = error
        }

        expect(err).instanceOf(CError);
        const statusCode = err.getStatusCode();
        expect(statusCode).equal(401)
        
    });

    it('if user doensn\'t have id', async ()=>{
        req = {
            user: {
                email: "test@gmail.com"
            }
        }

        let err;
        try {
            await getCurrentUserOrError(req)
        } catch (error) {
            err = error
        }

        expect(err).instanceOf(CError);
        const statusCode = err.getStatusCode();
        expect(statusCode).equal(409)
        
    });


    it('check if user returned is correct', async ()=>{

        req = {
            user: {
                id: PRE_INFO.user._id,
                email: PRE_INFO.user.email
            }
        }

        let err;
        let result;
        try {
            result = await getCurrentUserOrError(req)
        } catch (error) {
            err = error
        }
        // console.log(result);
        // console.log('.......................')
        expect(err).equal(undefined);
        expect(result).not.equal(undefined);
        expect(result.id).equal(PRE_INFO.user._id.toString());

        
    });
    
})






const userTests = () => describe('user helpers', ()=> {
    getUserOrErrorTests();
    getCurrentUserOrErrorTests();
});
describe('test controller helpers', ()=> {
    before(async()=> {
        await mongoose.connect('mongodb://127.0.0.1:27017/test_blogs');
        
        const user = await User.create({
            'email': 'test2@test.com',
            'password': '$2b$12$rBIvZpnUgd41MYkqHIxd1uHqvhwBbBAFhl.8aIPQgCMwF0CLl6cJ.',
            'username': 'test2'
        });

        PRE_INFO.user = user._doc;
    })

    userTests()
    
    after(async () => {
        await User.deleteMany({});
        await mongoose.disconnect();
    })
})