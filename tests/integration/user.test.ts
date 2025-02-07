// import { expect } from 'chai';
// import request from 'supertest';
// import mongoose from 'mongoose';

// import app from '../../src/index';
// import { clear } from 'winston';

// describe('User APIs Test', () => {
//   before((done) => {
//     const clearCollections = () => {
//       for (const collection in mongoose.connection.collections) {
//         mongoose.connection.collections[collection].deleteOne(() => {});
//       }
//     };

//     const mongooseConnect = async () => {
//       await mongoose.connect(process.env.DATABASE_TEST);
//       clearCollections();
//     };

//     if (mongoose.connection.readyState === 0) {
//       mongooseConnect();
//     } else {
//       clearCollections();
//     }

//     done();
//   });

//   describe('GET /users', () => {
//     it('should return empty array', (done) => {
//       request(app.getApp())
//         .get('/api/v1/users')
//         .end((err, res) => {
//           expect(res.statusCode).to.be.equal(200);
//           expect(res.body.data).to.be.an('array');

//           done();
//         });
//     });
//   });
// });

// filepath: /Volumes/MacOs Disk 1/Fundoo_Notes_App/tests/unit/user.test.ts
import { expect } from 'chai';
import { findUserByEmail, updateUserPassword } from '../../src/services/user.service';
import { User } from '../../src/models/user.model';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('User Service', () => {
  before((done) => {
    mongoose.connect(process.env.DATABASE_TEST, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });
  });

  it('should find a user by email', async () => {
    const email = 'test@example.com';
    const user = new User({ email, password: 'password123' });
    await user.save();

    const foundUser = await findUserByEmail(email);
    expect(foundUser).to.have.property('email', email);
  });

  it('should update user password', async () => {
    const email = 'test@example.com';
    const newPassword = 'newPassword123';
    const user = new User({ email, password: 'password123' });
    await user.save();

    await updateUserPassword(email, newPassword);
    const updatedUser = await findUserByEmail(email);
    expect(updatedUser).to.have.property('password', newPassword); // Ensure password is hashed in real tests
  });
});