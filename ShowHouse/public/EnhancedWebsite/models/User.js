// models/User.js - Example of OOP Model
class User {
    constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password;
    }
  
    // Method to validate user data
    validate() {
      if (!this.name || !this.email) {
        throw new Error('Name and email are required');
      }
    }
  
    // Static method for creating user
    static async create(userData) {
      const user = new User(userData.name, userData.email, userData.password);
      user.validate();
      // Additional logic for saving to database
      return await UserModel.create(user);
    }
  }
  
  // Mongoose Schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  
  const UserModel = mongoose.model('User', userSchema);
  
  module.exports = { User, UserModel };