import employeeRoutes from './employee/routes/employee-routes';
import cafeRoutes from './cafe/routes/cafe-routes';
import healthRoutes from './health/health-routes';

export default (): any => {
  return [employeeRoutes(), cafeRoutes(), healthRoutes()];
};
