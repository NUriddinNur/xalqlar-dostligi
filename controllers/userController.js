import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import models from '../models/models.js'
import generateJwt from '../utils/generateJwt.js'


class UserController {
    async registration (req, res, next) {
        const {username, password, phone, role} = req.body
        const hashPassword = await bcrypt.hash(password, 2)

        let user = await models.User.findOne({where: {username}})

        if(user) {
            return next(ApiError.badRequest('Foydalanuvchi allaqachon mavjud'))
        }

        user = await (await models.User.create({username, phone, role, password: hashPassword})).toJSON()
        user.token = generateJwt(user.id, user.role)
        delete user.password
        delete user.role
        return res.status(200).json({message: "Foydalanuvchi muvafaiyatli ro'yhatdan o'tdi!", status: 200, user})
    }


    async login(req, res, next) {
        const {username, password} = req.body
        const user = await models.User.findOne({where: {username}})
        
        if(!user) {
            return next(ApiError.badRequest("Foydalanuvchi topilmadi !"))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword) {
            return next(ApiError.badRequest("Parol noto'g'ri kiritildi !"))
        }

        const token = generateJwt(user.id, user.role)
        return res.status(200).json({token, status: 200, message: "Foydalunivchi sahifasiga muvafaqiyatli kirildi !"})
    }

    async loginAdmin(req, res, next) {
        const {username, password} = req.body
        const user = await models.User.findOne({where: {username, role: 'admin'}})
        
        if(!user) {
            return next(ApiError.badRequest("Foydalanuvchi topilmadi !"))
        }
        const comparePassword = bcrypt.compareSync(password, user.password)

        if(!comparePassword) {
            return next(ApiError.badRequest("Parol noto'g'ri kiritildi !"))
        }

        const token = generateJwt(user.id, user.role)
        return res.status(200).json({token, status: 200, message: "Foydalunivchi sahifasiga muvafaqiyatli kirildi !"})
    }
   
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.role)
        return res.status(200).json({ status: 200, token})
    }
}

export default new UserController()