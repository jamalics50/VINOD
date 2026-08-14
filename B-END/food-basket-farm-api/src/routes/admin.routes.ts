import { Router } from 'express';
import { adminLogin } from '../controllers/admin.auth.controller';
import { authMiddleware } from '../middleware/auth';
import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  updateAdminVariant,
  getAdminOrders,
  updateAdminOrderStatus,
} from '../controllers/admin.crud.controller';

const router = Router();

// Public route for login
router.post('/login', adminLogin);

// Protected routes middleware
router.use(authMiddleware);

// Products
router.get('/products', getAdminProducts);
router.post('/products', createAdminProduct);
router.patch('/products/:id', updateAdminProduct);
router.delete('/products/:id', deleteAdminProduct);

// Variants
router.patch('/products/:id/variants/:variantId', updateAdminVariant);

// Orders
router.get('/orders', getAdminOrders);
router.patch('/orders/:id', updateAdminOrderStatus);

export default router;
