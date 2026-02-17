import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    User, Settings as SettingsIcon, Power, Home, Download, TrendingUp, TrendingDown,
    Award, FileText, Calendar, BarChart3, PieChart as PieChartIcon, AlertCircle, Lightbulb
} from 'lucide-react';
import {
    PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    applianceConsumption, yearlyComparison, peakUsagePatterns,
    availableReports, neighborComparison,
    type ApplianceConsumption, type PeakUsagePattern, type Report
} from '@/data/mockData';

export default function Analytics({ onLogout }: { onLogout: () => void }) {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const handleDownloadReport = (reportId: string) => {
        alert(`Downloading ${reportId}...`);
        // In production, this would trigger actual PDF download
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
                    <h2 className="text-4xl font-bold mb-3">Detailed Analytics</h2>
                    <p className="text-gray-600 text-lg">Deep insights into your energy consumption patterns and savings opportunities</p>
                </div>

                {/* Period Selector */}
                <div className="mb-6 flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">View Period:</span>
                    <div className="flex gap-2">
                        {['week', 'month', 'year'].map((period) => (
                            <Button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                variant={selectedPeriod === period ? "default" : "outline"}
                                size="sm"
                                className={selectedPeriod === period
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "border-gray-300 text-black hover:bg-gray-100"}
                            >
                                {period.charAt(0).toUpperCase() + period.slice(1)}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Consumption by Appliance */}
                <Card className="border-gray-200 shadow-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <PieChartIcon className="w-6 h-6 mr-2" />
                            Consumption by Appliance
                        </CardTitle>
                        <CardDescription>Breakdown of energy usage by device (Current Month)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Pie Chart */}
                            <div>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={applianceConsumption}
                                            dataKey="consumption"
                                            nameKey="appliance"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label={(entry: any) => `${entry.percentage}%`}
                                        >
                                            {applianceConsumption.map((entry: ApplianceConsumption, index: number) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Appliance List */}
                            <div className="space-y-3">
                                {applianceConsumption.map((item: ApplianceConsumption) => (
                                    <div key={item.appliance} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                                            <div>
                                                <div className="font-semibold text-sm">{item.appliance}</div>
                                                <div className="text-xs text-gray-500">{item.consumption} kWh</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-sm">₹{item.cost}</div>
                                            <div className="text-xs text-gray-500">{item.percentage}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Comparative Analytics */}
                <Card className="border-gray-200 shadow-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <BarChart3 className="w-6 h-6 mr-2" />
                            Comparative Analytics
                        </CardTitle>
                        <CardDescription>Your consumption vs last year and neighborhood average</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={yearlyComparison}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '6px'
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="current" stroke="#000000" strokeWidth={2} name="This Year" />
                                <Line type="monotone" dataKey="lastYear" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Last Year" />
                                <Line type="monotone" dataKey="neighbor" stroke="#3b82f6" strokeWidth={2} strokeDasharray="3 3" name="Neighbor Avg" />
                            </LineChart>
                        </ResponsiveContainer>

                        {/* Comparison Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-green-800">vs Last Year</span>
                                    <TrendingDown className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="text-2xl font-bold text-green-600">-18%</div>
                                <div className="text-xs text-green-700">You're using less energy!</div>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-blue-800">vs Neighbors</span>
                                    <TrendingDown className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="text-2xl font-bold text-blue-600">-16%</div>
                                <div className="text-xs text-blue-700">Better than average!</div>
                            </div>
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-yellow-800">Savings</span>
                                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div className="text-2xl font-bold text-yellow-600">₹5,400</div>
                                <div className="text-xs text-yellow-700">Saved this year</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Peak Usage Patterns */}
                <Card className="border-gray-200 shadow-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <Lightbulb className="w-6 h-6 mr-2" />
                            Peak Usage Patterns & Recommendations
                        </CardTitle>
                        <CardDescription>Optimize your consumption with AI-powered insights</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {peakUsagePatterns.map((pattern: PeakUsagePattern) => (
                                <div
                                    key={pattern.id}
                                    className={`p-4 border-2 rounded-lg ${pattern.priority === 'high'
                                        ? 'border-orange-300 bg-orange-50'
                                        : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="font-semibold text-lg">{pattern.timeSlot}</h4>
                                                {pattern.priority === 'high' && (
                                                    <Badge className="bg-orange-500 text-white">High Impact</Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>Avg: {pattern.avgConsumption} kWh</span>
                                                <span>•</span>
                                                <span>Cost: ₹{pattern.cost}</span>
                                            </div>
                                        </div>
                                        {pattern.savingPotential > 0 && (
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500">Potential Savings</div>
                                                <div className="text-xl font-bold text-green-600">₹{pattern.savingPotential}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={`flex items-start space-x-2 p-3 rounded-md ${pattern.priority === 'high' ? 'bg-white' : 'bg-gray-50'
                                        }`}>
                                        <AlertCircle className={`w-5 h-5 mt-0.5 ${pattern.priority === 'high' ? 'text-orange-600' : 'text-gray-500'
                                            }`} />
                                        <p className="text-sm text-gray-700">{pattern.recommendation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Savings Potential */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-green-800 mb-1">Total Monthly Savings Potential</div>
                                    <div className="text-xs text-green-700">By implementing all high-impact recommendations</div>
                                </div>
                                <div className="text-3xl font-bold text-green-600">
                                    ₹{peakUsagePatterns.reduce((sum: number, p: PeakUsagePattern) => sum + p.savingPotential, 0)}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Neighbor Comparison */}
                <Card className="border-gray-200 shadow-sm mb-8 bg-gradient-to-br from-blue-50 to-white">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <Award className="w-6 h-6 mr-2 text-blue-600" />
                            Neighborhood Ranking
                        </CardTitle>
                        <CardDescription>See how you compare with your neighbors</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-white rounded-lg border-2 border-blue-200">
                                <div className="text-5xl font-bold text-blue-600 mb-2">#{neighborComparison.yourRank}</div>
                                <div className="text-sm text-gray-600">Your Rank</div>
                                <div className="text-xs text-gray-500 mt-1">out of {neighborComparison.totalHomes} homes</div>
                            </div>
                            <div className="text-center p-6 bg-white rounded-lg border-2 border-green-200">
                                <div className="text-5xl font-bold text-green-600 mb-2">{neighborComparison.percentile}%</div>
                                <div className="text-sm text-gray-600">Percentile</div>
                                <div className="text-xs text-gray-500 mt-1">Better than most!</div>
                            </div>
                            <div className="text-center p-6 bg-white rounded-lg border-2 border-yellow-200">
                                <div className="text-5xl font-bold text-yellow-600 mb-2">₹{neighborComparison.savings}</div>
                                <div className="text-sm text-gray-600">Monthly Savings</div>
                                <div className="text-xs text-gray-500 mt-1">vs neighbor avg</div>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
                            <p className="text-blue-800 font-semibold">{neighborComparison.message}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Downloadable Reports */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center">
                            <FileText className="w-6 h-6 mr-2" />
                            Downloadable Reports
                        </CardTitle>
                        <CardDescription>Access detailed PDF reports and certificates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableReports.map((report: Report) => (
                                <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:border-black hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="p-2 bg-gray-100 rounded-lg">
                                                {report.icon === 'file' && <FileText className="w-5 h-5 text-gray-600" />}
                                                {report.icon === 'award' && <Award className="w-5 h-5 text-yellow-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold mb-1">{report.title}</h4>
                                                <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                                    <span>{report.type}</span>
                                                    <span>•</span>
                                                    <span>{report.size}</span>
                                                    <span>•</span>
                                                    <span>{report.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleDownloadReport(report.id)}
                                        variant="outline"
                                        size="sm"
                                        className="w-full border-gray-300 hover:bg-black hover:text-white"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Report
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
