import * as userRepository from "../repositories/userRepository.js";
import {
  createdResponse,
  customErrorResponse,
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../services/responsesService.js";
import cacheService from "../config/cache.js";

export async function createUser(req, res) {
  try {
    const newUser = await userRepository.createUser(req.body);
    if (!newUser) {
      return customErrorResponse(
        res,
        422,
        "Identity Number or Account Number is already exist"
      );
    }
    return createdResponse(res, newUser);
  } catch (error) {
    return errorResponse(res);
  }
}

export async function findAllUser(req, res) {
  try {
    const users = await userRepository.getAllUsers(req);

    if (!users.data.length) {
      return notFoundResponse(res);
    }
    return successResponse(res, users);
  } catch (error) {
    return errorResponse(res);
  }
}

export async function findUserByAccountNumber(req, res) {
  try {
    const { accountNumber } = req?.params;
    const user = await userRepository.getUser({ accountNumber });
    if (!user) {
      return notFoundResponse(res);
    }
    cacheService.set(accountNumber, user);

    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res);
  }
}

export async function findUserByIdentityNumber(req, res) {
  try {
    const { identityNumber } = req?.params;
    const user = await userRepository.getUser({ identityNumber });

    if (!user) {
      return notFoundResponse(res);
    }
    cacheService.set(identityNumber, user);

    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res);
  }
}

export async function findUserById(req, res) {
  try {
    const { id } = req?.params;
    const user = await userRepository.getUserById(id);
    if (!user) {
      return notFoundResponse(res);
    }
    cacheService.set(id, user);

    return successResponse(res, user);
  } catch (error) {
    return errorResponse(res);
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req?.params;
    const result = await userRepository.updateUser(id, req.body);
    if (!result) {
      return notFoundResponse(res);
    }
    await cacheService.del(id);
    await cacheService.del(result?.accountNumber);
    await cacheService.del(result?.identityNumber);

    return successResponse(res);
  } catch (error) {
    return errorResponse(res);
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req?.params;
    const result = await userRepository.deleteUser(id);
    if (!result) {
      return notFoundResponse(res);
    }
    cacheService.del(id);
    cacheService.del(result?.identityNumber);
    cacheService.del(result?.accountNumber);

    return successResponse(res);
  } catch (error) {
    return errorResponse(res);
  }
}
