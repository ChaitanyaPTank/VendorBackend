export const errorResponse = async (
  req, res,
  message = 'Something went wrong.',
  data = {},
  code = 500,
) => {
  return res.status(code).send({ message });
};

export const successResponse = async (
  req, res,
  data = {},
  message = 'Success!',
  code = 200,
) => {
  return res.status(code).send({ data, message });
};