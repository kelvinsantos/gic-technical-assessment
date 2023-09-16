import { CafeFilter, CafeRequest } from '../models/cafe-types';

export default interface CafeService {
  create(requestData: CafeRequest): Promise<any>;
  findCafeById(id: string): Promise<any>;
  findCafes(filter: CafeFilter): Promise<any>;
  updateCafeById(id: string, updateCafeRequest: CafeRequest): Promise<any>;
  deleteCafeById(id: string): Promise<any>;
}
