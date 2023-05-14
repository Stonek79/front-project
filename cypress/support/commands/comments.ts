export const addComment = (comment: string) => {
    cy.getByTestId('AddCommentForm.Input').type(comment)
    cy.getByTestId('AddCommentForm.Send').click()
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
           addComment(comment: string): Chainable<void>
        }
    }
}
