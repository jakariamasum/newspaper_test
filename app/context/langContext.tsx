"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface LangContextProps {
  lang: string;
  setLang: (lang: string) => void;
}

const LangContext = createContext<LangContextProps | undefined>(undefined);

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};

export const LangProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState("all");

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
