interface Sessions {
  lang: string;
  loginId: string;
  orgId: number;
  userId: number;
}
export interface InitPayload {
  appVersion: number;
  session: Sessions;
}
