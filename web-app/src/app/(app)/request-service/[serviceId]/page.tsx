
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

const getBenefits = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('audit')) return [
    'Identify major energy hogs in your facility or home.',
    'Get actionable recommendations to reduce bills by up to 20%.',
    'Expert technician visit and detailed consumption report.'
  ];
  if (t.includes('hvac')) return [
    'Cut cooling costs significantly during peak summer months.',
    'Increase the lifespan of your A/C and ventilation systems.',
    'Improve indoor air quality and overall comfort.'
  ];
  if (t.includes('inverter')) return [
    'Optimize power backup duration based on your exact usage.',
    'Prevent battery degradation from improper charging cycles.',
    'Lower maintenance costs and reduce grid dependency.'
  ];
  if (t.includes('battery')) return [
    'Early detection of battery issues before catastrophic failure.',
    'Extend overall battery life by 1-2 years with proactive care.',
    'Ensure 100% reliability during unexpected power cuts.'
  ];
  if (t.includes('solar')) return [
    'Dramatically reduce or eliminate your electricity bills.',
    'Increase your property value with permanent green infrastructure.',
    'Hassle-free expansion handled from permits to installation.'
  ];
  return [
    'Gain better energy efficiency and sustainability.',
    'Lower your monthly operational costs.',
    'Expert consultation and tailored solutions.'
  ];
};

const getImageForService = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('audit')) return '/assets/lighting.jpg';
  if (t.includes('hvac')) return '/assets/cooling.jpg';
  if (t.includes('inverter')) return '/assets/lighting.jpg';
  if (t.includes('battery')) return '/assets/battery-backup.jpg';
  if (t.includes('solar')) return '/assets/solar.jpg';
  return '/assets/solar.jpg';
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
              
              {/* Dynamic Algorithm Output */}
              {getEstimatedImpact(service.title, consumption) && (
                <div className="mt-3 p-4 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-primary">
                      {getEstimatedImpact(service.title, consumption)?.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getEstimatedImpact(service.title, consumption)?.sub}
                    </p>
                  </div>
                  <div className="text-xl font-bold font-headline text-primary text-right">
                    {getEstimatedImpact(service.title, consumption)?.value}
                  </div>
                </div>
              )}
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
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-2/5 aspect-video md:aspect-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={getImageForService(service.title)} 
              alt={`${service.title} benefits`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/90 md:from-background/60 to-transparent flex items-end md:items-center p-6">
              <h3 className="font-headline text-2xl font-bold text-white drop-shadow-md">
                Why get this?
              </h3>
            </div>
          </div>
          <div className="p-6 md:w-3/5 bg-card flex flex-col justify-center">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-primary flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Key Benefits
              </h4>
              <ul className="space-y-3">
                {getBenefits(service.title).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary mt-0.5 shadow-md">
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="leading-snug pt-0.5">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
