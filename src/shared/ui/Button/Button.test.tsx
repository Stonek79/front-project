import { render, screen } from '@testing-library/react'
import { Button, ButtonTheme } from './Button'

describe('Button test', () => {
    test('Button children', () => {
        render(<Button>Button text</Button>)
        expect(screen.getByText('Button text')).toBeInTheDocument()
    })

    test('Button with attributes', () => {
        render(<Button theme={ButtonTheme.CLEAR}>Button text</Button>)
        expect(screen.getByText('Button text')).toHaveClass('clear')
        screen.debug()
    })
})
