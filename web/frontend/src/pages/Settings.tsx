import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Settings as SettingsIcon, Power, Bell, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings({ onLogout }: { onLogout: () => void }) {
    const navigate = useNavigate();

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [usageAlerts, setUsageAlerts] = useState(true);
    const [savingsAlerts, setSavingsAlerts] = useState(true);
    const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
    const [shareData, setShareData] = useState(true);
    const [analytics, setAnalytics] = useState(true);

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
                        <Button onClick={() => navigate('/account')} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <User className="w-4 h-4 mr-2" />
                            Account
                        </Button>
                        <Button onClick={() => navigate('/settings')} variant="outline" size="sm" className="border-black bg-gray-100 text-black">
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
                    <h2 className="text-3xl font-bold mb-2">Settings</h2>
                    <p className="text-gray-500">Manage your preferences and notifications</p>
                </div>

                <div className="space-y-6">
                    {/* Notification Preferences */}
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center">
                                <Bell className="w-6 h-6 mr-2" />
                                Notification Preferences
                            </CardTitle>
                            <CardDescription>Choose how you want to be notified</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-base">Notification Channels</h4>
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Email Notifications</Label>
                                        <p className="text-sm text-gray-500">Receive updates via email</p>
                                    </div>
                                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                                </div>
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">SMS Notifications</Label>
                                        <p className="text-sm text-gray-500">Receive alerts via text message</p>
                                    </div>
                                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6 space-y-4">
                                <h4 className="font-semibold text-base">Alert Types</h4>
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">High Usage Alerts</Label>
                                        <p className="text-sm text-gray-500">Get notified when consumption is high</p>
                                    </div>
                                    <Switch checked={usageAlerts} onCheckedChange={setUsageAlerts} />
                                </div>
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Savings Updates</Label>
                                        <p className="text-sm text-gray-500">Monthly savings reports</p>
                                    </div>
                                    <Switch checked={savingsAlerts} onCheckedChange={setSavingsAlerts} />
                                </div>
                                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">Maintenance Alerts</Label>
                                        <p className="text-sm text-gray-500">System maintenance notifications</p>
                                    </div>
                                    <Switch checked={maintenanceAlerts} onCheckedChange={setMaintenanceAlerts} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Display Preferences */}
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl">Display Preferences</CardTitle>
                            <CardDescription>Customize your dashboard experience</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="language" className="text-base">Language</Label>
                                <select id="language" className="w-full p-3 border border-gray-300 rounded-md text-base">
                                    <option>English</option>
                                    <option>Hindi</option>
                                    <option>Marathi</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone" className="text-base">Timezone</Label>
                                <select id="timezone" className="w-full p-3 border border-gray-300 rounded-md text-base">
                                    <option>IST (UTC+5:30)</option>
                                    <option>GMT (UTC+0)</option>
                                    <option>EST (UTC-5)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currency" className="text-base">Currency</Label>
                                <select id="currency" className="w-full p-3 border border-gray-300 rounded-md text-base">
                                    <option>INR (₹)</option>
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data & Privacy */}
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl">Data & Privacy</CardTitle>
                            <CardDescription>Control how your data is used</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium">Share Usage Data</Label>
                                    <p className="text-sm text-gray-500">Help improve AI recommendations</p>
                                </div>
                                <Switch checked={shareData} onCheckedChange={setShareData} />
                            </div>
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium">Analytics</Label>
                                    <p className="text-sm text-gray-500">Allow usage analytics</p>
                                </div>
                                <Switch checked={analytics} onCheckedChange={setAnalytics} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
