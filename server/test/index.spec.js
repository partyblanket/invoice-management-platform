const {expect} = require('chai')
const request = require('supertest')

const {app} = require('../index')
const db = require('../db')

// describe('API intregration tests', () => {
//   describe('#POST /api/printinvoicedocx', () => {
//     return it('should return json object', () => {
//       request(app)
//         .post('/api/printinvoicedocx')
//         .then(res => {
//           expect(res.statusCode).toBe(200);
//         })
//     })
//   })
// })

describe('API intregration tests', () => {
  describe('#GET /api/isloggedin', () => {

    before((done) => {
      db.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
  
    after((done) => {      
      db.disconnect()
        .then(() => {
        
          done()
        })
        .catch((err) => done(err));
    })

    it('should return success false object when no passport', (done) => {
      
      request(app)
        .get('/api/isloggedin')
        .then((res) => {
          req = null
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('success').to.be.false
          done()
        })
        .catch(err => done(err))
    })
// https://scotch.io/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs
    it('should success return user object when passport on session', (done) => {
      
      request(app)
        .get('/api/isloggedin')
        .then((res) => {
          req = {session: {passport: {}}}
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.not.have.property('success')
          done()
        })
        .catch(err => done(err))
    })
    
  })
})





// test('Request to /home is successful', () => {
//   return request(app).post('/api/printinvoicedocx').then(res => {
//       expect(res.statusCode).toBe(200);
//       expect(res.headers['content-type']).toContain('text/html');
//   });
// });