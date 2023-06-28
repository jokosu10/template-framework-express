const index = (req, res, next) => {
  return res.status(200).json({
    status: "success",
    code: 200,
    message: "Hello World!"
  });
};

const joko = (req, res, next) => {
  return res.status(200).json({
    status: "success",
    code: 200,
    message: "Joko Susilo Ganteng"
  });
};

module.exports = {
  index,
  joko
}