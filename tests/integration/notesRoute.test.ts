// import { expect } from 'chai';
// import request from 'supertest';
// import app from '../../src/index'; // Adjust the import based on your project structure

// let token: string;
// let userId: string;

// describe('Notes Route Tests', () => {
//     before((done) => {
//         request(app.getApp())
//             .post('/api/v1/users/register')
//             .send({
//                 email: 'testuser@example.com',
//                 password: 'password123',
//                 name: 'Test User' // Ensure all required fields are included
//             })
//             .end((err, res) => {
//                 if (err) {
//                     console.error('Error during user registration:', err);
//                     return done(err);
//                 }
//                 expect(res.statusCode).to.be.equal(201);
//                 userId = res.body.user._id;

//                 request(app.getApp())
//                     .post('/api/v1/users/login')
//                     .send({
//                         email: 'testuser@example.com',
//                         password: 'password123'
//                     })
//                     .end((err, res) => {
//                         if (err) {
//                             console.error('Error during user login:', err);
//                             return done(err);
//                         }
//                         expect(res.statusCode).to.be.equal(200);
//                         token = res.body.token;
//                         done();
//                     });
//             });
//     });

//     describe('POST /notes', () => {
//         it('should create a new note', (done) => {
//             request(app.getApp())
//                 .post('/api/v1/notes')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send({
//                     title: 'Test Note',
//                     description: 'This is a test note',
//                     userId: userId
//                 })
//                 .end((err, res) => {
//                     if (err) {
//                         console.error('Error during note creation:', err);
//                         return done(err);
//                     }
//                     expect(res.statusCode).to.be.equal(201);
//                     expect(res.body.message).to.be.equal('Note created successfully');
//                     expect(res.body.note).to.have.property('title', 'Test Note');
//                     expect(res.body.note).to.have.property('description', 'This is a test note');
//                     expect(res.body.note).to.have.property('userId', userId);
//                     done();
//                 });
//         });
//     });
// });