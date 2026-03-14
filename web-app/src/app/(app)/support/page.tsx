'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, Wrench, MessageSquare, Search } from 'lucide-react';

const faqItems = [
    {
        question: "How do I read my energy bill?",
        answer: "Your bill details your consumption in kWh, charges per unit, and any fixed fees. You can find a detailed breakdown in the Billing section."
    },
    {
        question: "What does 'peak hours' mean?",
        answer: "Peak hours are times of high electricity demand, usually in the evening. Energy might cost more during these times. Check your plan details for specifics."
    },
    {
        question: "My smart device is offline. What should I do?",
        answer: "First, check if the device has power and is connected to your Wi-Fi. You can also try restarting it. If the problem persists, run a diagnostic from the Support page."
    },
    {
        question: "How can I lower my monthly bill?",
        answer: "Try reducing consumption during peak hours, using energy-efficient appliances, and checking for any faults reported by our AI."
    }
]

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Support Center</h1>
        <p className="text-muted-foreground">Get help, manage tickets, and find answers.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <LifeBuoy className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold">Contact Support</h3>
            <p className="text-sm text-muted-foreground mb-4">Create a new ticket</p>
            <Button>Submit Ticket</Button>
        </Card>
         <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Wrench className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold">Run Diagnostics</h3>
            <p className="text-sm text-muted-foreground mb-4">Check your device health</p>
            <Button variant="outline">Start Scan</Button>
        </Card>
         <Card className="flex flex-col items-center justify-center p-6 text-center">
            <MessageSquare className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold">My Tickets</h3>
            <p className="text-sm text-muted-foreground mb-4">View your past conversations</p>
            <Button variant="outline">View History</Button>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search FAQs..." className="pl-10" />
            </div>
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
      
    </div>
  );
}
