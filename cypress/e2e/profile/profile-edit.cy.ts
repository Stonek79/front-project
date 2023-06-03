let profileId: string

describe('Working with Profile tests', () => {
    beforeEach(() => {
        cy.visit('')
        cy.login().then((data) => {
            profileId = data.id
            cy.visit(`/profile/${data.id}`)
        })
    })

    afterEach(() => {
        cy.resetProfile(profileId)
    })

    it('Success load Profile', () => {
        cy.getByTestId('ProfileCardDeprecated-firstname-field-input').should('have.value', 'John')
        cy.getByTestId('ProfileCardDeprecated-lastname-field-input').should('have.value', 'Dou')
    })

    it('should edit profile', () => {
        const newFirstname = 'newFirstname'
        const newLastname = 'newLastname'
        cy.updateProfile(newFirstname, newLastname)
        cy.getByTestId('ProfileCardDeprecated-firstname-field-input').should('have.value', newFirstname)
        cy.getByTestId('ProfileCardDeprecated-lastname-field-input').should('have.value', newLastname)
    })
})
