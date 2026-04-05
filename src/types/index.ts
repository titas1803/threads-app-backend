export type CreateUserInput = Omit<User, "id"> & { password: string };

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
};
