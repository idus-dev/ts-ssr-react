// can use this instead
// https://github.com/davidbanham/express-async-errors#readme

const asyncHandler = (handler: any) => async (
  req: any,
  res: any,
  next: any
) => {
  try {
    await handler(req, res);
  } catch (exception) {
    next(exception);
  }
};

export default asyncHandler;
