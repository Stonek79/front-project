import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentRender } from '@/shared/lib/tests/componentRender/ComponentRender'
import { Profile } from '@/entities/Profile';
import { Countries } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { $api } from '@/shared/api/api';
import { ProfilePageEdit } from './ProfilePageEdit';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
    id: '1',
    firstname: 'admin',
    lastname: 'admin',
    age: 21,
    avatar: '',
    city: 'Moscow',
    country: Countries.USA,
    currency: Currency.USD,
    username: 'Alex',
}

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'Alex' },
        },
    },
    asyncReducers: { profile: profileReducer },
}

describe('features/ProfilePageEdit', () => {
    test('switched to reduction mode', async () => {
        ComponentRender(<ProfilePageEdit id="1" />, options);
        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-edit'));
        expect(screen.getByTestId('ProfilePageEditHeader-save')).toBeInTheDocument();
    });

    test('press to reset button should return initial state', async () => {
        ComponentRender(<ProfilePageEdit id="1" />, options);
        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-edit'));
        expect(screen.getByTestId('ProfilePageEditHeader-save')).toBeInTheDocument();

        await userEvent.clear(screen.getByTestId('ProfileCard-firstname-field-input'));
        await userEvent.clear(screen.getByTestId('ProfileCard-lastname-field-input'));

        await userEvent.type(screen.getByTestId('ProfileCard-firstname-field-input'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard-lastname-field-input'), 'users');

        expect(screen.getByTestId('ProfileCard-firstname-field-input')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard-lastname-field-input')).toHaveValue('users');

        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-cancel-edit'));

        expect(screen.getByTestId('ProfileCard-firstname-field-input')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard-lastname-field-input')).toHaveValue('admin');
    });

    test('should show errors', async () => {
        ComponentRender(<ProfilePageEdit id="1" />, options);
        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-edit'));
        expect(screen.getByTestId('ProfilePageEditHeader-save')).toBeInTheDocument();

        await userEvent.clear(screen.getByTestId('ProfileCard-firstname-field-input'));
        await userEvent.type(screen.getByTestId('ProfileCard-firstname-field-input'), 'X');

        await userEvent.clear(screen.getByTestId('ProfileCard-lastname-field-input'));

        await userEvent.type(screen.getByTestId('ProfileCard-age-field-input'), '12345');

        await userEvent.clear(screen.getByTestId('ProfileCard-username-field-input'));
        await userEvent.type(screen.getByTestId('ProfileCard-username-field-input'), 'usersdfknzsdfsdfzsdfkljgnzdjfbgjksdfbglsjkdbf');

        await userEvent.clear(screen.getByTestId('ProfileCard-city-field-input'));

        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-save'));

        expect(screen.getByTestId('ProfileCard-firstname-field-error-paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('ProfileCard-lastname-field-error-paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('ProfileCard-lastname-field-error-paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('ProfileCard-age-field-error-paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('ProfileCard-city-field-error-paragraph')).toBeInTheDocument();
        expect(screen.getByTestId('ProfileCard-username-field-error-paragraph')).toBeInTheDocument();
    });

    test('should send PUT request', async () => {
        const mockRequest = jest.spyOn($api, 'put')
        ComponentRender(<ProfilePageEdit id="1" />, options);
        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-edit'));
        await userEvent.type(screen.getByTestId('ProfileCard-firstname-field-input'), 'user');

        await userEvent.click(screen.getByTestId('ProfilePageEditHeader-save'));
        expect(mockRequest).toHaveBeenCalled();
    });
});
