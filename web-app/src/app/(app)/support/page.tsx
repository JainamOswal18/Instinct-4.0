'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, Wrench, MessageSquare, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchSupportFaqs } from '@/lib/customer-api';

export default function SupportPage() {
    const { toast } = useToast();
    const [faqItems, setFaqItems] = useState<Array<{ id: string; question: string; answer: string }>>([]);

    useEffect(() => {
        fetchSupportFaqs()
            .then((result) => setFaqItems(result.faqs))
            .catch((error) => {
                toast({
                    variant: 'destructive',
                    title: 'Failed to load FAQs',
                    description: error instanceof Error ? error.message : 'Unknown error',
                });
            });
    }, []);

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
                    <AccordionItem key={item.id} value={`item-${index}`}>
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
