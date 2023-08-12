import { format as dateFnsFormat } from "date-fns";

export const dateFormat = (date: Date, format = "dd/MM/yyyy") =>
  dateFnsFormat(date, format);

export const currencyFormat = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
