import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('Unauthorized user', () => {
        it('Main page opened', () => {
            cy.visit('/')
            cy.get(selectByTestId('MainPage')).should('exist')
        })
        it('Go to profile page and redirect to main page', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('MainPage')).should('exist')
        })
        it('Not found page opened', () => {
            cy.visit('/not-found')
            cy.get(selectByTestId('NotFoundPage')).should('exist')
        })
    })

    describe('Authorized user', () => {
        beforeEach(() => cy.login('admin', '123'))
        it('Go to profile page and redirect to main page', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('ProfilePage')).should('exist')
        })
        it('Go to articles page', () => {
            cy.visit('/articles')
            cy.get(selectByTestId('ArticlesPage')).should('exist')
        })
    })
})
