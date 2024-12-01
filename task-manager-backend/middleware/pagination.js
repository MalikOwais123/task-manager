const paginationMiddleware = (req, res, next) => {
  // Extract page and limit from query params, and provide default values if not present
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 tasks per page

  // Calculate the skip value (for pagination)
  const skip = (page - 1) * limit;

  // Add pagination information to the request object to pass it to the route handler
  req.pagination = {
    skip,
    limit,
    page,
  };

  next(); // Call the next middleware or route handler
};

export default paginationMiddleware;
