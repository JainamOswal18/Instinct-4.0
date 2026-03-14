// mock/auth.ts
import { User } from '@/types';

// Simulated delay to make it feel real
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// mock/auth.ts
export const loginUser = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  // Simulate wrong password
  if (password.length < 4) {
    throw new Error('Invalid credentials');
  }

  return {
    success: true,
    data: {
      user: {
        id: 'user_001',
        name: 'Rahul Kumar',
        email,
        phone: '+91 98765 43210',
        address: '123 Green Energy Lane, Mumbai',
        properties: [
          {
            id: 'prop_001',
            name: 'My Home',
            address: '123 Green Energy Lane, Mumbai',
            type: 'residential',
            subscriptionStatus: 'NONE',
            createdAt: new Date().toISOString(),
          },
        ],
      },
      accessToken: 'mock_access_token_xyz',
      refreshToken: 'mock_refresh_token_xyz',
    },
  };
}

export async function signupUser(name: string, email: string,  phone: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  await delay(1000);
  
  if (!name || !email || !phone || !password) {
    return { success: false, error: 'All fields required' };
  }
  
  return {
    success: true,
    user: {
      id: 'user_new_' + Date.now(),
      name: name,
      email: email,
      phone: phone,
      planType: 'basic',
    }
  };
}