import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
    Power, Zap, Leaf, CreditCard, Settings,
    Bell, AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown, Battery, Wifi, Sun,
    HelpCircle, BarChart3, AlertTriangle, User, Mail, Phone, MapPin, Key, Shield
} from 'lucide-react';
import {
    hourlyEnergyData, currentPlan, invoiceHistory, liveStats, aiAdvice,
    serviceStatus, notifications, supportTickets, monthlySavings
} from '@/data/mockData';
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"

export function ResidentDashboard({ onLogout }: { onLogout: () => void }) {
    const navigate = useNavigate();
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Settings state
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [usageAlerts, setUsageAlerts] = useState(true);
    const [savingsAlerts, setSavingsAlerts] = useState(true);
    const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
    const [autoPayment, setAutoPayment] = useState(false);

    const unreadNotifications = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-gray-50/30 text-black relative font-sans selection:bg-green-100">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
                <BackgroundRippleEffect />
            </div>

            {/* Header */}
            <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 bg-white border-2 border-transparent bg-clip-padding" style={{ borderImage: 'linear-gradient(to bottom right, #ef4444, #22c55e) 1' }}>
                            <img src="/src/assets/EnergyAsASeriveLogo.svg" alt="EaaS Nexus Logo" className="w-full h-full" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight"><span className="text-green-600">EaaS</span> Nexus</h1>
                            <p className="text-xs text-green-700/80 font-semibold tracking-wider uppercase">Resident Portal</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100 relative">
                                    <Bell className="w-4 h-4" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white border-gray-200 max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold">Notifications</DialogTitle>
                                    <DialogDescription className="text-gray-500">
                                        Recent alerts and updates
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className={`p-3 border rounded-lg ${notif.read ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'}`}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        {notif.priority === 'high' && <AlertTriangle className="w-4 h-4 text-black" />}
                                                        {notif.priority === 'medium' && <AlertCircle className="w-4 h-4 text-gray-600" />}
                                                        {notif.priority === 'low' && <CheckCircle className="w-4 h-4 text-gray-400" />}
                                                        <h4 className="font-semibold text-sm">{notif.title}</h4>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mb-2">{notif.message}</p>
                                                    <p className="text-xs text-gray-400">{notif.timestamp}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={() => navigate('/account')} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <User className="w-4 h-4 mr-2" />
                            Account
                        </Button>
                        <Button onClick={() => navigate('/settings')} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Button>

                        {/* Settings Dialog - Keep for now, will be removed */}
                        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100 hidden">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings Old
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white border-gray-200 max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
                                    <DialogDescription className="text-gray-500">
                                        Manage your account preferences and settings
                                    </DialogDescription>
                                </DialogHeader>

                                <Tabs defaultValue="profile" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4 mb-6">
                                        <TabsTrigger value="profile">Profile</TabsTrigger>
                                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                        <TabsTrigger value="preferences">Preferences</TabsTrigger>
                                        <TabsTrigger value="account">Account</TabsTrigger>
                                    </TabsList>

                                    {/* Profile Tab */}
                                    <TabsContent value="profile" className="space-y-4">
                                        <Card className="border-gray-200">
                                            <CardHeader>
                                                <CardTitle className="text-lg">Personal Information</CardTitle>
                                                <CardDescription>Update your personal details</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="flex items-center">
                                                        <User className="w-4 h-4 mr-2" />
                                                        Full Name
                                                    </Label>
                                                    <Input id="name" defaultValue="John Resident" className="border-gray-300" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="flex items-center">
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Email Address
                                                    </Label>
                                                    <Input id="email" type="email" defaultValue="john.resident@example.com" className="border-gray-300" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="flex items-center">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        Phone Number
                                                    </Label>
                                                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="border-gray-300" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="address" className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        Service Address
                                                    </Label>
                                                    <Input id="address" defaultValue="123 Green Energy Lane, Mumbai 400001" className="border-gray-300" />
                                                </div>
                                                <Button className="w-full bg-black text-white hover:bg-gray-800">
                                                    Save Changes
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Notifications Tab */}
                                    <TabsContent value="notifications" className="space-y-4">
                                        <Card className="border-gray-200">
                                            <CardHeader>
                                                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                                                <CardDescription>Choose how you want to be notified</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-sm">Notification Channels</h4>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">Email Notifications</Label>
                                                            <p className="text-xs text-gray-500">Receive updates via email</p>
                                                        </div>
                                                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">SMS Notifications</Label>
                                                            <p className="text-xs text-gray-500">Receive alerts via text message</p>
                                                        </div>
                                                        <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4 space-y-4">
                                                    <h4 className="font-semibold text-sm">Alert Types</h4>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">High Usage Alerts</Label>
                                                            <p className="text-xs text-gray-500">Get notified when consumption is high</p>
                                                        </div>
                                                        <Switch checked={usageAlerts} onCheckedChange={setUsageAlerts} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">Savings Updates</Label>
                                                            <p className="text-xs text-gray-500">Monthly savings reports</p>
                                                        </div>
                                                        <Switch checked={savingsAlerts} onCheckedChange={setSavingsAlerts} />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">Maintenance Alerts</Label>
                                                            <p className="text-xs text-gray-500">System maintenance notifications</p>
                                                        </div>
                                                        <Switch checked={maintenanceAlerts} onCheckedChange={setMaintenanceAlerts} />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Preferences Tab */}
                                    <TabsContent value="preferences" className="space-y-4">
                                        <Card className="border-gray-200">
                                            <CardHeader>
                                                <CardTitle className="text-lg">Dashboard Preferences</CardTitle>
                                                <CardDescription>Customize your dashboard experience</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-sm">Display Options</h4>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="language">Language</Label>
                                                        <select id="language" className="w-full p-2 border border-gray-300 rounded-md">
                                                            <option>English</option>
                                                            <option>Hindi</option>
                                                            <option>Marathi</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="timezone">Timezone</Label>
                                                        <select id="timezone" className="w-full p-2 border border-gray-300 rounded-md">
                                                            <option>IST (UTC+5:30)</option>
                                                            <option>GMT (UTC+0)</option>
                                                            <option>EST (UTC-5)</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="currency">Currency</Label>
                                                        <select id="currency" className="w-full p-2 border border-gray-300 rounded-md">
                                                            <option>INR (₹)</option>
                                                            <option>USD ($)</option>
                                                            <option>EUR (€)</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4 space-y-4">
                                                    <h4 className="font-semibold text-sm">Data & Privacy</h4>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">Share Usage Data</Label>
                                                            <p className="text-xs text-gray-500">Help improve AI recommendations</p>
                                                        </div>
                                                        <Switch defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">Analytics</Label>
                                                            <p className="text-xs text-gray-500">Allow usage analytics</p>
                                                        </div>
                                                        <Switch defaultChecked />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Account Tab */}
                                    <TabsContent value="account" className="space-y-4">
                                        <Card className="border-gray-200">
                                            <CardHeader>
                                                <CardTitle className="text-lg">Account Settings</CardTitle>
                                                <CardDescription>Manage your account security and billing</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-sm flex items-center">
                                                        <Shield className="w-4 h-4 mr-2" />
                                                        Security
                                                    </h4>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="current-password" className="flex items-center">
                                                            <Key className="w-4 h-4 mr-2" />
                                                            Current Password
                                                        </Label>
                                                        <Input id="current-password" type="password" placeholder="Enter current password" className="border-gray-300" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="new-password">New Password</Label>
                                                        <Input id="new-password" type="password" placeholder="Enter new password" className="border-gray-300" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                                        <Input id="confirm-password" type="password" placeholder="Confirm new password" className="border-gray-300" />
                                                    </div>
                                                    <Button variant="outline" className="w-full border-gray-300">
                                                        Update Password
                                                    </Button>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4 space-y-4">
                                                    <h4 className="font-semibold text-sm flex items-center">
                                                        <CreditCard className="w-4 h-4 mr-2" />
                                                        Billing
                                                    </h4>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-0.5">
                                                            <Label className="text-sm font-medium">Auto-Payment</Label>
                                                            <p className="text-xs text-gray-500">Automatically pay bills on due date</p>
                                                        </div>
                                                        <Switch checked={autoPayment} onCheckedChange={setAutoPayment} />
                                                    </div>
                                                    <Button variant="outline" className="w-full border-gray-300">
                                                        Manage Payment Methods
                                                    </Button>
                                                </div>

                                                <div className="border-t border-gray-200 pt-4 space-y-4">
                                                    <h4 className="font-semibold text-sm text-red-600">Danger Zone</h4>
                                                    <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                                                        Deactivate Account
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </DialogContent>
                        </Dialog>

                        <Button onClick={onLogout} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                            <Power className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {/* Service Status Banner */}
                <div className="mb-6 p-4 bg-white/60 backdrop-blur-sm border border-green-100 rounded-2xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-sm font-medium text-gray-800">System {serviceStatus.status}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Wifi className="w-4 h-4 text-green-600" />
                            <span>Grid: {serviceStatus.gridConnection}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Sun className="w-4 h-4 text-orange-500" />
                            <span>Solar: {serviceStatus.solarGeneration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Battery className="w-4 h-4 text-green-600" />
                            <span>Battery: {serviceStatus.batteryBackup}%</span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                        <span className="text-gray-400 font-normal">Uptime:</span> {serviceStatus.uptime}% <span className="mx-2 text-gray-300">|</span> Last sync: {serviceStatus.lastSync}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <button
                        onClick={() => navigate('/plans')}
                        className="group p-4 bg-white border border-green-50/50 rounded-2xl shadow-sm hover:border-green-500 hover:shadow-md transition-all duration-300 text-left relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-full blur-2xl -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <TrendingUp className="w-5 h-5 text-green-700" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm group-hover:text-green-700 transition-colors">Upgrade Plan</h4>
                                <p className="text-xs text-gray-500 group-hover:text-gray-600">Switch to a higher tier</p>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => setIsSupportDialogOpen(true)}
                        className="group p-4 bg-white border border-green-50/50 rounded-2xl shadow-sm hover:border-black hover:shadow-md transition-all duration-300 text-left relative overflow-hidden"
                    >
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <AlertCircle className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm group-hover:text-black transition-colors">Report Issue</h4>
                                <p className="text-xs text-gray-500">Create support ticket</p>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => navigate('/analytics')}
                        className="group p-4 bg-white border border-green-50/50 rounded-2xl shadow-sm hover:border-green-500 hover:shadow-md transition-all duration-300 text-left relative overflow-hidden"
                    >
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <BarChart3 className="w-5 h-5 text-green-700" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm group-hover:text-green-700 transition-colors">View Analytics</h4>
                                <p className="text-xs text-gray-500">Detailed usage reports</p>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => navigate('/settings')}
                        className="group p-4 bg-white border border-green-50/50 rounded-2xl shadow-sm hover:border-black hover:shadow-md transition-all duration-300 text-left relative overflow-hidden"
                    >
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Bell className="w-5 h-5 text-gray-700" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm group-hover:text-black transition-colors">Smart Alerts</h4>
                                <p className="text-xs text-gray-500">Configure notifications</p>
                            </div>
                        </div>
                    </button>
                </div>


                {/* Top Stats Row - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Live Usage Card - Enhanced */}
                    <Card className="border-none shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer rounded-2xl">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-600">Live Usage</CardTitle>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-green-600 font-medium">Live</span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline space-x-2 mb-3">
                                <span className="text-4xl font-bold text-black">{liveStats.currentUsage}</span>
                                <span className="text-lg text-gray-500">kWh</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">vs. Yesterday</span>
                                    <span className="text-green-600 font-medium flex items-center">
                                        <TrendingDown className="w-3 h-3 mr-1" />
                                        -8%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>0 kWh</span>
                                    <span>20 kWh</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Estimated Bill Card - Enhanced */}
                    <Card className="border-none shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer rounded-2xl">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-600">Estimated Bill</CardTitle>
                                <Badge variant="outline" className="border-green-300 bg-green-50 text-green-700 text-xs">
                                    {liveStats.billAccuracy}% accurate
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline space-x-2 mb-3">
                                <span className="text-4xl font-bold text-black">₹{liveStats.estimatedBill.toFixed(0)}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Last month: ₹1,280</span>
                                    <span className="text-green-600 font-medium flex items-center">
                                        <TrendingDown className="w-3 h-3 mr-1" />
                                        ₹155 saved
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                                    <Clock className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-green-700">Due in 12 days</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Carbon Saved Card - Enhanced */}
                    <Card className="border-none shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer rounded-2xl bg-gradient-to-br from-green-50 to-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">Carbon Saved</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline space-x-2 mb-3">
                                <span className="text-4xl font-bold text-green-600">{liveStats.carbonSaved}</span>
                                <span className="text-lg text-gray-500">Tonnes</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                    <Leaf className="w-4 h-4 text-green-600" />
                                    <span>Equivalent to <strong>8 trees planted</strong></span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">This year</span>
                                    <span className="text-green-600 font-medium">+24% vs 2025</span>
                                </div>
                                <div className="w-full bg-green-200 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-green-500 to-green-700 h-2 rounded-full" style={{ width: '74%' }}></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Savings Card - Enhanced */}
                    <Card className="border-none shadow-md hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer rounded-2xl bg-gradient-to-br from-yellow-50 to-white">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline space-x-2 mb-3">
                                <span className="text-4xl font-bold text-green-600">₹{monthlySavings[monthlySavings.length - 1].savings}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Total saved</span>
                                    <span className="text-green-600 font-medium flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        +12% MoM
                                    </span>
                                </div>
                                <div className="p-2 bg-yellow-100 border border-yellow-300 rounded-md">
                                    <div className="flex items-center space-x-2">
                                        <Zap className="w-4 h-4 text-yellow-700" />
                                        <span className="text-xs text-yellow-800 font-medium">On track for ₹5,400/year</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Energy Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Main Chart Card */}
                    <Card className="lg:col-span-2 border-gray-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Energy Consumption</CardTitle>
                            <CardDescription className="text-gray-500">24-hour usage pattern (IoT Smart Meter)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={hourlyEnergyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis
                                        dataKey="hour"
                                        stroke="#6b7280"
                                        tick={{ fontSize: 12 }}
                                        interval={3}
                                    />
                                    <YAxis
                                        stroke="#6b7280"
                                        tick={{ fontSize: 12 }}
                                        label={{ value: 'kWh', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '6px',
                                            fontSize: '12px'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="consumption"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        dot={{ fill: '#22c55e', r: 4, strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* AI Savings Advisor Card */}
                    {/* AI Savings Advisor Card */}
                    <Card className="border border-green-200/50 shadow-lg bg-white rounded-2xl overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-700" />
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-yellow-500 fill-yellow-500" />
                                AI Savings Advisor
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                    <h4 className="font-semibold text-sm mb-2 text-gray-900">{aiAdvice.title}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {aiAdvice.message}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-black text-white rounded-xl shadow-md cursor-pointer hover:bg-gray-900 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-gray-400">Potential Savings</span>
                                        <span className="text-lg font-bold text-green-400">₹{aiAdvice.potentialSavings}</span>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Savings Trend Chart */}
                <Card className="border-gray-200 shadow-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Monthly Savings Trend</CardTitle>
                        <CardDescription className="text-gray-500">Track your savings over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={monthlySavings}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} label={{ value: '₹', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '6px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Bar dataKey="savings" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Support & Subscription Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Support Tickets Card */}
                    <Card className="border-none shadow-md bg-white rounded-2xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Support Tickets</CardTitle>
                                <Dialog open={isSupportDialogOpen} onOpenChange={setIsSupportDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline" className="border-gray-200 text-black hover:bg-green-50 hover:text-green-700 hover:border-green-200 rounded-full transition-colors">
                                            <HelpCircle className="w-4 h-4 mr-2" />
                                            New Ticket
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white border-gray-200">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold">Create Support Ticket</DialogTitle>
                                            <DialogDescription className="text-gray-500">
                                                Report an issue or request assistance
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                                                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                                <h3 className="font-semibold text-lg mb-2">Quick Support</h3>
                                                <p className="text-sm text-gray-500 mb-6">Our team responds within 24 hours</p>
                                                <Button className="w-full bg-black text-white hover:bg-gray-800">
                                                    Submit Ticket
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {supportTickets.map((ticket) => (
                                    <div key={ticket.id} className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                                            <Badge variant="outline" className={`text-xs ${ticket.status === 'Resolved' ? 'border-green-600 text-green-600' : 'border-gray-600 text-gray-600'}`}>
                                                {ticket.status}
                                            </Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-1">{ticket.title}</h4>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {ticket.createdDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Plan Detail Card */}
                    <Card className="border-none shadow-md bg-white rounded-2xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-semibold">Subscription Plan</CardTitle>
                                    <CardDescription className="text-gray-500 mt-1">
                                        Current Plan: <span className="font-semibold text-black">{currentPlan.name}</span>
                                    </CardDescription>
                                </div>
                                <Button onClick={() => navigate('/plans')} variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-100">
                                    Manage
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-baseline space-x-2 pb-4 border-b border-gray-200">
                                    <span className="text-3xl font-bold text-black">₹{currentPlan.price}</span>
                                    <span className="text-gray-500">/{currentPlan.billingCycle}</span>
                                </div>
                                <div className="space-y-2">
                                    {currentPlan.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full mr-3" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Invoice Table Card */}
                    <Card className="border-none shadow-md bg-white rounded-2xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
                                <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="bg-black text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/30 rounded-full transition-all px-6">
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            Pay Now
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white border-gray-200">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold">Payment Gateway</DialogTitle>
                                            <DialogDescription className="text-gray-500">
                                                Simulated Razorpay Payment Interface
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-6 py-4">
                                            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                                                <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                                <h3 className="font-semibold text-lg mb-2">Payment Amount</h3>
                                                <p className="text-3xl font-bold mb-4">₹{liveStats.estimatedBill.toFixed(2)}</p>
                                                <p className="text-sm text-gray-500 mb-6">Supports UPI, Cards, Net Banking, Wallets</p>
                                                <Button
                                                    className="w-full bg-black text-white hover:bg-gray-800"
                                                    onClick={() => {
                                                        setTimeout(() => {
                                                            setIsPaymentDialogOpen(false);
                                                            alert('Payment Successful! (Simulated)');
                                                        }, 1000);
                                                    }}
                                                >
                                                    Complete Payment
                                                </Button>
                                            </div>
                                            <p className="text-xs text-center text-gray-400">
                                                Secured by Razorpay (Demo Mode)
                                            </p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {invoiceHistory.slice(0, 3).map((invoice) => (
                                    <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm">{invoice.id}</p>
                                            <p className="text-xs text-gray-500">{invoice.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-sm">₹{invoice.amount.toFixed(2)}</p>
                                            <Badge variant="outline" className="border-green-600 text-green-600 text-xs mt-1">
                                                {invoice.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
