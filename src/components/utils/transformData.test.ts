import { TransformedData } from '../../interfaces';
import { transformData } from './transformData';

it('returns empty array for empty array input', () => {
  const result = transformData([]);
  expect(result.length).toBe(0);
});

it('returns transformed data', () => {
  const result = transformData([
    {
      data: {
        attributes: {
          carbon_g: 0,
          carbon_kg: 0,
          carbon_lb: 0,
          carbon_mt: 0,
          country: '',
          electricity_unit: 'mwh',
          electricity_value: 0,
          estimated_at: 'date',
          state: null,
        },
        id: '',
        type: '',
      },
    },
  ]);

  expect(result).toStrictEqual<TransformedData>([
    {
      carbon_g: 0,
      label: 'date',
    },
  ]);
});
