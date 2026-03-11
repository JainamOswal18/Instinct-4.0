import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    User, Settings as SettingsIcon, Power, Home, Check, Zap, Battery,
    Sun, Wind, Leaf, TrendingUp, Star, ArrowRight, Filter, X
} from 'lucide-react';
import { availablePlans } from '@/data/mockData';

export default function Plans({ onLogout }: { onLogout: () => void }) {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscriptionStep, setSubscriptionStep] = useState(1);

    const planTypes = ['All', 'Solar', 'Battery', 'Cooling', 'Combo'];

    const filteredPlans = selectedType === 'All'
        ? availablePlans
        : availablePlans.filter(plan => plan.type === selectedType);

    const handleSubscribe = (plan: any) => {
        setSelectedPlan(plan);
        setIsSubscribing(true);
        setSubscriptionStep(1);
    };

    const handleSubscriptionComplete = () => {
        setIsSubscribing(false);
        setSubscriptionStep(1);
        // Show success message
        alert(`Successfully subscribed to ${selectedPlan.name}! Our team will contact you within 24 hours.`);
    };

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
            <main className="container mx-auto px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-3">Browse EaaS Plans</h2>
                    <p className="text-gray-600 text-lg">Choose the perfect energy solution for your home. Subscribe in less than 5 minutes.</p>
                </div>

                {/* Filter Section */}
                <div className="mb-8 flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter by type:</span>
                    <div className="flex flex-wrap gap-2">
                        {planTypes.map((type) => (
                            <Button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                variant={selectedType === type ? "default" : "outline"}
                                size="sm"
                                className={selectedType === type
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "border-gray-300 text-black hover:bg-gray-100"}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredPlans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`border-2 ${plan.popular ? 'border-black shadow-xl' : 'border-gray-200'} hover:shadow-2xl transition-all relative`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-black text-white px-4 py-1 flex items-center space-x-1">
                                        <Star className="w-3 h-3 fill-white" />
                                        <span>Most Popular</span>
                                    </Badge>
                                </div>
                            )}

                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <CardTitle className="text-2xl font-bold mb-1">{plan.name}</CardTitle>
                                        <CardDescription className="text-sm">{plan.category}</CardDescription>
                                    </div>
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        {plan.type === 'Solar' && <Sun className="w-6 h-6 text-yellow-600" />}
                                        {plan.type === 'Battery' && <Battery className="w-6 h-6 text-blue-600" />}
                                        {plan.type === 'Cooling' && <Wind className="w-6 h-6 text-cyan-600" />}
                                        {plan.type === 'Combo' && <Zap className="w-6 h-6 text-green-600" />}
                                    </div>
                                </div>
                                <div className="flex items-baseline space-x-2 mb-3">
                                    <span className="text-4xl font-bold">₹{plan.price}</span>
                                    <span className="text-gray-500">/{plan.billingCycle}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                                    <Zap className="w-4 h-4" />
                                    <span className="font-medium">{plan.capacity}</span>
                                </div>
                                <p className="text-sm text-gray-600">{plan.description}</p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Key Metrics */}
                                <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">Savings</div>
                                        <div className="text-sm font-bold text-green-600">{plan.savings}</div>
                                    </div>
                                    <div className="text-center border-x border-gray-200">
                                        <div className="text-xs text-gray-500 mb-1">Carbon</div>
                                        <div className="text-sm font-bold text-green-600">{plan.carbonOffset}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">ROI</div>
                                        <div className="text-sm font-bold">{plan.roi}</div>
                                    </div>
                                </div>

                                {/* Features List */}
                                <div className="space-y-2">
                                    <div className="text-sm font-semibold mb-2">What's Included:</div>
                                    {plan.features.slice(0, 5).map((feature: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-2 text-sm">
                                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                    {plan.features.length > 5 && (
                                        <div className="text-xs text-gray-500 ml-6">
                                            +{plan.features.length - 5} more features
                                        </div>
                                    )}
                                </div>

                                {/* Subscribe Button */}
                                <Button
                                    onClick={() => handleSubscribe(plan)}
                                    className={`w-full ${plan.popular ? 'bg-black hover:bg-gray-800' : 'bg-gray-800 hover:bg-black'} text-white h-11 text-base font-semibold`}
                                >
                                    Subscribe Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Benefits Section */}
                <Card className="border-2 border-gray-200 bg-gradient-to-br from-green-50 to-white mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <Leaf className="w-6 h-6 mr-2 text-green-600" />
                            Why Choose EaaS?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Zero Upfront Cost</h4>
                                    <p className="text-sm text-gray-600">No installation charges. Start saving from day one.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Zap className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Complete Maintenance</h4>
                                    <p className="text-sm text-gray-600">We handle all repairs and upkeep at no extra cost.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Star className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Flexible Plans</h4>
                                    <p className="text-sm text-gray-600">Upgrade, downgrade, or cancel anytime.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            {/* Subscription Dialog */}
            <Dialog open={isSubscribing} onOpenChange={setIsSubscribing}>
                <DialogContent className="bg-white border-gray-200 max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center justify-between">
                            <span>Subscribe to {selectedPlan?.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => setIsSubscribing(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </DialogTitle>
                        <DialogDescription>
                            Complete your subscription in 3 easy steps
                        </DialogDescription>
                    </DialogHeader>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-6">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${subscriptionStep >= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div className={`flex-1 h-1 mx-2 ${subscriptionStep > step ? 'bg-black' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step Content */}
                    {subscriptionStep === 1 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Step 1: Review Plan Details</h3>
                            <Card className="border-gray-200 bg-gray-50">
                                <CardContent className="pt-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Plan:</span>
                                            <span className="font-semibold">{selectedPlan?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Capacity:</span>
                                            <span className="font-semibold">{selectedPlan?.capacity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Monthly Cost:</span>
                                            <span className="font-semibold">₹{selectedPlan?.price}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Setup Fee:</span>
                                            <span className="font-semibold text-green-600">₹0 (Free)</span>
                                        </div>
                                        <div className="border-t border-gray-300 pt-3 flex justify-between">
                                            <span className="font-bold">First Month Total:</span>
                                            <span className="font-bold text-xl">₹{selectedPlan?.price}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Button onClick={() => setSubscriptionStep(2)} className="w-full bg-black text-white hover:bg-gray-800 h-11">
                                Continue to Address
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    )}

                    {subscriptionStep === 2 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Step 2: Installation Address</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Full Address</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="123 Green Energy Lane" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">City</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Mumbai" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Pincode</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="400001" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Contact Number</label>
                                    <input type="tel" className="w-full p-3 border border-gray-300 rounded-md" placeholder="+91 98765 43210" />
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Button onClick={() => setSubscriptionStep(1)} variant="outline" className="flex-1 border-gray-300">
                                    Back
                                </Button>
                                <Button onClick={() => setSubscriptionStep(3)} className="flex-1 bg-black text-white hover:bg-gray-800">
                                    Continue to Confirmation
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {subscriptionStep === 3 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Step 3: Confirm Subscription</h3>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                                    <div className="text-sm text-green-800">
                                        <p className="font-semibold mb-1">You're almost done!</p>
                                        <p>By confirming, you agree to our terms and conditions. Our team will contact you within 24 hours to schedule installation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-gray-600 mt-0.5" />
                                    <span>I agree to the Terms & Conditions</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-gray-600 mt-0.5" />
                                    <span>I understand the monthly billing cycle</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-gray-600 mt-0.5" />
                                    <span>I authorize installation at my address</span>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Button onClick={() => setSubscriptionStep(2)} variant="outline" className="flex-1 border-gray-300">
                                    Back
                                </Button>
                                <Button onClick={handleSubscriptionComplete} className="flex-1 bg-green-600 text-white hover:bg-green-700">
                                    <Check className="w-4 h-4 mr-2" />
                                    Confirm Subscription
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
