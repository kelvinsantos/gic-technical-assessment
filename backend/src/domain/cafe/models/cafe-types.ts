export interface EmployeeCafeRel {
  id: string;
}

export interface CafeRequest {
  name: string;
  description: string;
  logo?: string;
  location: string;
}

export interface Cafe extends CafeRequest {
  id: string;
}

export interface CafeFilter {
  location?: any;
}
