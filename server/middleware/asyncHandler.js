// server/src/middleware/asyncHandler.js
/**
 * Async handler wrapper to catch errors in async route handlers
 * Eliminates need for try-catch blocks in every route
 * @param {Function} fn - Async route handler function
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
