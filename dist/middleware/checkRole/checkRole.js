"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkRole(req, res, next) {
    const roleId = req.user.roleId;
    // console.log(roleId);
    if (roleId === 4) {
        next();
    }
    else {
        res.redirect('/dashboard');
    }
}
exports.default = checkRole;
