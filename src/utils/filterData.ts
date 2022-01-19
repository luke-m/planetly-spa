import { UsageEntries } from '../interfaces';

export const filterData = (usageEntries: UsageEntries, country?: string) => {
  if (country) {
    return usageEntries.filter((entry) => {
      if (entry.data.attributes.country === country.toLowerCase()) {
        return entry;
      }
    });
  }
  return usageEntries;
};
