export const successResponse = (res, data, message = "Request successful") => {
  return res.status(200).json({ success: true, message, data });
};

export const createdResponse = (
  res,
  data,
  message = "Resource created successfully"
) => {
  return res.status(201).json({ success: true, message, data });
};

export const errorResponse = (
  res,
  statusCode = 500,
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({ success: false, message });
};

export const notFoundResponse = (
  res,
  statusCode = 404,
  message = "Data not found"
) => {
  return res.status(statusCode).json({ success: false, message });
};

export const unauthorizedResponse = (res) => {
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const customErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ success: false, message });
};
