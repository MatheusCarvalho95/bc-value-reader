import axios from "axios";

interface IValues {
  data: string;
  valor: string;
}

export interface IFilters {
  startDate: string;
  endDate: string;
}

export const values = {
  getValues: async (filters: IFilters) => {
    const response = await axios.get(
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=${filters.startDate}&dataFinal=${filters.endDate}`,
    );
    const data: IValues[] = response.data;

    return await processValues(data);
  },
};
async function processValues(values: IValues[]) {
  let total = 0;
  for (const value of values) {
    total += parseFloat(value.valor);
  }

  return total;
}
