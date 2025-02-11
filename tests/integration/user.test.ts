import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import mongoose, { Types } from 'mongoose';
import app from '../../src/index';

// import { Types } from 'mongoose';



describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      const dbUri = process.env.DATABASE_TEST;
      if (!dbUri) {
        throw new Error('DATABASE_TEST environment variable is not defined');
      }
      await mongoose.connect(dbUri);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // describe('GET /users', () => {
  //   it('should return empty array', (done) => {
  //     request(app.getApp())
  //       .get('/api/v1/users')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');
  //         done();
  //       });
  //   });
  // });

  describe('POST /register', () => {
    it('should register a new user', (done) => {
      request(app.getApp())
        .post('/api/v1/users/register')
        .send({
          firstName:'Aditya',
          lastName:'Jaiswal',
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser'
        })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.message).to.be.equal('User registered successfully');
          expect(res.body.user).to.have.property('email', 'test@example.com');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should login an existing user', (done) => {
      request(app.getApp())
        .post('/api/v1/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Login successful');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should not login with incorrect credentials', (done) => {
      request(app.getApp())
        .post('/api/v1/users/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body.message).to.be.equal('Invalid credentials');
          done();
        });
    });
  });

  describe('POST /forgot-password', () => {
    it('should send a password reset token', (done) => {
      request(app.getApp())
        .post('/api/v1/users/forgot-password')
        .send({
          email: 'test@example.com'
        })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Password reset token sent to email');
          done();
        });
    });
  });

  describe('POST /reset-password', () => {
    it('should reset the password', (done) => {
      const resetToken = jwt.sign({ email: 'test@example.com' }, process.env.RESET_PASSWORD_SECRET!, { expiresIn: '1h' });
      request(app.getApp())
        .post('/api/v1/users/reset-password')
        .send({
          token: resetToken,
          newPassword: 'newpassword123'
        })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Password reset successfully');
          done();
        });
    });
  });

});


































































//   describe('createNote', () => {
//     it('should create a new note', async () => {
//         const noteData = { title: 'Test Note', content: 'This is a test note' };
//         const userId = new Types.ObjectId().toString(); // Ensure userId is a valid ObjectId string
//         const note = await noteService.createNote(noteData, userId);
//         expect(note).to.have.property('title', 'Test Note');
//         expect(note).to.have.property('content', 'This is a test note');
//         expect(note).to.have.property('userId', userId);
//     });
// });

// describe('getNotesByUserId', () => {
//   it('should get notes by user ID', async () => {
//       const userId = '12345';
//       await Note.create({ title: 'Note 1', content: 'Content 1', userId });
//       await Note.create({ title: 'Note 2', content: 'Content 2', userId });
//       const notes = await noteService.getNotesByUserId(userId);
//       expect(notes).to.be.an('array').that.has.lengthOf(2);
//   });
// });

// describe('updateNoteById', () => {
//   it('should update a note by ID', async () => {
//       const note = await Note.create({ title: 'Old Title', content: 'Old Content', userId: '12345' });
//       const updateData = { title: 'New Title', content: 'New Content' };
//       const updatedNote = await noteService.updateNoteById(note._id, updateData);
//       expect(updatedNote).to.have.property('title', 'New Title');
//       expect(updatedNote).to.have.property('content', 'New Content');
//   });
// });

// describe('deleteNoteById', () => {
//   it('should delete a note by ID', async () => {
//       const note = await Note.create({ title: 'Note to be deleted', content: 'Content', userId: '12345' });
//       await noteService.deleteNoteById(note._id);
//       const deletedNote = await Note.findById(note._id);
//       expect(deletedNote).to.be.null;
//   });
// });
// });
// });