import express from 'express';
import { authCheck } from "../controllers/auth.controller.js";

import {
  login,
  logout,
  signup,
  adminLogin,
} from '../controllers/auth.controller.js';


import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/admin/login', adminLogin);
router.get('/authCheck', protectRoute, authCheck);
export default router;
