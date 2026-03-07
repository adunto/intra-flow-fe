export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  password?: string;
  username: string;
  role: UserRole;
  profileImage?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UserSummary = Pick<
  User,
  "id" | "email" | "username" | "profileImage" | "role"
>;
