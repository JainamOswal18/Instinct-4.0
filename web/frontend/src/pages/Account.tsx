import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Settings as SettingsIcon, Power, Shield, Key, CreditCard, Mail, Phone, MapPin, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Account({ onLogout }: { onLogout: () => void }) {
    const navigate = useNavigate();
    const [autoPayment, setAutoPayment] = useState(false);

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 bg-white border-2 border-transparent bg-clip-padding" style={{ borderImage: 'linear-gradient(to bottom right, #ef4444, #22c55e) 1' }}>
                            <img src="/src/assets/EnergyAsASeriveLogo.svg" alt="EaaS Nexus Logo" className="w-full h-full" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">EaaS Nexus</h1>
                            <p className="text-xs text-gray-500">Resident Portal</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button onClick={() => navigate('/')} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <Home className="w-4 h-4 mr-2" />
                            Dashboard
                        </Button>
                        <Button onClick={() => navigate('/account')} variant="outline" size="sm" className="border-black bg-gray-100 text-black">
                            <User className="w-4 h-4 mr-2" />
                            Account
                        </Button>
                        <Button onClick={() => navigate('/settings')} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <SettingsIcon className="w-4 h-4 mr-2" />
                            Settings
                        </Button>
                        <Button onClick={onLogout} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <Power className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8 max-w-4xl">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-2">Account</h2>
                    <p className="text-gray-500">Manage your profile, security, and billing settings</p>
                </div>

                <div className="space-y-6">
                    {/* Profile Section */}
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center">
                                <User className="w-6 h-6 mr-2" />
                                Personal Information
                            </CardTitle>
                            <CardDescription>Update your personal details and contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center text-base">
                                    <User className="w-5 h-5 mr-2" />
                                    Full Name
                                </Label>
                                <Input id="name" defaultValue="John Resident" className="border-gray-300 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center text-base">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email Address
                                </Label>
                                <Input id="email" type="email" defaultValue="john.resident@example.com" className="border-gray-300 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center text-base">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Phone Number
                                </Label>
                                <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="border-gray-300 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address" className="flex items-center text-base">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Service Address
                                </Label>
                                <Input id="address" defaultValue="123 Green Energy Lane, Mumbai 400001" className="border-gray-300 h-11" />
                            </div>
                            <div className="pt-2">
                                <Button className="w-full bg-black text-white hover:bg-gray-800 h-11 text-base">
                                    Save Profile Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center">
                                <Shield className="w-6 h-6 mr-2" />
                                Security
                            </CardTitle>
                            <CardDescription>Update your password and security settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password" className="flex items-center text-base">
                                    <Key className="w-5 h-5 mr-2" />
                                    Current Password
                                </Label>
                                <Input id="current-password" type="password" placeholder="Enter current password" className="border-gray-300 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password" className="text-base">New Password</Label>
                                <Input id="new-password" type="password" placeholder="Enter new password" className="border-gray-300 h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password" className="text-base">Confirm Password</Label>
                                <Input id="confirm-password" type="password" placeholder="Confirm new password" className="border-gray-300 h-11" />
                            </div>
                            <Button variant="outline" className="w-full border-gray-300 h-11 text-base">
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Billing Section */}
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center">
                                <CreditCard className="w-6 h-6 mr-2" />
                                Billing
                            </CardTitle>
                            <CardDescription>Manage your payment methods and billing preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium">Auto-Payment</Label>
                                    <p className="text-sm text-gray-500">Automatically pay bills on due date</p>
                                </div>
                                <Switch checked={autoPayment} onCheckedChange={setAutoPayment} />
                            </div>
                            <Button variant="outline" className="w-full border-gray-300 h-11 text-base">
                                Manage Payment Methods
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-red-200 bg-red-50">
                        <CardHeader>
                            <CardTitle className="text-2xl text-red-600">Danger Zone</CardTitle>
                            <CardDescription className="text-red-700">Irreversible account actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-100 h-11 text-base">
                                Deactivate Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
