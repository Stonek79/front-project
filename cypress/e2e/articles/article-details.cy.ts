let articleId: string

describe('Article details page', () => {
    beforeEach(() => {
        cy.login()
        cy.createArticle().then((article) => {
            articleId = article.id
            cy.visit(`articles/${articleId}`)
        })
    })

    afterEach(() => {
        cy.log(JSON.stringify(articleId))
        cy.removeArticle(articleId)
    })

    it('Should display article details', () => {
        cy.getByTestId('ArticleDetails.body').should('exist')
    })

    it('Should display articles recommendations', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist')
    })

    it('Should add comments', () => {
        cy.getByTestId('ArticleDetails.body')
        cy.getByTestId('AddCommentForm').scrollIntoView()
        cy.addComment('test comment')
        cy.getByTestId('CommentCard.Content').should('have.length', 1)
    })

    it('Should add star rating', () => {
        cy.getByTestId('ArticleDetails.body')
        cy.getByTestId('RatingCard').scrollIntoView()
        cy.setStars(4, 'test feedback')
        cy.get('[data-selected=true]').should('have.length', 4)
    })

    it('Should add star rating (example with fixtures)', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' })
        cy.getByTestId('ArticleDetails.body')
        cy.getByTestId('RatingCard').scrollIntoView()
        cy.setStars(4, 'test feedback')
        cy.get('[data-selected=true]').should('have.length', 4)
    })
})
