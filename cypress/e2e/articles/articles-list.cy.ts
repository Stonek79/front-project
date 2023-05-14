describe('Articles list tests', () => {
    // TODO: Add tests for search
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles')
        })
    })
    it('Should articles loaded', () => {
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 0)
    })

    it('Should articles loaded (example on fixtures)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles-list.json' })
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 0)
    })
})
