const jwt = require("jsonwebtoken");

const secret =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";

const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

// usually: "Authorization: Bearer [token]" or "token: [token]"
exports.auth = (req, res, next) => {
  let tokenToVerify;

  if (req.header("Authorization")) {
    const credentials = req.header("Authorization");
    tokenToVerify = credentials;
  } else {
    return res.status(401).json({ msg: "No Authorization was found" });
  }

  return verify(tokenToVerify, (err, thisToken) => {
    if (err) return res.status(401).json({ err });
    req.token = thisToken;
    return next();
  });
};
