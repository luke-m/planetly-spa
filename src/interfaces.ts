export type UsageEntries = Array<UsageEntry>;

export interface UsageEntryAttributes {
  carbon_g?: number;
  carbon_kg?: number;
  carbon_lb?: number;
  carbon_mt?: number;
  country?: string;
  electricity_unit?: 'mwh' | 'kwh';
  electricity_value?: number;
  estimated_at?: string;
  state?: null;
}

export interface UsageEntry {
  data: {
    attributes: UsageEntryAttributes;
    id?: string;
    type?: string;
  };
}

export type TransformedDataEntry = UsageEntryAttributes & { label: string };

export type TransformedData = Array<TransformedDataEntry>;
