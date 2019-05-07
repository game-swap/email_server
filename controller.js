// TODO: require db

const controller = {
    post: (req, res) => {
        console.log(req.body)
        res.status(201).send('text')
    }
}

module.exports = controller;