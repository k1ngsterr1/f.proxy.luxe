import { create } from "zustand";

interface PopupState {
  openPopups: Record<string, boolean>; // Object where key is popup ID and value is whether it's open
  popupParams: Record<string, Record<string, any>>; // Object to store parameters for each popup
  openPopup: (id: string, params?: Record<string, any>) => void;
  closePopup: (id: string) => void;
  togglePopup: (id: string) => void;
  getParams: (id: string) => Record<string, any> | undefined;
}

export const usePopupStore = create<PopupState>((set, get) => ({
  openPopups: {},
  popupParams: {},

  openPopup: (id, params = {}) =>
    set((state) => ({
      openPopups: { ...state.openPopups, [id]: true },
      popupParams: { ...state.popupParams, [id]: params },
    })),

  closePopup: (id) =>
    set((state) => ({
      openPopups: { ...state.openPopups, [id]: false },
    })),

  togglePopup: (id) =>
    set((state) => ({
      openPopups: { ...state.openPopups, [id]: !state.openPopups[id] },
    })),

  getParams: (id) => get().popupParams[id],
}));
