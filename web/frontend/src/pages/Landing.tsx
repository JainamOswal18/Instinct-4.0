import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Zap, TrendingUp, Shield, Check, ArrowRight,
    BarChart3, Leaf, Bell, Activity, Sun, Battery, Wind
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EaaSLogo from '@/assets/EnergyAsASeriveLogo.svg';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import ElasticLine from '@/components/ui/elastic-line';
import InteractiveNav from '@/components/ui/interactive-nav';
import AnimatedNumber from '@/components/ui/animated-number';
import DotMatrixScroll from '@/components/ui/ticker';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Landing() {
    const navigate = useNavigate();
    const navItems = [
        { id: "home", label: "Home" },
        { id: "pricing", label: "Pricing" },
        { id: "features", label: "Features" },
    ];

    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples(prev => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== id));
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white text-black overflow-hidden relative">
            {/* Interactive Background Ripple */}
            <div className="fixed inset-0 z-0">
                <BackgroundRippleEffect />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img src={EaaSLogo} alt="EaaS Nexus" className="w-8 h-8" />
                        <span className="text-xl font-bold">EaaS Nexus</span>
                    </div>

                    <InteractiveNav items={navItems} className="hidden md:flex" />

                    <Button
                        onClick={() => navigate('/auth')}
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full px-6"
                    >
                        Get started →
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative py-32 px-6 flex items-center justify-center pointer-events-none [&>*]:pointer-events-auto">
                {/* Floating Cards - Left */}
                <div className="absolute left-10 top-1/4 hidden lg:block animate-float">
                    <Card className="bg-white border-gray-200 backdrop-blur-lg w-64 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4 text-green-500" />
                                </div>
                                <span className="text-sm font-semibold text-black">Energy Usage</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">Solar Panel</span>
                                    <span className="text-green-500 font-medium flex items-center">+<AnimatedNumber value={45} className="text-green-500" /> kWh</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">Battery Storage</span>
                                    <span className="text-green-500 font-medium flex items-center">+<AnimatedNumber value={32} className="text-green-500" /> kWh</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">Grid Consumption</span>
                                    <span className="text-red-500 font-medium flex items-center">-<AnimatedNumber value={12} className="text-red-500" /> kWh</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex space-x-1">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                        <Sun className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                        <Battery className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                        <Wind className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Floating Cards - Right */}
                <div className="absolute right-10 top-1/3 hidden lg:block animate-float-delayed">
                    <Card className="bg-white border-gray-200 backdrop-blur-lg w-72 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-black">Live Savings</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-black">Monthly Savings</div>
                                            <div className="text-xs text-gray-600 flex items-center gap-1">₹<AnimatedNumber value={2340} className="text-gray-600 font-semibold" /> saved</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                            <Leaf className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-black">Carbon Offset</div>
                                            <div className="text-xs text-gray-600 flex items-center gap-1"><AnimatedNumber value={145} className="text-gray-600 font-semibold" /> kg CO₂</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Floating Icon - Top Left */}
                <div className="absolute left-20 top-20 hidden lg:block animate-float">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform border border-gray-200">
                        <Sun className="w-10 h-10 text-yellow-500" />
                    </div>
                </div>

                {/* Floating Icon - Bottom Right */}
                <div className="absolute right-32 bottom-32 hidden lg:block animate-float-delayed">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform border border-gray-200">
                        <Battery className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                {/* Main Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    {/* Dot Matrix Scroll Badge */}
                    <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in">
                        <DotMatrixScroll
                            messages={[
                                { text: "NEW! ZERO UPFRONT COSTS FOR SOLAR AND BATTERY PLANS", link: "/plans" },
                                { text: "INTERACT. GET IN TOUCH FEATURE.", link: "/features" },
                                { text: "SUBSCRIBE TO ENERGY. CENTRALIZE SAVINGS AUTOMATICALLY.", link: "/auth" }
                            ]}
                            dotColor="#22c55e"
                            backgroundColor="#0f172a"
                            speed={50}
                        />
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up">
                        Subscribe to Energy.{' '}
                        <span className="block mt-2">
                            Centralize Savings{' '}
                            <span className="text-green-500">Automatically.</span>
                        </span>
                    </h1>

                    {/* Interactive Divider */}
                    <div className="w-full max-w-2xl mx-auto h-24 flex items-center justify-center animate-fade-in-up">
                        <ElasticLine lineColor="#22c55e" height={100} strokeWidth={4} />
                    </div>

                    {/* Sub-headline */}
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up-delayed">
                        Track and manage energy services with zero upfront costs. Focus on efficiency—connecting power to people.
                    </p>

                    {/* CTA Button with Ripple */}
                    <div className="relative inline-block">
                        <div
                            className="relative overflow-hidden rounded-full"
                            onClick={createRipple}
                        >
                            <Button
                                onClick={() => navigate('/auth')}
                                className="bg-green-500 hover:bg-green-600 text-black font-semibold text-lg px-8 py-6 rounded-full shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 transform hover:scale-105"
                            >
                                Get started - it's free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                            {ripples.map(ripple => (
                                <span
                                    key={ripple.id}
                                    className="absolute bg-white/30 rounded-full animate-ripple"
                                    style={{
                                        left: ripple.x,
                                        top: ripple.y,
                                        width: 0,
                                        height: 0,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-600 mb-4">
                            Features
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Go from high-cost to <span className="text-green-500">sustainable</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-white border-gray-200 backdrop-blur-lg hover:border-green-500/50 transition-all duration-300 group">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                                    <Activity className="w-6 h-6 text-green-500" />
                                </div>
                                <h3 className="font-semibold mb-2 text-black">Centralized energy tracking</h3>
                                <p className="text-sm text-gray-600">for households.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-gray-200 backdrop-blur-lg hover:border-green-500/50 transition-all duration-300 group">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                                    <Bell className="w-6 h-6 text-green-500" />
                                </div>
                                <h3 className="font-semibold mb-2 text-black">Real-time AI alerts</h3>
                                <p className="text-sm text-gray-600">for consumption anomalies.</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-gray-200 backdrop-blur-lg hover:border-green-500/50 transition-all duration-300 group">
                            <CardContent className="p-6 text-center">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors">
                                    <Leaf className="w-6 h-6 text-green-500" />
                                </div>
                                <h3 className="font-semibold mb-2 text-black">Data-backed carbon reduction</h3>
                                <p className="text-sm text-gray-600">metrics.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative py-32 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-600 mb-4">
                            pricing
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black">
                            Pricing so simple,{' '}
                            <span className="block mt-2">you'd buy instantly</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Pay less for what you need. It's reliable, simple, fair for everyone.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {/* Hobby Plan */}
                        <Card className="bg-white border-gray-300 backdrop-blur-lg hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <h3 className="text-sm text-gray-600 mb-2">Hobby</h3>
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-black">.99</span>
                                        <span className="text-gray-600 ml-2">/month</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full mb-6">
                                    Get Hobby
                                </Button>

                                <ul className="space-y-3">
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Access to basic analytics</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Up to 10,000 data points per month</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Email Support</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Community forum access</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Special anytime</span>
                                    </li>
                                </ul>

                                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                    <span className="text-xs text-gray-500">Cancel anytime</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Starter Plan (Featured) */}
                        <Card className="bg-green-500 border-green-400 backdrop-blur-lg transform scale-110 shadow-2xl shadow-green-500/50 relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-white text-green-600 text-xs font-bold px-4 py-1 rounded-full">
                                    POPULAR
                                </span>
                            </div>
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <h3 className="text-sm text-black/70 mb-2">Starter</h3>
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-black">.299</span>
                                        <span className="text-black/70 ml-2">/month</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-white hover:bg-gray-100 text-green-600 font-semibold rounded-full mb-6">
                                    Get Starter
                                </Button>

                                <ul className="space-y-3">
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Advanced Analytics dashboard</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Customizable reports and charts</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Real-time data tracking</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Integration with third-party tools</span>
                                    </li>
                                </ul>

                                <div className="mt-6 pt-6 border-t border-black/20">
                                    <h4 className="text-sm font-semibold text-black mb-3">Access to basic analytics reports</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start space-x-2">
                                            <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-black">Community forum access</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-black">Unlimited Feature</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-black">24/7 Support</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-black">Everything in Hobby Plan</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                                            <span className="text-xs text-black">Cancel anytime</span>
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="bg-white border-gray-300 backdrop-blur-lg hover:border-green-500/50 transition-all duration-300 transform hover:scale-105">
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <h3 className="text-sm text-gray-600 mb-2">Pro</h3>
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-black">.1490</span>
                                        <span className="text-gray-600 ml-2">/month</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full mb-6">
                                    Get Pro
                                </Button>

                                <ul className="space-y-3">
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Unlimited data storage</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Advanced data visualization</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">AI-powered insights</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-black">Dedicated account manager</span>
                                    </li>
                                </ul>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-blue-400">Everything in Hobby Plan</span>
                                        <span className="text-xs text-gray-500">+</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-blue-400">Cancel anytime</span>
                                    </div>
                                </div>

                                <div className="mt-6 text-center">
                                    <span className="text-xs text-gray-500">Cancel anytime</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Bottom Features */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Activity className="w-6 h-6 text-green-500" />
                            </div>
                            <h4 className="font-semibold mb-2 text-black">Centralize system to search for</h4>
                            <p className="text-sm text-gray-600">candidates, easy access to the entire database.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-6 h-6 text-green-500" />
                            </div>
                            <h4 className="font-semibold mb-2 text-black">Accelerated speed to shortlist</h4>
                            <p className="text-sm text-gray-600">candidates, make notes as you scan and decide later.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-green-500" />
                            </div>
                            <h4 className="font-semibold mb-2 text-black">Data is backed up every 2 seconds</h4>
                            <p className="text-sm text-gray-600">so that you never lose a single candidate ever again.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-600 mb-4">
                            FAQ
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-black">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-left">How does EaaS Nexus actually save me money?</AccordionTrigger>
                            <AccordionContent>
                                Our AI analyzes your energy usage patterns in real-time and automatically switches between grid, solar, and battery storage to ensure you're always using the cheapest available energy source. On average, users save 25-40% on their monthly bills.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-left">Do I need to install new hardware?</AccordionTrigger>
                            <AccordionContent>
                                In most cases, EaaS Nexus integrates with your existing smart meter and solar inverter. If you need additional hardware (like a battery), we offer zero-upfront-cost leasing plans included in your subscription.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-left">What happens if the grid goes down?</AccordionTrigger>
                            <AccordionContent>
                                If you have a battery system installed, EaaS Nexus automatically islands your home from the grid and switches to battery backup in milliseconds, keeping your essential appliances running without interruption.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-left">Is my data secure?</AccordionTrigger>
                            <AccordionContent>
                                Absolutely. We use bank-grade encryption for all energy data transmission. Your consumption data is used solely to optimize your savings and is never sold to third parties without your explicit consent.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section >

            {/* Custom Animations */}

        </div >
    );
}
