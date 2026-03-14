
export type ServiceRequest = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  consumption: string;
  areaDescription: string;
  fileNames: string[];
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
};

export type SurveyResult = {
  requestId: string;
  serviceId: string;
  serviceTitle: string;
  consumption: string;
  areaDescription: string;
  fileNames: string[];
  completedAt: string;
};

const STORAGE_KEYS = {
  SERVICE_REQUESTS: 'eaas_service_requests',
  SURVEY_RESULTS: 'eaas_survey_results',
  PROVIDER_NOTIFICATIONS: 'eaas_provider_notifications',
  USER_NOTIFICATIONS: 'eaas_user_notifications',
};

// --- Service Requests (User -> Provider) ---

export function submitServiceRequest(request: Omit<ServiceRequest, 'id' | 'date' | 'status'>): ServiceRequest {
  const newRequest: ServiceRequest = {
    ...request,
    id: `req-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  };

  const existing = getServiceRequests();
  existing.push(newRequest);
  localStorage.setItem(STORAGE_KEYS.SERVICE_REQUESTS, JSON.stringify(existing));

  // Add provider notification
  addProviderNotification(newRequest);

  return newRequest;
}

export function getServiceRequests(): ServiceRequest[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICE_REQUESTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function updateServiceRequestStatus(id: string, status: ServiceRequest['status']): void {
  const requests = getServiceRequests();
  const updated = requests.map(r => r.id === id ? { ...r, status } : r);
  localStorage.setItem(STORAGE_KEYS.SERVICE_REQUESTS, JSON.stringify(updated));
}

// --- Provider Notifications ---

export type ProviderNotification = {
  id: string;
  requestId: string;
  userName: string;
  serviceTitle: string;
  consumption: string;
  fileNames: string[];
  areaDescription: string;
  date: string;
  dismissed: boolean;
};

export function addProviderNotification(request: ServiceRequest): void {
  const notifications = getProviderNotifications();
  const notification: ProviderNotification = {
    id: `pn-${Date.now()}`,
    requestId: request.id,
    userName: 'Alex Doe',
    serviceTitle: request.serviceTitle,
    consumption: request.consumption,
    fileNames: request.fileNames,
    areaDescription: request.areaDescription,
    date: request.date,
    dismissed: false,
  };
  notifications.push(notification);
  localStorage.setItem(STORAGE_KEYS.PROVIDER_NOTIFICATIONS, JSON.stringify(notifications));
}

export function getProviderNotifications(): ProviderNotification[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROVIDER_NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function dismissProviderNotification(id: string): void {
  const notifications = getProviderNotifications();
  const updated = notifications.map(n => n.id === id ? { ...n, dismissed: true } : n);
  localStorage.setItem(STORAGE_KEYS.PROVIDER_NOTIFICATIONS, JSON.stringify(updated));
}

// --- User Notifications ---

export type UserNotification = {
  id: string;
  message: string;
  type: 'survey-complete' | 'info';
  dismissed: boolean;
  createdAt: string;
};

export function addUserNotification(message: string, type: UserNotification['type'] = 'info'): void {
  const notifications = getUserNotifications();
  notifications.push({
    id: `un-${Date.now()}`,
    message,
    type,
    dismissed: false,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEYS.USER_NOTIFICATIONS, JSON.stringify(notifications));
}

export function getUserNotifications(): UserNotification[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function dismissUserNotification(id: string): void {
  const notifications = getUserNotifications();
  const updated = notifications.map(n => n.id === id ? { ...n, dismissed: true } : n);
  localStorage.setItem(STORAGE_KEYS.USER_NOTIFICATIONS, JSON.stringify(updated));
}

// --- Survey Results (Provider -> User Billing) ---
// Now stores raw data only — Gemini generates the billing plan at render time

export function completeSurvey(request: ServiceRequest): SurveyResult {
  const result: SurveyResult = {
    requestId: request.id,
    serviceId: request.serviceId,
    serviceTitle: request.serviceTitle,
    consumption: request.consumption,
    areaDescription: request.areaDescription,
    fileNames: request.fileNames,
    completedAt: new Date().toISOString(),
  };

  const existing = getSurveyResults();
  existing.push(result);
  localStorage.setItem(STORAGE_KEYS.SURVEY_RESULTS, JSON.stringify(existing));

  return result;
}

export function getSurveyResults(): SurveyResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SURVEY_RESULTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
