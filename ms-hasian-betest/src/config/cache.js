import axiosInstance from "./axios.js";

const cacheService = {
  get: async (key) => {
    const cacheUser = await axiosInstance.get(`/api/cache/${key}`);
    return cacheUser?.data?.data;
  },

  set: async (key, value) => {
    return await axiosInstance.post(`/api/cache/${key}`, {
      value,
    });
  },

  del: async (key) => {
    return await axiosInstance.delete(`/api/cache/${key}`);
  },
};

export default cacheService;
