import { buildSelector } from '@/shared/lib/helpers/store'

export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
)
