// Simple localStorage-based auth system

export interface User {
  name: string;
  email: string;
  role: 'user' | 'provider' | 'admin';
  phone: string;
  password: string;
}

export interface AuthSession {
  email: string;
  name: string;
  role: string;
  phone: string;
}

const USERS_KEY = 'eaas_registered_users';
const SESSION_KEY = 'eaas_session';

// Get all registered users
function getRegisteredUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save users to localStorage
function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Register a new user
export function registerUser(user: User): { success: boolean; message: string } {
  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (existing) {
    return { success: false, message: 'An account with this email already exists. Please login instead.' };
  }
  users.push(user);
  saveUsers(users);

  // Auto-login after registration
  const session: AuthSession = {
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  // Keep backward compatibility with existing role system
  localStorage.setItem('userRole', user.role);

  return { success: true, message: 'Account created successfully!' };
}

// Login an existing user
export function loginUser(email: string, password: string): { success: boolean; message: string } {
  const users = getRegisteredUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { success: false, message: 'No account found with this email. Please sign up first.' };
  }
  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' };
  }

  // Create session
  const session: AuthSession = {
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem('userRole', user.role);

  return { success: true, message: 'Login successful!' };
}

// Get current session
export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

// Logout
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem('userRole');
  localStorage.removeItem('surveyStatus');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getSession() !== null;
}
