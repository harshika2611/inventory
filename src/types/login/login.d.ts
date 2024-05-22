import { RowDataPacket } from 'mysql2';

export interface User {
  email: string;
  password: string;
  link: string;
  userId: number;
}

export interface IUser extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  created_at: string;
  status: number;
  role_id: number;
  expiry: string;
  storage_id: number | null;
  is_delete: number | null;
  dp: File | null;
}
export interface expireUser {
  link?: string;
  id?: string;
  otp?: number;
}
export interface forgotPass {
  new_pass: string;
  email: string;
}
