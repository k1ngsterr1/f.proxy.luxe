import { create } from "zustand";

interface PopupState {
  openPopups: Record<string, boolean>; // Объект, где ключ — ID модалки, а значение — открыта она или нет
  openPopup: (id: string) => void;
  closePopup: (id: string) => void;
  togglePopup: (id: string) => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  openPopups: {},

  openPopup: (id) =>
    set((state) => ({
      openPopups: { ...state.openPopups, [id]: true },
    })),

  closePopup: (id) =>
    set((state) => ({
      openPopups: { ...state.openPopups, [id]: false },
    })),

  togglePopup: (id) =>
    set((state) => ({
      openPopups: { ...state.openPopups, [id]: !state.openPopups[id] },
    })),
}));
