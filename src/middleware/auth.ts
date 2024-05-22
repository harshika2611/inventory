import { PassportStatic } from 'passport';
import connection from '../config/connection';
import { logger, logError } from '../logs';
import { Request } from 'express';
import { StrategyOptions, Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
const { SECRET_KEY } = process.env;
let cookieExtractor = function (req: Request): string {
  return req.cookies?.token;
};

interface payload extends JwtPayload {
  id: number | undefined;
  roleId: number | undefined;
  storageId: number | undefined;
  dp: File;
}

interface result extends RowDataPacket {
  id: number;
  role_id: number;
}

type DoneCallback = (err: any, user?: Express.User | false | null) => void;

const auth: DoneCallback = (passport: PassportStatic) => {
  const opt: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: SECRET_KEY || '',
  };
  passport.use(
    new Strategy(opt, async (payload: payload, done) => {
      try {
        const result = await connection.execute<result[]>(
          'select id,role_id from users where id=?',
          [payload.id]
        );
        if (result.length > 0) {
          return done(payload);
        }
        return done(false);
      } catch (error) {
        logError(error);
      }
    })
  );
};

export { auth, cookieExtractor };
