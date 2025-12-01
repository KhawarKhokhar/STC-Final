import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '@/components/ProtectedRoute';

jest.mock('@/context/AuthContext', () => ({
    useAuth: () => ({
        user: { uid: 'testUserId' },
        loading: false,
    }),
}));

describe('ProtectedRoute', () => {
    it('renders children when user is authenticated', () => {
        render(
            <ProtectedRoute>
                <div>Protected Content</div>
            </ProtectedRoute>
        );
        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('renders null when user is not authenticated', () => {
        const { container } = render(<ProtectedRoute><div>Protected Content</div></ProtectedRoute>);
        expect(container.firstChild).toBeNull();
    });
});