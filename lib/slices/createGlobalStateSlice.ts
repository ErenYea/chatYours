import { StateCreator } from "zustand";

export interface State {
  notification: string;
  shownotification: boolean;
  shownotificationcompo: boolean;
  showheader: boolean;
  messagenoti: string;
  openModal: boolean;
  messageModal: string;
}

export interface StateSlice {
  notification: string;
  shownotification: boolean;
  shownotificationcompo: boolean;
  showheader: boolean;
  messagenoti: string;
  openModal: boolean;
  messageModal: string;
  fetchModal: () => object;
  fetchNotification: () => object;
  fetchHeader: () => object;
  setNotification: (notification: string) => void;
  setShownotification: (shownotification: boolean) => void;
  setShownotificationcompo: (shownotificationcompo: boolean) => void;
  setShowheader: (showheader: boolean) => void;
  setMessagenoti: (messagenoti: string) => void;
  setOpenModal: (openModal: boolean) => void;
  setMessageModal: (messageModal: string) => void;
}

export const createStateSlice: StateCreator<StateSlice> = (set, get) => ({
  notification: "",
  shownotification: false,
  shownotificationcompo: false,
  showheader: false,
  messagenoti: "Nothing to show",
  openModal: false,
  messageModal: "",
  fetchModal: () => {
    return { openModal: get().openModal, messageModal: get().messageModal };
  },
  fetchNotification: () => {
    return {
      notification: get().notification,
      shownotification: get().shownotification,
      shownotificationcompo: get().shownotificationcompo,
    };
  },
  fetchHeader: () => {
    return { showheader: get().showheader };
  },
  setNotification: (notification: string) => {
    set({ notification });
  },
  setShownotification: (shownotification: boolean) => {
    set({ shownotification });
  },
  setShownotificationcompo: (shownotificationcompo: boolean) => {
    set({ shownotificationcompo });
  },
  setShowheader: (showheader: boolean) => {
    set({ showheader });
  },
  setMessagenoti: (messagenoti: string) => {
    set({ messagenoti });
  },
  setOpenModal: (openModal: boolean) => {
    set({ openModal });
  },
  setMessageModal: (messageModal: string) => {
    set({ messageModal });
  },
});
