import { fireEvent, screen } from '@testing-library/react'
import { ComponentRender } from '@/shared/lib/tests/componentRender/ComponentRender'
import { Sidebar } from '../../ui/Sidebar/Sidebar'

describe('Sidebar', () => {
    test('with only first param', () => {
        ComponentRender(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('test toggle', () => {
        ComponentRender(<Sidebar />)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})
