const User = require('../models/User');

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    // Create a new user object with the data from the request body
    const newUser = new User(req.body);
    // Save the new user to the database
    await newUser.save();
    // Respond with status 201 (Created) and the newly created user object
    res.status(201).json(newUser);
  } catch (error) {
    // If there's an error, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    // Respond with status 200 (OK) and the array of user objects
    res.status(200).json(users);
  } catch (error) {
    // If there's an error, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get a user by ID
exports.getUserById = async (req, res) => {
  try {
    // Find a user by their ID from the request parameters
    const user = await User.findById(req.params.id);
    // If user not found, respond with status 404 (Not Found) and a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Respond with status 200 (OK) and the user object
    res.status(200).json(user);
  } catch (error) {
    // If there's an error, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to update a user by ID
exports.updateUser = async (req, res) => {
  try {
    // Find and update a user by their ID with the data from the request body
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // If user not found, respond with status 404 (Not Found) and a message
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Respond with status 200 (OK) and the updated user object
    res.status(200).json(updatedUser);
  } catch (error) {
    // If there's an error, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    // Find and delete a user by their ID
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    // If user not found, respond with status 404 (Not Found) and a message
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Respond with status 200 (OK) and a success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // If there's an error, respond with status 400 (Bad Request) and the error message
    res.status(400).json({ error: error.message });
  }
};
