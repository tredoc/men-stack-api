const unknownEndpoint = (req, res, next) => {
    res.json({error: 'unknown endpoint'})
}

module.exports = unknownEndpoint