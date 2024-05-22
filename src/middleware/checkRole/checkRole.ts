import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
      roleId: number;
      storageId: number | null;
      dp: File | null;
    }
  }
}

function checkRole(req: Request, res: Response, next: NextFunction) {
  const roleId = req.user!.roleId;
  // console.log(roleId);

  if (roleId === 4) {
    next();
  } else {
    res.redirect('/dashboard');
  }
}

export default checkRole;
