import { fireEvent, screen } from '@testing-library/react'
import { SidebarLayout } from 'widgets/Sidebar'
import { renderWithTranslalions } from 'shared/lib/tests/renderWithTranslalions/renderWithTranslalions'

describe('SidebarLayout test', () => {
    test('SidebarLayout render', () => {
        renderWithTranslalions(<SidebarLayout />)
        expect(screen.getByTestId('sidebarLayout')).toBeInTheDocument()
        screen.debug()
    })

    test('toggle SidebarLayout', () => {
        renderWithTranslalions(<SidebarLayout />)
        const toggleBtn = screen.getByTestId('sidebarLayout-toggle')
        expect(screen.getByTestId('sidebarLayout')).toHaveClass('collapsed')
        screen.debug()
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebarLayout-toggle')).not.toHaveClass('collapsed')
        screen.debug()
    })
})
