import jwt from 'jsonwebtoken'

export default (role, user) => {
    return (req, res, next) => {
        if(req.method === "OPTIONS"){
            next()
        }
        try {
            const token = req.headers.token
            if(!token) {
                return res.status(401).json({status: 401, message: "Ro'yxatdan o'tilmagan!"})    
            }
            const verify = jwt.verify(token, process.env.SECRET_KEY)
            if(verify.role !== role) {
                return res.status(403).json({status: 403, message: "Ruxsat yo'q"})
            }
            req.user = verify
            next()
        } catch(e) {
            return res.status(401).json({status: 401, message: "Ro'yxatgan o'tilmagan!"})
        }
    }
}

