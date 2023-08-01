const validateJWT = (req, res, next) => {
  console.log('Middleware works *******');
  next();
};

module.exports = {
  validateJWT
}
