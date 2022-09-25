import { Router } from "express"
import categoryController from '../controllers/categoryController.js'
import checkRole from "../middleware/checkRoleMiddleware.js"

const router = Router()

router.post('/', checkRole('admin'), categoryController.create)
router.get('/', categoryController.getAll)
router.put('/', checkRole('admin'), categoryController.update)
router.delete('/:id', checkRole('admin'), categoryController.delete)
router.get('/:id', categoryController.getOne)

export default router