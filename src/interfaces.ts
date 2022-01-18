export type UsageEntries = Array<UsageEntry>;

export interface UsageEntry {
  data: {
    attributes: {
      carbon_g: number;
      carbon_kg: number;
      carbon_lb: number;
      carbon_mt: number;
      country: string;
      electricity_unit: 'mwh' | 'kwh';
      electricity_value: number;
      estimated_at: string;
      state: null;
    };
    id: string;
    type: string;
  };
}

export interface TransformedDataEntry {
  carbon_g: number;
  label: string;
}

export type TransformedData = Array<TransformedDataEntry>

