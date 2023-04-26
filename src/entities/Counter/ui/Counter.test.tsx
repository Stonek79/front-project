import { screen } from '@testing-library/react'
import { userEvent } from '@storybook/testing-library'
import { ComponentRender } from '@/shared/lib/tests/componentRender/ComponentRender'
import { Counter } from './Counter'

const options = {
    initialState: {
        counter: {
            value: 42,
        },
    },
}

describe('Counter test', () => {
    test('get current counter', () => {
        ComponentRender(<Counter />, options);
        expect(screen.getByTestId('value-title')).toHaveTextContent('42');
    });

    test('counter increment', async () => {
        ComponentRender(<Counter />, options);
        await userEvent.click(screen.getByTestId('increment-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('43');
    });

    test('counter decrement', async () => {
        ComponentRender(<Counter />, options);
        await userEvent.click(screen.getByTestId('decrement-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('41');
    });
});
