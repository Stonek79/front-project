export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('ProfilePageEditHeader-edit').click()
    cy.getByTestId('ProfileCardDeprecated-firstname-field-input').clear().type(firstname)
    cy.getByTestId('ProfileCardDeprecated-lastname-field-input').clear().type(lastname)
    cy.getByTestId('ProfilePageEditHeader-save').click()
}

export const resetProfile = (profileId: string) => cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'true' },
    body: {
        id: '2',
        firstname: 'John',
        lastname: 'Dou',
        age: 66,
        currency: 'USD',
        country: 'USA',
        city: 'Sin City',
        username: 'user',
        avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
    },
})

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(testId: string): Chainable<void>
        }
    }
}
