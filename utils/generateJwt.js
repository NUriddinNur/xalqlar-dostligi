import jwt from 'jsonwebtoken'

export default (id, role) => {
    return jwt.sign(
        {id, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '12h'})
}