import models from '../models/models.js'
import ApiError from '../error/ApiError.js'
import fs from 'fs'
import path from 'path'


class DepartmentController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const brand = await models.Department.create({ name })
            return res.status(200).json({ message: "Bo'lim qo'shildi !", status: 200, data: brand })

        } catch (error) {
            return next(ApiError.validationError(error))
        }
    }

    async getAll(req, res) {
        const brands = await models.Department.findAll()
        return res.status(200).json({ message: "Bo'limlar !", status: 200, data: brands })
    }

    async getOne(req, res) {
        const {id} = req.params

        const department = await models.Department.findOne({
            where: {id},
            include: models.Category
        })
        return res.status(200).json({ message: "Bo'lim !", status: 200, data: department})
    }

    async update(req, res, next) {
        try {
            const { id, name } = req.body
            let department = await models.Department.findOne({ where: { id: id } })

            if (department) {
                await models.Department.update(
                    { name: name },
                    { where: { id: id } }
                )
                department = await models.Department.findOne({ where: { id: id } })
                return res.status(200).json({ message: "Bo'lim o'zgartirildi!", status: 200, data: department })
            }
            return res.status(404).json({ message: "Bunday bo'lim mavjud emas", status: 404, data: null })
        } catch (error) {
            return next(ApiError.validationError(error))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        let department = await models.Department.findOne({ where: { id: id } })

        if (department) {
            const products = await models.Product.findAll({where: {departmentId: id}, raw:true, nest: true})
            await models.Product.destroy({where: { departmentId: id }})
            await models.Category.destroy({where: {departmentId: id}})
            await models.Department.destroy({ where: { id: id }})

            for (let p of products) {
                fs.unlinkSync(path.join(process.cwd(), 'uploads', p.img))
            }
            return res.status(200).json({ message: "Bo'lim o'chirildi!", status: 200, data: department })
        }

        return res.status(404).json({ message: "Bunday bo'lim mavjud emas", status: 404, data: null })
    }
}

export default new DepartmentController()