exports.index = (req, res, next) => {
    res.status(200).send('Hello World!');
}

exports.joko = (req, res, next) => {
    res.status(200).json({ message: 'Joko Susilo Ganteng' });
}
