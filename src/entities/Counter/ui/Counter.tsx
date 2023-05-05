import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'
import { useCounterActions } from '../model/slice/counterSlice'
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
    const { t } = useTranslation()
    const counterValue = useCounterValue()
    const { increment, decrement } = useCounterActions()

    const handleIncrement = () => {
        increment()
    }

    const handleDecrement = () => {
        decrement()
    }

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button data-testid="increment-btn" onClick={handleIncrement}>
                {t('increment')}
            </Button>
            <Button data-testid="decrement-btn" onClick={handleDecrement}>
                {t('decrement')}
            </Button>
        </div>
    )
}
