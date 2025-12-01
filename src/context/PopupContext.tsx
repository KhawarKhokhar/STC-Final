"use client";

import React, { createContext, useContext, useState } from "react";

type PopupState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  // optional payload for different popups
  payload?: any;
  setPayload: (p: any) => void;
};

const PopupContext = createContext<PopupState | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const value: PopupState = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((s) => !s),
    payload,
    setPayload,
  };

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
}

export function usePopup() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within PopupProvider");
  return ctx;
}

export default PopupContext;
