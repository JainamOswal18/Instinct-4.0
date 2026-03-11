// mock/auth.ts
import { User } from '@/types';

// Simulated delay to make it feel real
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  await delay(1200); // Simulate network request
  
  // Simple validation
  if (!email || !password) {
    return { success: false, error: 'Email and password required' };
  }
  
  if (password.length < 4) {
    return { success: false, error: 'Invalid credentials' };
  }
  
  // Mock successful login
  return {
    success: true,
    user: {
      id: 'user_demo_123',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      planType: 'premium',
    }
  };
}

export async function signupUser(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  await delay(1000);
  
  if (!name || !email || !password) {
    return { success: false, error: 'All fields required' };
  }
  
  return {
    success: true,
    user: {
      id: 'user_new_' + Date.now(),
      name: name,
      email: email,
      planType: 'basic',
    }
  };
}