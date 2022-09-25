import { Router } from "express"
import productController from '../controllers/productController.js'
import checkRole from "../middleware/checkRoleMiddleware.js"

const router = Router()


router.post('/', checkRole('admin'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', checkRole('admin'), productController.delete)
router.put('/', checkRole('admin'), productController.update)

export default router