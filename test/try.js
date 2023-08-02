const expect = require('chai').expect
const should = require('chai').should()
const CError = require('../errors/customeError');
const { isAuth } = require('../permissions/main');
const { generateToken } = require('../controllers/helpers/token');
const { set } = require('lodash');


set(process, 'env.JWT_SECRET', 'weiroqirqwijrqwro34')


describe('permissions', ()=>{
    describe('isAuth middleware', ()=>{
        it('token not provided should throw error', async()=> {
            const req = {
                header: (key) => {
                    return null;
                }
            }
            let err;
        
            try {
                await isAuth(req, {}, ()=> {})
            } catch (error) {
                err = error;
            }
        
            err.should.have.instanceOf(CError);
            const statusCode = err.getStatusCode();
            const message = err.getMessage();
            statusCode.should.equal(400);
            message.should.equal('token is not provided');
            
        });
        
        
        it('should throw error with expired token', async()=>{ 
            const req = {
                header: (key) => {
                    const headers = { Authorization: 'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzgxYmIxMmMzMTUzMjUwMDlhZTg1OCIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE2OTA4MzU5MDcsImV4cCI6MTY5MDgzOTUwN30.IudeUxKFV7anI4cJCPC3kbiIdAX65U5rbbOeaczant4'}
                    return headers[key];
                }
            }
        
            let err;
            try {
                await isAuth(req, {}, ()=>{});
            } catch (error) {
                err = error;
            }
        
            err.should.have.instanceOf(CError);
            const statusCode = err.getStatusCode();
            statusCode.should.equal(401);
        });



        it('after pass middleware should req have user', async()=>{ 
    
            const data = {id: 1, email: 'test@test.com'};
            const token = await generateToken(data);
            const req = {
                header: (key) => {
                    const headers = { Authorization: 'token '+ token}
                    return headers[key];
                }
            }
        
            let err;
            try {
                await isAuth(req, {}, ()=>{});
            } catch (error) {
                err = error;
            }
        
            expect(err).to.be.a('undefined');

            const id = req.user.id;
            const email = req.user.email;
            id.should.equal(data.id);
            email.should.equal(data.email);
        })
    
    })

})