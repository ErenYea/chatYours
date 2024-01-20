import { create } from "zustand";
import { createUserSlice, UserSlice } from "./slices/createUserSlice";
import { createStateSlice, StateSlice } from "./slices/createGlobalStateSlice";
import { persist } from "zustand/middleware";
type StoreState = UserSlice & StateSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
      ...createStateSlice(...a),
    }),
    {
      name: "user-state",
    }
  )
);
