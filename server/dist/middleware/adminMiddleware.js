"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403);
        throw new Error('Not authorized as admin');
    }
};
exports.isAdmin = isAdmin;
