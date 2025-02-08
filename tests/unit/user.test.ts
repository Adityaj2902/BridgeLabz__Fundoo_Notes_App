// import { expect } from 'chai';
// import { UserService } from '../../src/services/user.service';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// describe('User', () => {
//   before((done) => {
//     const clearCollections = () => {
//       for (const collection in mongoose.connection.collections) {
//         mongoose.connection.collections[collection].deleteOne(() => {});
//       }
//     };

//     const mongooseConnect = async () => {
//       const dbUri = process.env.DATABASE_TEST;
//       if (!dbUri) {
//         throw new Error('DATABASE_TEST environment variable is not defined');
//       }
//       await mongoose.connect(dbUri);
//       clearCollections();
//     };

//     if (mongoose.connection.readyState === 0) {
//       mongooseConnect();
//     } else {
//       clearCollections();
//     }

//     done();
//   });

//   describe('Get Users', () => {
//     it('should return empty array', async () => {
//       const result = await new UserService().getAllUsers();
//       expect(result).to.be.an('array');
//     });
//   });
// });
