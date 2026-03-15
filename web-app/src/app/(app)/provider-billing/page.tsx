'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  getBillingDrafts,
  approveBillingDraft,
  addUserNotification,
  type BillingDraft,
  type BillingPlan,
} from '@/lib/notifications';
import {
  FileText, Edit3, CheckCircle, Send, Sparkles, IndianRupee,
  Zap, Wrench, ShieldCheck, Cpu, TrendingDown, CalendarClock,
  Plus, Trash2, User, Clock,
} from 'lucide-react';

export default function ProviderBillingPage() {
  const { toast } = useToast();
  const [drafts, setDrafts] = useState<BillingDraft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<BillingDraft | null>(null);
  const [editPlan, setEditPlan] = useState<BillingPlan | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [newChargeLabel, setNewChargeLabel] = useState('');
  const [newChargeAmount, setNewChargeAmount] = useState('');
  const [newChargeRecurring, setNewChargeRecurring] = useState(true);

  useEffect(() => {
    loadDrafts();
  }, []);

  const loadDrafts = () => {
    setDrafts(getBillingDrafts());
  };

  const openEditor = (draft: BillingDraft) => {
    setSelectedDraft(draft);
    setEditPlan(JSON.parse(JSON.stringify(draft.generatedPlan)));
    setShowEditor(true);
  };

  const updateField = (field: keyof BillingPlan, value: any) => {
    if (!editPlan) return;
    setEditPlan({ ...editPlan, [field]: value });
  };

  const updateSpec = (field: string, value: string) => {
    if (!editPlan) return;
    setEditPlan({
      ...editPlan,
      specifications: { ...editPlan.specifications, [field]: value },
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editPlan) return;
    const features = [...editPlan.features];
    features[index] = value;
    setEditPlan({ ...editPlan, features });
  };

  const addFeature = () => {
    if (!editPlan) return;
    setEditPlan({ ...editPlan, features: [...editPlan.features, 'New feature'] });
  };

  const removeFeature = (index: number) => {
    if (!editPlan) return;
    const features = editPlan.features.filter((_, i) => i !== index);
    setEditPlan({ ...editPlan, features });
  };

  const addCustomCharge = () => {
    if (!editPlan || !newChargeLabel || !newChargeAmount) return;
    const charges = editPlan.customCharges || [];
    charges.push({ label: newChargeLabel, amount: parseFloat(newChargeAmount), recurring: newChargeRecurring });
    setEditPlan({ ...editPlan, customCharges: charges });
    setNewChargeLabel('');
    setNewChargeAmount('');
  };

  const removeCustomCharge = (index: number) => {
    if (!editPlan) return;
    const charges = (editPlan.customCharges || []).filter((_, i) => i !== index);
    setEditPlan({ ...editPlan, customCharges: charges });
  };

  const recalcTotal = () => {
    if (!editPlan) return;
    const base = (editPlan.monthlyServiceCharge || 0) + (editPlan.maintenanceFee || 0);
    const customRecurring = (editPlan.customCharges || []).filter(c => c.recurring).reduce((s, c) => s + c.amount, 0);
    setEditPlan({ ...editPlan, totalMonthly: base + customRecurring });
  };

  const handleApprove = () => {
    if (!selectedDraft || !editPlan) return;
    // Recalculate total before approving
    const base = (editPlan.monthlyServiceCharge || 0) + (editPlan.maintenanceFee || 0);
    const customRecurring = (editPlan.customCharges || []).filter(c => c.recurring).reduce((s, c) => s + c.amount, 0);
    const finalPlan = { ...editPlan, totalMonthly: base + customRecurring };

    approveBillingDraft(selectedDraft.id, finalPlan);
    addUserNotification(
      `Great news! Your custom billing plan for "${selectedDraft.serviceTitle}" is ready. Visit the Billing section to review and accept your plan.`,
      'billing-ready'
    );
    setShowEditor(false);
    setSelectedDraft(null);
    setEditPlan(null);
    loadDrafts();
    toast({
      title: 'Bill Approved & Sent',
      description: `${selectedDraft.customerName} has been notified about their billing plan.`,
    });
  };

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const pendingDrafts = drafts.filter(d => d.status === 'draft');
  const approvedDrafts = drafts.filter(d => d.status !== 'draft');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft': return <Badge variant="outline" className="text-amber-500 border-amber-500/30"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case 'provider-approved': return <Badge className="bg-blue-500/20 text-blue-400"><Send className="h-3 w-3 mr-1" />Sent to Customer</Badge>;
      case 'user-accepted': return <Badge className="bg-green-500/20 text-green-400"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case 'user-disputed': return <Badge variant="destructive"><FileText className="h-3 w-3 mr-1" />Disputed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Billing Review</h1>
        <p className="text-muted-foreground">Review AI-generated billing drafts, edit, and approve before sending to customers.</p>
      </div>

      {/* === Pending Drafts === */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Pending Review ({pendingDrafts.length})
        </h2>

        {pendingDrafts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold">All Caught Up!</h3>
              <p className="text-sm text-muted-foreground">No billing drafts pending review. Complete a survey to generate one.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {pendingDrafts.map(draft => (
              <Card key={draft.id} className="border-amber-500/30 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => openEditor(draft)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{draft.generatedPlan.planName}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="h-3 w-3" /> {draft.customerName} • {draft.serviceTitle}
                      </CardDescription>
                    </div>
                    {getStatusBadge(draft.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{draft.generatedPlan.summary}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Monthly</p>
                      <p className="text-xl font-bold">{formatINR(draft.generatedPlan.totalMonthly)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Installation</p>
                      <p className="text-lg font-semibold">{formatINR(draft.generatedPlan.installationCost)}</p>
                    </div>
                  </div>
                  <Button className="w-full gap-2" onClick={(e) => { e.stopPropagation(); openEditor(draft); }}>
                    <Edit3 className="h-4 w-4" /> Review & Edit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* === Approved / Processed === */}
      {approvedDrafts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sent Bills ({approvedDrafts.length})</h2>
          <div className="grid gap-3">
            {approvedDrafts.map(draft => (
              <Card key={draft.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{draft.generatedPlan.planName}</p>
                      <p className="text-sm text-muted-foreground">{draft.customerName} — {draft.serviceTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{formatINR(draft.generatedPlan.totalMonthly)}/mo</p>
                      <p className="text-xs text-muted-foreground">{draft.approvedAt ? new Date(draft.approvedAt).toLocaleDateString() : ''}</p>
                    </div>
                    {getStatusBadge(draft.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* === Edit Dialog === */}
      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              Edit Billing Plan
              <Badge variant="outline" className="text-[10px] gap-1">
                <Sparkles className="h-2.5 w-2.5" /> AI-Generated Draft
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Review and modify the AI-generated plan for {selectedDraft?.customerName}. All fields are editable.
            </DialogDescription>
          </DialogHeader>

          {editPlan && (
            <div className="space-y-6 py-4">
              {/* Plan Name & Summary */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Plan Name</Label>
                  <Input value={editPlan.planName} onChange={e => updateField('planName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Summary</Label>
                  <Input value={editPlan.summary} onChange={e => updateField('summary', e.target.value)} />
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> Pricing
                </h3>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Zap className="h-3 w-3" /> Installation Cost</Label>
                    <Input type="number" value={editPlan.installationCost} onChange={e => updateField('installationCost', parseFloat(e.target.value) || 0)} />
                    <p className="text-[10px] text-muted-foreground">One-time</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Service</Label>
                    <Input type="number" value={editPlan.monthlyServiceCharge} onChange={e => { updateField('monthlyServiceCharge', parseFloat(e.target.value) || 0); }} />
                    <p className="text-[10px] text-muted-foreground">/month</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><Wrench className="h-3 w-3" /> Maintenance Fee</Label>
                    <Input type="number" value={editPlan.maintenanceFee} onChange={e => { updateField('maintenanceFee', parseFloat(e.target.value) || 0); }} />
                    <p className="text-[10px] text-muted-foreground">/month</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Payback (months)</Label>
                    <Input type="number" value={editPlan.paybackPeriodMonths} onChange={e => updateField('paybackPeriodMonths', parseInt(e.target.value) || 0)} />
                  </div>
                </div>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-green-500" /> Estimated Monthly Savings</Label>
                    <Input type="number" value={editPlan.estimatedMonthlySavings} onChange={e => updateField('estimatedMonthlySavings', parseFloat(e.target.value) || 0)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Calculated Total Monthly</Label>
                    <div className="flex items-center gap-2">
                      <Input value={formatINR((editPlan.monthlyServiceCharge || 0) + (editPlan.maintenanceFee || 0) + ((editPlan.customCharges || []).filter(c => c.recurring).reduce((s, c) => s + c.amount, 0)))} disabled className="font-bold" />
                      <Button type="button" variant="outline" size="sm" onClick={recalcTotal}>Recalculate</Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Custom Charges */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Custom Charges
                </h3>
                {(editPlan.customCharges || []).map((charge, i) => (
                  <div key={i} className="flex items-center gap-3 mb-2">
                    <Input value={charge.label} className="flex-1" onChange={e => {
                      const charges = [...(editPlan.customCharges || [])];
                      charges[i] = { ...charges[i], label: e.target.value };
                      updateField('customCharges', charges);
                    }} />
                    <Input type="number" value={charge.amount} className="w-28" onChange={e => {
                      const charges = [...(editPlan.customCharges || [])];
                      charges[i] = { ...charges[i], amount: parseFloat(e.target.value) || 0 };
                      updateField('customCharges', charges);
                    }} />
                    <Badge variant={charge.recurring ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => {
                      const charges = [...(editPlan.customCharges || [])];
                      charges[i] = { ...charges[i], recurring: !charges[i].recurring };
                      updateField('customCharges', charges);
                    }}>{charge.recurring ? 'Monthly' : 'One-time'}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => removeCustomCharge(i)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-3 mt-2">
                  <Input placeholder="Charge label" value={newChargeLabel} onChange={e => setNewChargeLabel(e.target.value)} className="flex-1" />
                  <Input type="number" placeholder="Amount" value={newChargeAmount} onChange={e => setNewChargeAmount(e.target.value)} className="w-28" />
                  <Badge variant={newChargeRecurring ? 'default' : 'outline'} className="cursor-pointer whitespace-nowrap" onClick={() => setNewChargeRecurring(!newChargeRecurring)}>
                    {newChargeRecurring ? 'Monthly' : 'One-time'}
                  </Badge>
                  <Button variant="outline" size="icon" onClick={addCustomCharge}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Specifications */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Cpu className="h-4 w-4" /> System Specifications
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>System Capacity</Label>
                    <Input value={editPlan.specifications.systemCapacity} onChange={e => updateSpec('systemCapacity', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Generation</Label>
                    <Input value={editPlan.specifications.expectedGeneration} onChange={e => updateSpec('expectedGeneration', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Warranty Period</Label>
                    <Input value={editPlan.specifications.warrantyPeriod} onChange={e => updateSpec('warrantyPeriod', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Equipment Details</Label>
                    <Input value={editPlan.specifications.equipmentDetails} onChange={e => updateSpec('equipmentDetails', e.target.value)} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Included Features
                </h3>
                {editPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <Input value={feature} onChange={e => updateFeature(i, e.target.value)} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => removeFeature(i)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="gap-2 mt-1" onClick={addFeature}>
                  <Plus className="h-3 w-3" /> Add Feature
                </Button>
              </div>

              <Separator />

              {/* Rationale */}
              <div className="space-y-2">
                <Label>AI Rationale</Label>
                <Input value={editPlan.rationale} onChange={e => updateField('rationale', e.target.value)} />
              </div>
            </div>
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setShowEditor(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleApprove} className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" /> Approve & Send to Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
