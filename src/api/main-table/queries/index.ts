import axios from "axios";

export const fetchTableData = async (): Promise<
  Record<string, string | number>[]
> => {
  const res = await axios.get("http://77.78.198.63:252/sifre");
  return res.data;
};

export const fetchTableColumns = async (): Promise<string[]> => {
  const res = await axios.get("http://77.78.198.63:252/kolone");
  return res.data;
};
