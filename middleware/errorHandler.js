const handle404Error = (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
};

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = { handle404Error, handleErrors };
