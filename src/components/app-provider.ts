import React, { useContext } from "react";

interface AppContextType {
  month: string;
  year: string;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  getStartDate: () => Date;
  getEndDate: () => Date;
}

export const AppContext = React.createContext<AppContextType>({
  month: "all",
  year: "all",
  setMonth: () => null,
  setYear: () => null,
  getStartDate: () => new Date(2000, 1, 1),
  getEndDate: () => new Date(2100, 1, 1),
});

export default function useAppContext() {
  return useContext(AppContext);
}
