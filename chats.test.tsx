import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatsPage from '@/app/(dashboard)/dashboard/chats/page';
import { rdb, auth } from '@/lib/firebase';
import { ref, onValue, push, update } from 'firebase/database';
import { signInAnonymously } from 'firebase/auth';

// Mock Firebase Realtime Database and Auth
jest.mock('@/lib/firebase', () => ({
  rdb: {}, // Mock rdb object
  auth: {
    currentUser: { uid: 'test-uid' },
  },
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn((db, path) => ({ db, path })),
  onValue: jest.fn(),
  push: jest.fn(),
  update: jest.fn(),
  query: jest.fn(),
  orderByChild: jest.fn(),
  limitToFirst: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signInAnonymously: jest.fn(() => Promise.resolve({ user: { uid: 'test-uid' } })),
}));

// Mock the notification helper
jest.mock('@/lib/notifications', () => ({
  createNotification: jest.fn(() => Promise.resolve()),
}));

describe('ChatsPage', () => {
  const mockChats = [
    {
      id: 'chat1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      lastMessage: 'Hello there!',
      lastUpdated: Date.now() - 10000,
      unread: 1,
      pinned: false,
    },
    {
      id: 'chat2',
      name: 'Bob Johnson',
      email: 'bob@test.com',
      lastMessage: 'How are you?',
      lastUpdated: Date.now() - 20000,
      unread: 0,
      pinned: true,
    },
    {
      id: 'chat3',
      name: 'Charlie Brown',
      email: 'charlie@domain.com',
      lastMessage: 'Need help.',
      lastUpdated: Date.now() - 5000,
      unread: 2,
      pinned: false,
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock onValue to immediately return our mock chats
    (onValue as jest.Mock).mockImplementation((_ref, callback) => {
      callback({
        val: () => {
          const chatsObj: { [key: string]: any } = {};
          mockChats.forEach(chat => {
            chatsObj[chat.id] = chat;
          });
          return chatsObj;
        },
      });
      return jest.fn(); // Return an unsubscribe function
    });
  });

  it('renders the ChatsPage component', () => {
    render(<ChatsPage />);
    expect(screen.getByText('Chats')).toBeInTheDocument();
  });

  it('filters chats by search query (name)', async () => {
    render(<ChatsPage />);

    // Wait for chats to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search message');
    fireEvent.change(searchInput, { target: { value: 'alice' } });

    // Only Alice should be visible
    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });
  });

  it('filters chats by search query (email)', async () => {
    render(<ChatsPage />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search message');
    fireEvent.change(searchInput, { target: { value: 'test.com' } });

    // Only Bob should be visible
    await waitFor(() => {
      expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });
  });

  it('shows no chats when search query does not match any chat', async () => {
    render(<ChatsPage />);

    await waitFor(() => {
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search message');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    });
  });
});