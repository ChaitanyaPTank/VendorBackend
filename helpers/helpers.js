export const errorResponse = async (
  req, res,
  data = { message: 'Something went wrong.', data: {} },
  code = 500,
) => {
  return res.status(code).send(data);
};

export const successResponse = async (
  req, res,
  data = { message: 'Succcess.', data: {} },
  code = 200,
) => {
  return res.status(code).send(data);
};