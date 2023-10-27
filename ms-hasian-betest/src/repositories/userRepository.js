import User from "../models/user.js";
import paginateService from "../services/paginateService.js";

export async function createUser(userData) {
  try {
    const isAccountExist = await User.findOne({
      $or: [
        { identityNumber: userData?.identityNumber },
        { accountNumber: userData?.accountNumber },
      ],
    });
    if (isAccountExist) {
      return;
    }

    const newUser = new User(userData);

    return await newUser.save();
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers(req) {
  try {
    const { page = 1, limit = 10 } = req?.query;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    const paginatedData = paginateService(
      users,
      page,
      limit,
      totalUsers,
      req?.baseUrl
    );

    return paginatedData;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(userAccount) {
  try {
    const user = await User.findOne(userAccount);

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id) {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(id, userData) {
  try {
    const result = await User.findByIdAndUpdate(id, userData);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(id) {
  try {
    const result = await User.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error(error);
  }
}
