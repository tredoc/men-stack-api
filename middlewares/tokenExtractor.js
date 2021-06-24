const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    const [, token] = authorization.split(' ')

    req.token = token
    next()
}

module.exports = tokenExtractor