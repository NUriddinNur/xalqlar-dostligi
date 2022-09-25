import departmentController from './departmentRouter.js'
import productRouter from './productRouter.js'
import categoryRouter from './categoryRouter.js'
import userRouter from './userRouter.js'
import { Router } from "express"
import ddos from 'ddos'

const router = Router()

const d = new ddos({
    burst: 2,
    limit: 500,
})

router.use(d.express)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/department', departmentController)
router.use('/product', productRouter)

export default router