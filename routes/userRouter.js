import { Router } from "express"
const router = Router()
import userController  from '../controllers/userController.js'
import authMiddlewares from '../middleware/authMiddleware.js'


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/login/admin', userController.loginAdmin)
router.get('/auth', authMiddlewares, userController.check)

export default router