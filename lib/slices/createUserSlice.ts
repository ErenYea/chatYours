import { StateCreator } from "zustand";

export interface User {
  name?: string | null;
  image?: string | null;
  uid: string;
  email: string;
}

export interface UserSlice {
  user: User | null;
  accounttype: string | null;
  fetchUser: () => object | null;
  fetchAccountType: () => string | null;
  setUser: (user: User) => void;
  setAccoutType: (accounttype: string) => void;
  removeUser: () => void;
  setImage: (image: string) => void;
  setName: (name: string) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  user: null,
  accounttype: null,
  fetchUser: () => {
    return get().user;
  },
  fetchAccountType: () => {
    return get().accounttype;
  },
  setUser: (user: User | null) => {
    set({ user });
  },
  setAccoutType: (accounttype: string) => {
    set({ accounttype });
  },
  removeUser: () => {
    set({ user: null });
  },
  setImage: (image: string) => {
    set({
      user: {
        email: get().user?.email!,
        image: image,
        uid: get().user?.uid!,
        name: get().user?.name,
      },
    });
  },
  setName: (name: string) => {
    set({
      user: {
        email: get().user?.email!,
        image: get().user?.image!,
        uid: get().user?.uid!,
        name: name,
      },
    });
  },
});
