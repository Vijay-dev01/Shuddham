import { Request, Response, NextFunction } from 'express';

// Middleware to check if user is admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
};

export { isAdmin };
