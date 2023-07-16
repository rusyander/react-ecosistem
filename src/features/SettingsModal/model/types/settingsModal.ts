export interface Language {
  code: string | number;
  name: string;
}

export interface Role {
  code: string | number;
  name: string;
}

export interface SettingsModalSchema {
  isLoading: boolean;
  error: string | undefined;

  login: string;
  password: string;
  newPass: string;
  confirmPassword: string;

  language: Language | undefined;
  role: Role | undefined;
}
