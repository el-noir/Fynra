import { Router } from "express";
import { requiresAuth } from "express-openid-connect";

const router = Router();

router.get("/users", requiresAuth(), (req, res)=>{
    res.send("Get all users");
    const isAuthenticated = req.oidc.isAuthenticated();
});

export default router;