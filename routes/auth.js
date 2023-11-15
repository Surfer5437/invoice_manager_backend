"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const dayjs = require("dayjs");
const router = new express.Router();
const { createAccessToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    
    if (!user) {
      // Handle authentication failure
      throw new UnauthorizedError("Invalid credentials");
    }

    const accessToken = createAccessToken(user);

    res.cookie("jwt", accessToken, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: dayjs().add(30, "days").toDate(),
      sameSite: 'None'
    });

    // Now that the cookie is set, send the JSON response
    res.json(user);

  } catch (err) {
    return next(err);
  }
});


/** GET /auth/logout:   { user } => { clearCookie }
 *
 * Authorization required: none
 */

router.get("/logout", async function(req,res){
  res.clearCookie('jwt');
  res.send('logged out');
});

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const newUser = await User.register({ ...req.body, is_admin: false });
    const accessToken = createAccessToken(newUser);

    
    res.cookie('jwt', accessToken, { httpOnly: true, secure: true, maxAge:86400000 });
  res.send(newUser);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;