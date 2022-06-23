import express from 'express'
const router = express.Router()
import {
  getMenu,
  getMenuById,
  deleteMenu,
  createMenu,
  updateMenu,
} from '../controllers/menuController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getMenu).post(protect, admin, createMenu)
router
  .route('/:id')
  .get(getMenuById)
  .delete(protect, admin, deleteMenu)
  .put(protect, admin, updateMenu)

export default router
