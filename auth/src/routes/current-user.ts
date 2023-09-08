import express from 'express';
import { currentUser, requireAuth } from '@xyz-common/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
   res.status(201).send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
