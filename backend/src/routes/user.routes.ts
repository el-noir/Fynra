import {Router} from 'express';
import { getStatus } from '../controllers/status.controller';
import { requireAuth } from '@clerk/express';

const router = Router();

router.get("/users", requireAuth(), getStatus);

export default router;