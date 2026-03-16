import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate JWT tokens
 * @param {string} requiredRole - The required role ('doner' or 'helping_house')
 * @returns {Function} Express middleware function
 */
export const authenticateToken = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1]; 

      if (!token) {
        return res.status(401).json({
          error: "Access token required",
          message: "Please provide a valid JWT token in Authorization header",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if token has required role
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({
          error: "Insufficient permissions",
          message: `This endpoint requires ${requiredRole} role`,
        });
      }

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          error: "Token expired",
          message: "Your session has expired. Please sign in again.",
        });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          error: "Invalid token",
          message: "The provided token is invalid.",
        });
      }

      console.error("Authentication error:", error);
      return res.status(500).json({
        error: "Authentication failed",
        message: "An error occurred during authentication.",
      });
    }
  };
};

/**
 * Middleware specifically for helping house authentication
 */
export const authenticateHelpingHouse = authenticateToken("helping_house");

/**
 * Middleware specifically for doner authentication
 */
export const authenticateDoner = authenticateToken("doner");

/**
 * Middleware for either role (flexible authentication)
 */
export const authenticateAny = authenticateToken();
