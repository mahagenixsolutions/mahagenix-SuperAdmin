import React from 'react';
import { PermissionPages } from '../../components/system/PermissionPages';

export const UnauthorizedPage: React.FC = () => {
  return <PermissionPages type="403" />;
};
export default UnauthorizedPage;
