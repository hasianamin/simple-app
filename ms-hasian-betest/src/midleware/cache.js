import {
  errorResponse,
  successResponse,
} from "../services/responsesService.js";
import axiosInstance from "../config/axios.js";
import cacheService from "../config/cache.js";

export async function cacheUser(req, res, next) {
  try {
    const { id, accountNumber, identityNumber } = req?.params;
    let params = "";
    if (id) params = id;
    if (accountNumber) params = accountNumber;
    if (identityNumber) params = identityNumber;

    const cacheUser = await cacheService?.get(params);

    if (cacheUser) {
      return successResponse(res, cacheUser);
    }

    next();
  } catch (error) {
    return errorResponse(res);
  }
}
