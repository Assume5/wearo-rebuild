export interface UserContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export type IUser = {
  isLogin: boolean;
  checked: boolean;
  firstName?: string;
};
