import { Button } from "@/components/ui/button"
import { Power, Shield, BarChart2 } from "lucide-react"

// Import the comprehensive ResidentDashboard from separate file
export { ResidentDashboard } from './ResidentDashboard';

export function AuthorityDashboard({ onLogout }: { onLogout: () => void }) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 border-[2px] border-[#3e2723] relative">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_var(--tw-gradient-stops))] from-[#3e2723]/10 via-black to-black" />

            <div className="z-10 flex flex-col items-center text-center space-y-8 animate-in fade-in duration-700">
                <div className="p-4 bg-[#3e2723]/30 rounded-full border border-[#3e2723] shadow-[0_0_30px_rgba(62,39,35,0.5)]">
                    <Shield className="w-16 h-16 text-[#8d6e63]" />
                </div>

                <h1 className="text-5xl font-bold text-[#8d6e63]">
                    Authority Dashboard
                </h1>

                <div className="p-8 border border-[#3e2723] backdrop-blur-md bg-black/80 rounded-xl max-w-md w-full shadow-2xl shadow-[#3e2723]/20">
                    <div className="flex items-center justify-center space-x-2 text-[#8d6e63] mb-4">
                        <BarChart2 className="w-6 h-6" />
                        <span className="font-mono text-sm uppercase tracking-widest">System Status: Active</span>
                    </div>

                    <p className="mb-8 text-zinc-500 text-lg">
                        Authorized Personnel Only. <br />
                        Grid synchronization and net-metering logs.
                    </p>

                    <Button
                        onClick={onLogout}
                        variant="outline"
                        className="w-full h-12 text-lg font-bold border-[#3e2723] text-[#8d6e63] hover:bg-[#3e2723] hover:text-white transition-all duration-300"
                    >
                        <Power className="w-5 h-5 mr-2" /> Terminate Session
                    </Button>
                </div>
            </div>
        </div>
    )
}
