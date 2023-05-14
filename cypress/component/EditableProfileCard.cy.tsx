import { ProfilePageEdit } from '@/features/ProfilePageEdit';
import { TestsProvider } from '@/shared/lib/tests/componentRender/ComponentRender';

const USER_ID = '1'

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' })
        cy.mount(
            <TestsProvider options={
                {
                    initialState: {
                        user: {
                            authData: {
                                id: USER_ID,
                            },
                        },
                    },
                }
            }
            >
                <ProfilePageEdit id={USER_ID} />
            </TestsProvider>,
        )
    })

    // TODO Add active tests
})
