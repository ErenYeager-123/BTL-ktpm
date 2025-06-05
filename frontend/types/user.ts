export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this would never be exposed to the client
  isAdmin: boolean;
}