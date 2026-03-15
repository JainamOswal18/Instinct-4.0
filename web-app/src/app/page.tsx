
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons/logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { loginUser, registerUser, type AppRole } from '@/lib/auth';
import { Mail, Lock, User, Phone, ArrowRight, Sparkles } from 'lucide-react';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const router = useRouter();
  const { toast } = useToast();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRole, setSignupRole] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please enter both email and password.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 600));

    const result = await loginUser(loginEmail, loginPassword);

    if (result.success) {
      toast({
        title: 'Welcome back! 🎉',
        description: result.message,
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: result.message,
      });
    }

    setIsLoading(false);
  };

  const handleSignup = async () => {
    if (!signupName || !signupEmail || !signupRole || !signupPhone || !signupPassword) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill in all fields to create your account.',
      });
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      toast({
        variant: 'destructive',
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
      });
      return;
    }

    // Phone validation
    if (!/^\d{7,15}$/.test(signupPhone.replace(/[\s\-\+\(\)]/g, ''))) {
      toast({
        variant: 'destructive',
        title: 'Invalid phone number',
        description: 'Please enter a valid phone number.',
      });
      return;
    }

    // Password validation
    if (signupPassword.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Weak password',
        description: 'Password must be at least 6 characters.',
      });
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 600));

    const result = await registerUser({
      name: signupName,
      email: signupEmail,
      role: signupRole as AppRole,
      phone: signupPhone,
      password: signupPassword,
    });

    if (result.success) {
      toast({
        title: 'Account created! 🚀',
        description: 'Welcome to EaaS Nexus. Redirecting to your dashboard...',
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: result.message,
      });
    }

    setIsLoading(false);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/3 blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and branding */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 shadow-lg shadow-primary/10">
            <Logo className="h-9 w-9 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">EaaS Nexus</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your Energy as a Service Partner</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-border/50 backdrop-blur-sm">
          {/* Tab Switcher */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-300 relative ${
                mode === 'login'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
              {mode === 'login' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-300 relative ${
                mode === 'signup'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
              {mode === 'signup' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-12 bg-primary rounded-full" />
              )}
            </button>
          </div>

          {/* Login Form */}
          {mode === 'login' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl font-headline">Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10"
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleLogin}
                    className="w-full gap-2 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      <>
                        Login
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground pt-2">
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-primary hover:underline font-medium"
                    >
                      Create one here
                    </button>
                  </p>
                </div>
              </CardContent>
            </div>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl font-headline flex items-center gap-2">
                  Create Account
                  <Sparkles className="h-5 w-5 text-accent" />
                </CardTitle>
                <CardDescription>Fill in your details to get started with EaaS Nexus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role</Label>
                    <Select onValueChange={setSignupRole} value={signupRole}>
                      <SelectTrigger id="signup-role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CITIZEN">Citizen</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="EXECUTIVE">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="9876543210"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Min. 6 characters"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="pl-10"
                        onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleSignup}
                    className="w-full gap-2 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground pt-2">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-primary hover:underline font-medium"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </CardContent>
            </div>
          )}
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          © 2026 EaaS Nexus. Powering sustainable energy solutions.
        </p>
      </div>
    </main>
  );
}
