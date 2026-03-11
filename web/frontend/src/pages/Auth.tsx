
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import EaaSLogo from '@/assets/EnergyAsASeriveLogo.svg'
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import ElasticLine from "@/components/ui/elastic-line"

import { ModernButton } from "@/components/ui/modern-button"

export default function Auth({ onLogin }: { onLogin: (role: string) => void }) {
    const navigate = useNavigate()

    const handleRoleAuth = (selectedRole: string) => {
        onLogin(selectedRole)
        navigate("/")
    }

    return (
        <div className="w-full h-screen flex bg-white text-black overflow-hidden relative">
            {/* Back to Home Button */}
            <div className="absolute top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
            </div>

            {/* Left Side - Visuals */}
            <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center relative overflow-hidden text-center p-12">
                <div className="absolute inset-0 z-0 opacity-50">
                    <BackgroundRippleEffect />
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4">
                            <img src={EaaSLogo} alt="EaaS Nexus" className="w-full h-full" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-6 text-black tracking-tight leading-tight">
                        Energy As A Service
                    </h1>

                    <div className="w-full h-24 flex items-center justify-center">
                        <ElasticLine className="w-full" lineColor="#22c55e" height={80} strokeWidth={3} />
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed mt-4">
                        Sustainable, reliable, and affordable power for everyone. Join the future grid today.
                    </p>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center lg:hidden mb-8">
                        <img src={EaaSLogo} alt="EaaS Nexus" className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-black">EaaS Nexus</h2>
                    </div>

                    <Card className="border-gray-200 shadow-2xl bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600" />

                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center text-black">Welcome Back</CardTitle>
                            <CardDescription className="text-center text-gray-500">
                                Access your energy dashboard
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="login" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-gray-100 mb-6">
                                    <TabsTrigger
                                        value="login"
                                        className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm transition-all"
                                    >
                                        Login
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="signup"
                                        className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm transition-all"
                                    >
                                        Sign Up
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="login" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="user@example.com"
                                            className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 pt-2">
                                        <ModernButton variant="black" onClick={() => handleRoleAuth("Resident")}>
                                            Login as Resident
                                        </ModernButton>
                                        <ModernButton variant="white" onClick={() => handleRoleAuth("Authority")}>
                                            Login as Authority
                                        </ModernButton>
                                    </div>
                                </TabsContent>

                                <TabsContent value="signup" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="s-email">Email</Label>
                                            <Input
                                                id="s-email"
                                                type="email"
                                                placeholder="user@example.com"
                                                className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="s-password">Password</Label>
                                        <Input
                                            id="s-password"
                                            type="password"
                                            className="bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500/20"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3 pt-4">
                                        <ModernButton variant="black" onClick={() => handleRoleAuth("Resident")}>
                                            Sign Up as Resident
                                        </ModernButton>
                                        <ModernButton variant="white" onClick={() => handleRoleAuth("Authority")}>
                                            Sign Up as Authority
                                        </ModernButton>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                        <CardFooter className="justify-center border-t border-gray-100 pt-4 bg-gray-50/50">
                            <p className="text-xs text-gray-400 hover:text-green-600 cursor-pointer transition-colors">By continuing, you agree to our Terms of Service.</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
