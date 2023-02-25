import { ComponentRender } from 'shared/lib/tests/componentRender/ComponentRender'
import { screen } from '@testing-library/react'
import { userEvent } from '@storybook/testing-library'
import { Counter } from './Counter'

describe('Counter test', () => {
    test('get current counter', () => {
        ComponentRender(<Counter />, {
            initialState: {
                counter: {
                    value: 42,
                },
            },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('42');
    });

    test('counter increment', () => {
        ComponentRender(<Counter />, {
            initialState: {
                counter: {
                    value: 42,
                },
            },
        });
        userEvent.click(screen.getByTestId('increment-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('43');
    });

    test('counter decrement', () => {
        ComponentRender(<Counter />, {
            initialState: {
                counter: {
                    value: 42,
                },
            },
        });
        userEvent.click(screen.getByTestId('decrement-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('41');
    });
});
