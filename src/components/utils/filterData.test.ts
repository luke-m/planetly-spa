import { UsageEntries } from '../../interfaces';
import { filterData } from './filterData';

it('returns empty array when usageEntries is empty and country undefined', () => {
  const result = filterData([], undefined);
  expect(result.length).toBe(0);
});

it('returns empty array when usageEntries is empty and country defined', () => {
  const result = filterData([], 'us');
  expect(result.length).toBe(0);
});

it('returns unfiltered array when usageEntries is filled and country undefined', () => {
  const unfiltered: UsageEntries = [
    {
      data: {
        attributes: {
          carbon_g: 0,
          estimated_at: 'now',
          country: 'dk',
        },
      },
    },
    {
      data: {
        attributes: {
          carbon_g: 1,
          estimated_at: 'later',
          country: 'ee',
        },
      },
    },
  ];

  const result = filterData(unfiltered, undefined);

  expect(result).toStrictEqual(unfiltered);
});

it('returns filtered array when usageEntries is filled and country defined', () => {
  const unfiltered: UsageEntries = [
    {
      data: {
        attributes: {
          carbon_g: 0,
          estimated_at: 'now',
          country: 'dk',
        },
      },
    },
    {
      data: {
        attributes: {
          carbon_g: 1,
          estimated_at: 'later',
          country: 'ee',
        },
      },
    },
  ];

  const result = filterData(unfiltered, 'ee');

  expect(result).not.toHaveProperty('data.attributes.country', 'dk');
});

