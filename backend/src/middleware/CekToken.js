import jwt from 'jsonwebtoken'

const cekToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.TOKEN_JWT, (error, decoded) => {
            if (error) {
                return res.status(400).json({
                    message: error.message,
                    loggedIn: false
                })
            } else {
                res.locals.jwt = decoded;
                next()
            }
        })
    }else{
        return res.status(401).json({
            message: 'Unauthorized',
            loggedIn: false
        })
    }
}

export default cekToken