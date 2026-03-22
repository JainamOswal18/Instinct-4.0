
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchServices, submitServiceRequest as submitServiceRequestApi } from '@/lib/customer-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Upload, ChevronLeft, CheckCircle2, X, FileText, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type UploadedFile = {
  file: File;
  previewUrl: string | null;
};

type ServiceCatalogItem = {
  id: string;
  title: string;
  description: string;
  imageId: string;
};

function easeOutExp(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

const AnimatedNumber = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(value.replace(/\d/g, '0'));

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;
    
    const numbersInString = Array.from(value.matchAll(/\d+/g)).map(m => ({
      val: parseFloat(m[0]),
      index: m.index!,
      length: m[0].length
    }));
    
    if (numbersInString.length === 0) {
      setDisplayValue(value);
      return;
    }

    let animationFrameId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = easeOutExp(progress);
      
      let currentString = value;
      for (let i = numbersInString.length - 1; i >= 0; i--) {
        const num = numbersInString[i];
        const currentNum = Math.floor(num.val * easeProgress);
        currentString = currentString.slice(0, num.index) + currentNum + currentString.slice(num.index + num.length);
      }
      
      setDisplayValue(currentString);
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{displayValue}</span>;
};

const getCostReduction = (title: string) => {
  const t = title.toLowerCase();
  
  if (t.includes('solar')) return {
    how: 'By generating your own electricity locally, you offset nearly your entire grid dependence and lock in low rates for decades.'
  };
  if (t.includes('hvac')) return {
    how: 'By optimizing cooling cycles and reducing compressor workload during peak summer heat, significantly lowering massive AC consumption.'
  };
  if (t.includes('audit')) return {
    how: 'By identifying hidden energy hogs, fixing power leaks, and providing actionable lifestyle and hardware adjustments.'
  };
  if (t.includes('inverter')) return {
    how: 'By reducing charging conversion losses and maximizing the efficiency of your backup power to avoid peak-hour grid draws.'
  };
  if (t.includes('battery')) return {
    title: 'Expected Cost Reduction',
    how: 'By extending battery pack lifespan and slashing expensive replacement frequency through AI-driven preventative diagnostics.'
  };
  
  return {
    how: 'By comprehensively analyzing and upgrading your core electrical infrastructure to operate at maximum efficiency.'
  };
};

const getEstimatedImpact = (title: string, consumptionStr: string) => {
  const c = Number(consumptionStr);
  if (!c || c <= 0) return null;
  
  const t = title.toLowerCase();
  
  // 1 kWp solar = ~120 kWh/month generation in typical Indian conditions.
  if (t.includes('solar')) {
    const kw = Math.max(1, Math.round((c / 120) * 10) / 10);
    return {
      label: 'Target System Size',
      value: `${kw} kWp`,
      sub: `Offsets ~100% of your ${c} kWh usage`
    };
  }
  
  // HVAC takes ~40-50% of home energy. Tuning saves ~20% of HVAC = ~8-10% of total.
  if (t.includes('hvac')) {
    const savings = Math.round(c * 0.10);
    return {
      label: 'Est. Cooling Savings',
      value: `~${savings} kWh/mo`,
      sub: 'Based on 10% average total efficiency gain'
    };
  }
  
  // Energy Audit usually uncovers 15-20% waste
  if (t.includes('audit')) {
    const savings = Math.round(c * 0.15);
    return {
      label: 'Potential Waste Identified',
      value: `~${savings} kWh/mo`,
      sub: 'Based on typical 15% home energy waste'
    };
  }

  // Smart Inverter saves ~5% from better charging/discharging logic
  if (t.includes('inverter')) {
    const savings = Math.round(c * 0.05);
    return {
      label: 'Est. Efficiency Gain',
      value: `~${savings} kWh/mo`,
      sub: 'Reduced conversion & charging loss'
    };
  }

  // Battery health extends life, doesn't directly save kWh.
  if (t.includes('battery')) {
    return {
      label: 'Est. Battery Life Extension',
      value: '+20-30%',
      sub: 'With regular proactive health diagnostics'
    };
  }

  return null;
};

export default function RequestServicePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [consumption, setConsumption] = useState('');
  const [areaDescription, setAreaDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [services, setServices] = useState<ServiceCatalogItem[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchServices()
      .then((result) => setServices(result.services))
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to load services',
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      })
      .finally(() => setIsLoadingServices(false));
  }, []);

  const service = services.find(s => s.id === params.serviceId);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach(file => {
      // Check for duplicates
      if (uploadedFiles.some(uf => uf.file.name === file.name && uf.file.size === file.size)) {
        toast({
          variant: 'destructive',
          title: 'Duplicate file',
          description: `${file.name} is already uploaded.`,
        });
        return;
      }

      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: `${file.name} is not a supported format.`,
        });
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: `${file.name} exceeds the 10MB limit.`,
        });
        return;
      }

      const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      newFiles.push({ file, previewUrl });
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, [uploadedFiles, toast]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const removed = prev[index];
      if (removed.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  if (isLoadingServices) {
    return <div className="p-8 text-center">Loading service...</div>;
  }

  if (!service) {
    return <div className="p-8 text-center">Service not found.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consumption) {
      toast({ variant: 'destructive', title: 'Missing field', description: 'Please enter your energy consumption.' });
      return;
    }
    if (!areaDescription) {
      toast({ variant: 'destructive', title: 'Missing field', description: 'Please describe the installation area.' });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitServiceRequestApi({
        serviceId: service.id,
        consumption: Number(consumption),
        areaDescription,
        files: uploadedFiles.map(uf => ({
          fileName: uf.file.name,
          mimeType: uf.file.type,
          sizeBytes: uf.file.size,
        })),
      });
      setIsSubmitted(true);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Request submission failed',
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <CheckCircle2 className="relative h-16 w-16 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-headline">Request Submitted!</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Your request for <span className="text-primary font-semibold">{service.title}</span> has been sent to our energy provider team. They&apos;ll begin the survey process shortly.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/dashboard">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Energy Portal
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Request {service.title}</CardTitle>
          <CardDescription>Please provide details about your area and energy usage to help us prepare a custom solution.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="consumption">Past Month Energy Consumption (kWh)</Label>
              <Input 
                id="consumption" 
                placeholder="e.g. 450" 
                type="number" 
                required 
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Find this on your most recent utility bill.</p>
              

            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Installation Area Description</Label>
              <Textarea 
                id="area" 
                placeholder="Describe the area (roof size, yard space, electrical room location, etc.)" 
                required 
                className="min-h-[100px]"
                value={areaDescription}
                onChange={(e) => setAreaDescription(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Area Photos</Label>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4 transition-colors cursor-pointer ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className={`h-10 w-10 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WEBP or PDF (MAX. 10MB)</p>
                </div>
                <Input 
                  ref={fileInputRef}
                  type="file" 
                  multiple 
                  className="hidden" 
                  id="photo-upload" 
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Button 
                  variant="secondary" 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Select Files
                </Button>
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} uploaded
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {uploadedFiles.map((uf, index) => (
                      <div 
                        key={`${uf.file.name}-${index}`} 
                        className="group relative rounded-lg border bg-card overflow-hidden"
                      >
                        {/* Preview */}
                        {uf.previewUrl ? (
                          <div className="relative aspect-square">
                            <Image 
                              src={uf.previewUrl} 
                              alt={uf.file.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square flex items-center justify-center bg-muted/50">
                            <FileText className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}

                        {/* File info overlay */}
                        <div className="p-2 space-y-0.5">
                          <p className="text-xs font-medium truncate" title={uf.file.name}>
                            {uf.file.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatFileSize(uf.file.size)}
                          </p>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-destructive/90 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Benefits Card Below the form */}
      <Card className="overflow-hidden border-primary/20 shadow-lg">
        <div className="flex flex-col">
          <div className="p-8 w-full bg-card flex flex-col justify-center items-center text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-headline text-xl md:text-2xl font-bold text-foreground">
              {getCostReduction(service.title).title || 'Expected Cost Reduction'}
            </h4>
            <div className="text-5xl md:text-6xl font-black text-primary tracking-tighter drop-shadow-sm tabular-nums">
              <AnimatedNumber value="30%" />
            </div>
            <div className="space-y-3 pt-2">
               <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">How it works</span>
               <p className="text-muted-foreground max-w-sm mx-auto text-sm md:text-base leading-relaxed">
                 {getCostReduction(service.title).how}
               </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
