export interface TokenPayload {
  id: string;
  account: string;
  role: number;
  iat?: number;
  exp?: number;
}