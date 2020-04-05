const index = async (req, res, next) => {
  await res.status(200).json({
    message: "Hello World!"
  });
};

const joko = async (req, res, next) => {
  await res.status(200).json({
    message: "Joko Susilo Ganteng"
  });
};

module.exports = {
  index,
  joko
}