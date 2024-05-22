import { RowDataPacket } from 'mysql2';

export interface IUser extends RowDataPacket {
  city_id: number;
  city_name: string;
}
export interface Store extends RowDataPacket {
  id: number;
  name: string;
}
export interface Manager {
  firstname: string;
  lastname: string;
  email: string;
  state: number;
  place: number;
}
export interface IManager extends RowDataPacket {
  email?: string;
}
interface UpdateManager {
  firstname: string;
  lastname: string;
  state: string;
  place: string;
  id: number;
}
