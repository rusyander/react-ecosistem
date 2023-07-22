import { UserRoles } from 'shared/types/initType';

export interface SettingsModalSchema {
  isLoading: boolean;
  error: string | undefined;

  login: string;
  password: string;
  newPass: string;
  confirmPassword: string;

  language: UserRoles | undefined;
  role: UserRoles | undefined;
}
