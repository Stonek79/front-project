export const setStars = (stars: number, feedback: string) => {
    cy.getByTestId(`StarRating.${stars}`).click()
    cy.getByTestId('RatingCard.Input').type(feedback)
    cy.getByTestId('RatingCard.Send').click()
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            setStars(stars: number, feedback: string): Chainable<void>
        }
    }
}
