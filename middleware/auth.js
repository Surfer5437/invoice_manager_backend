"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  const token = req.cookies.jwt; // Retrieve JWT token from the cookie
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('jwt');
        return res.status(401).send('Unauthorized');
      }
      next();
    });
  }

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

function ensureAdmin(req, res, next) {
 
  const token = req.cookies.jwt;  // Retrieve JWT token from the cookie
  console.log(token)
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('jwt');
        return res.status(401).send('Unauthorized');
      } else if(decoded.is_admin){
        next();
      }
    });
}

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUserOrAdmin(req, res, next) {
  try {

    const token = req.cookies.jwt; // Retrieve JWT token from the cookie
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('jwt');
        return res.status(401).send('Unauthorized');
      } else if(decoded.is_admin || decoded.company_id == req.params.company_id){
        next();
      }
    });
} catch (err){
  next(err);
}
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};
