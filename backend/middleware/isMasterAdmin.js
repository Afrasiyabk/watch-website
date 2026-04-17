import jwt from 'jsonwebtoken';

export const isMasterAdmin = (req, res, next) => {
    // Get token from header (Bearer <token>)
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(403).json({ success: false, message: "Access Denied: No Token Provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 1. Security Check
        if (!decoded.isAdmin) {
            return res.status(403).json({success: false, message: "Unauthorized: Admin access only" });
        }

        // 2. ATTACH THE DATA (This is how you "get" the ID later)
        req.user = decoded; 

        next();
    } catch (error) {
        res.status(401).json({success: false, message: "Session expired or invalid token" });
    }
};