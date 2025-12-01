import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import DashboardLayout from '@/app/(dashboard)/dashboard/layout';

const mockReplace = jest.fn();
const mockUpdate = jest.fn(() => Promise.resolve());
let onValueCallback: ((snap: any) => void) | null = null;

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/dashboard',
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: { uid: '123' }, loading: false }),
}));

jest.mock('@/components/ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="protected-route">{children}</div>
  ),
}));

jest.mock('@/lib/firebase', () => ({
  auth: { uid: 'abc' },
  rdb: { mock: true },
}));

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(() => Promise.resolve()),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(() => 'db-ref'),
  onValue: jest.fn((_ref, cb) => {
    onValueCallback = cb;
    return jest.fn();
  }),
  update: mockUpdate,
}));

const pushNotifications = (data: Record<string, any>) => {
  act(() => {
    onValueCallback?.({ val: () => data });
  });
};

describe('DashboardLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    onValueCallback = null;
  });

  it('renders sidebar items and badges based on unread notifications', async () => {
    render(
      <DashboardLayout>
        <div>Dashboard content</div>
      </DashboardLayout>,
    );

    pushNotifications({
      n1: { title: 'Chat', desc: 'New chat', unread: true, type: 'chat', createdAt: 2 },
      n2: { title: 'Lead', desc: 'New lead', unread: true, type: 'get_quote', createdAt: 1 },
      n3: { title: 'Seen', desc: 'Old', unread: false, type: 'chat', createdAt: 0 },
    });

    expect(screen.getByText('Dashboard content')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('2 unread notifications')).toBeInTheDocument(),
    );

    const chatsLink = screen.getByText('Chats').closest('a')!;
    expect(within(chatsLink).getByText('1')).toBeInTheDocument();

    const leadsLink = screen.getByText('Leads').closest('a')!;
    expect(within(leadsLink).getByText('1')).toBeInTheDocument();
  });

  it('opens notifications menu and marks unread items as read', async () => {
    render(
      <DashboardLayout>
        <div>Dashboard content</div>
      </DashboardLayout>,
    );

    pushNotifications({
      n1: { title: 'Chat', desc: 'New chat', unread: true, type: 'chat', createdAt: 2 },
      n2: { title: 'Lead', desc: 'New lead', unread: true, type: 'get_quote', createdAt: 1 },
    });

    const bellButton = screen.getByRole('button', { name: '2 unread notifications' });
    fireEvent.click(bellButton);

    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Mark all read'));

    await waitFor(() =>
      expect(mockUpdate).toHaveBeenCalledWith('db-ref', {
        'notifications/n1/unread': false,
        'notifications/n2/unread': false,
      }),
    );
  });
});
