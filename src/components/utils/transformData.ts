import { TransformedData, UsageEntries } from '../../interfaces';
import { format } from 'date-fns';

export const transformData = (data: UsageEntries) => {
  return data.reduce((acc: TransformedData, value) => {
    // do not mutate function params
    const temp = acc;

    const { carbon_g, carbon_kg, carbon_mt, estimated_at } = value.data.attributes;

    temp.push({
      carbon_g: carbon_g,
      carbon_kg: carbon_kg,
      carbon_mt: carbon_mt,
      label: estimated_at ? format(new Date(estimated_at), 'MM/dd') : '',
    });

    return temp;
  }, []);
};
