function index(req, res, next) {
    res.status(200).json({
        message: 'Hello World!'
    });
}

function joko(req, res, next) {
    res.status(200).json({
        message: 'Joko Susilo Ganteng'
    });
}

module.exports = {
    index,
    joko
}