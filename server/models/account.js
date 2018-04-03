import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  password: String
}); 

// password Hash화
Account.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// password 비교용
Account.methods.validateHash = function(password) {
  return  bcrypt.compareSync(password, this.password);
};

export default mongoose.model('account', Account);