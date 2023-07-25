// import { createSelector } from '@reduxjs/toolkit';
// import { getCounter } from '../getCounter/getCounter';
// import { CounterSchema } from '../../types/counterSchema';

// реселект
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: CounterSchema) => counter.value,
// );

import { buildSelector } from '@/shared/lib/store';

// 13_18
export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
);
