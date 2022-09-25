import { Router } from "express"
import departmentController from '../controllers/departmentController.js'
import checkRole from "../middleware/checkRoleMiddleware.js"

const router = Router()


router.post('/', checkRole("admin"), departmentController.create)
router.get('/',  departmentController.getAll)
router.put('/', checkRole("admin"), departmentController.update)
router.delete('/:id', checkRole("admin"), departmentController.delete)
router.get('/:id', departmentController.getOne)

export default router