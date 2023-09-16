export interface EmployeeCafe {
  id: string;
  name: string;
  start_date: Date;
}

export interface CreateEmployeeRequest {
  id: string;
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  cafe: EmployeeCafe;
}

export interface UpdateEmployeeRequest {
  name: string;
  email_address: string;
  phone_number: string;
  gender: string;
  cafe: EmployeeCafe;
}

export interface EmployeeFilter {
  cafe?: any;
}
