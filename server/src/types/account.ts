export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type AdminUser = {
  id: string;
  username: string;
  name: string;
  role: string;
  permission: string;
};

export type Role = "customer" | "guest";
