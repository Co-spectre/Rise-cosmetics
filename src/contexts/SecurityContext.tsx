import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Two-Factor Authentication Interface
export interface TwoFactorAuth {
  isEnabled: boolean;
  method: 'sms' | 'email' | 'authenticator' | 'backup_codes';
  backupCodes: string[];
  lastUsed?: Date;
  setup: {
    qrCode?: string;
    secret?: string;
    verificationCode?: string;
  };
}

// Security Event Interface
export interface SecurityEvent {
  id: string;
  userId: string;
  type: 'login' | 'logout' | 'password_change' | 'account_locked' | 'suspicious_activity' | 'data_access' | 'payment_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: {
    ipAddress: string;
    userAgent: string;
    location?: string;
    deviceFingerprint?: string;
    additionalData?: Record<string, any>;
  };
  timestamp: Date;
  resolved: boolean;
  actions: string[];
}

// Fraud Detection Interface
export interface FraudDetection {
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: Array<{
    type: string;
    score: number;
    description: string;
  }>;
  recommendations: string[];
  requiresManualReview: boolean;
  blockedReason?: string;
}

// Security Audit Log
export interface SecurityAuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  details: Record<string, any>;
  sensitive: boolean;
}

// GDPR Consent Interface
export interface GDPRConsent {
  id: string;
  userId: string;
  consentType: 'marketing' | 'analytics' | 'functional' | 'necessary';
  granted: boolean;
  timestamp: Date;
  ipAddress: string;
  version: string;
  source: 'registration' | 'cookie_banner' | 'profile_settings' | 'checkout';
  withdrawnAt?: Date;
}

// Data Privacy Request
export interface DataPrivacyRequest {
  id: string;
  userId: string;
  type: 'access' | 'rectification' | 'erasure' | 'portability' | 'restriction' | 'objection';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestedAt: Date;
  completedAt?: Date;
  description: string;
  attachments?: string[];
  processingNotes?: string;
  legalBasis?: string;
}

// Security Configuration
export interface SecurityConfig {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    preventReuse: number;
    maxAge: number; // in days
  };
  sessionPolicy: {
    maxDuration: number; // in minutes
    inactivityTimeout: number; // in minutes
    maxConcurrentSessions: number;
    requireReauth: boolean;
  };
  rateLimiting: {
    loginAttempts: { max: number; window: number }; // max attempts per window (minutes)
    apiRequests: { max: number; window: number };
    passwordReset: { max: number; window: number };
  };
  fraudDetection: {
    enabled: boolean;
    thresholds: {
      lowRisk: number;
      mediumRisk: number;
      highRisk: number;
    };
    blockedCountries: string[];
    vpnDetection: boolean;
  };
}

// PCI DSS Compliance Data
export interface PCICompliance {
  level: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4';
  lastAssessment: Date;
  nextAssessment: Date;
  requirements: Array<{
    id: string;
    description: string;
    status: 'compliant' | 'non_compliant' | 'not_applicable';
    lastChecked: Date;
    evidence?: string;
  }>;
  vulnerabilities: Array<{
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    status: 'open' | 'mitigated' | 'resolved';
    discoveredAt: Date;
    resolvedAt?: Date;
  }>;
}

// Security Context
interface SecurityContextType {
  // Two-Factor Authentication
  twoFactorAuth: TwoFactorAuth;
  enable2FA: (method: 'sms' | 'email' | 'authenticator') => Promise<{ qrCode?: string; secret?: string }>;
  verify2FA: (code: string, method: 'sms' | 'email' | 'authenticator' | 'backup_codes') => Promise<boolean>;
  disable2FA: (password: string) => Promise<void>;
  generateBackupCodes: () => Promise<string[]>;
  
  // Security Events & Monitoring
  securityEvents: SecurityEvent[];
  logSecurityEvent: (event: Omit<SecurityEvent, 'id' | 'timestamp'>) => Promise<void>;
  getSecurityEvents: (userId?: string, type?: string, severity?: string) => SecurityEvent[];
  resolveSecurityEvent: (eventId: string, notes: string) => Promise<void>;
  
  // Fraud Detection
  fraudDetection: FraudDetection | null;
  analyzeTransaction: (transactionData: any) => Promise<FraudDetection>;
  reportFraud: (orderId: string, reason: string) => Promise<void>;
  whitelistUser: (userId: string, reason: string) => Promise<void>;
  blacklistUser: (userId: string, reason: string) => Promise<void>;
  
  // Security Audit Logging
  auditLogs: SecurityAuditLog[];
  logAuditEvent: (event: Omit<SecurityAuditLog, 'id' | 'timestamp'>) => Promise<void>;
  getAuditLogs: (filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
  }) => SecurityAuditLog[];
  exportAuditLogs: (startDate: Date, endDate: Date) => Promise<Blob>;
  
  // GDPR Compliance
  gdprConsents: GDPRConsent[];
  recordConsent: (consent: Omit<GDPRConsent, 'id' | 'timestamp'>) => Promise<void>;
  withdrawConsent: (consentId: string) => Promise<void>;
  getConsentHistory: (userId: string) => GDPRConsent[];
  
  // Data Privacy Requests
  privacyRequests: DataPrivacyRequest[];
  submitPrivacyRequest: (request: Omit<DataPrivacyRequest, 'id' | 'status' | 'requestedAt'>) => Promise<DataPrivacyRequest>;
  processPrivacyRequest: (requestId: string, action: 'approve' | 'reject', notes: string) => Promise<void>;
  exportUserData: (userId: string) => Promise<Blob>;
  deleteUserData: (userId: string, retentionPeriod?: number) => Promise<void>;
  
  // Security Configuration
  securityConfig: SecurityConfig;
  updateSecurityConfig: (config: Partial<SecurityConfig>) => Promise<void>;
  testSecurityConfig: () => Promise<{ valid: boolean; issues: string[] }>;
  
  // Rate Limiting
  checkRateLimit: (action: string, identifier: string) => Promise<{ allowed: boolean; remaining: number; resetTime: Date }>;
  incrementRateLimit: (action: string, identifier: string) => Promise<void>;
  resetRateLimit: (action: string, identifier: string) => Promise<void>;
  
  // PCI DSS Compliance
  pciCompliance: PCICompliance;
  runComplianceCheck: () => Promise<void>;
  updateComplianceStatus: (requirementId: string, status: 'compliant' | 'non_compliant', evidence?: string) => Promise<void>;
  scheduleComplianceAssessment: (date: Date) => Promise<void>;
  
  // DDoS Protection
  ddosProtection: {
    enabled: boolean;
    currentThreat: 'none' | 'low' | 'medium' | 'high' | 'critical';
    requestsPerSecond: number;
    blockedIPs: string[];
  };
  enableDDoSProtection: () => Promise<void>;
  blockIP: (ip: string, reason: string, duration?: number) => Promise<void>;
  unblockIP: (ip: string) => Promise<void>;
  
  // Encryption & Key Management
  encryptSensitiveData: (data: string) => Promise<string>;
  decryptSensitiveData: (encryptedData: string) => Promise<string>;
  rotateEncryptionKeys: () => Promise<void>;
  validateDataIntegrity: (data: any) => Promise<boolean>;
  
  // Security Scanning
  runSecurityScan: () => Promise<{
    vulnerabilities: Array<{
      type: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      recommendation: string;
    }>;
    securityScore: number;
  }>;
  
  // Incident Response
  createSecurityIncident: (incident: {
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    affected: string[];
  }) => Promise<string>;
  updateIncidentStatus: (incidentId: string, status: 'open' | 'investigating' | 'resolved' | 'closed') => Promise<void>;
  getActiveIncidents: () => Promise<any[]>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

// Sample Data
const SAMPLE_SECURITY_CONFIG: SecurityConfig = {
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventReuse: 5,
    maxAge: 90,
  },
  sessionPolicy: {
    maxDuration: 480, // 8 hours
    inactivityTimeout: 30,
    maxConcurrentSessions: 3,
    requireReauth: false,
  },
  rateLimiting: {
    loginAttempts: { max: 5, window: 15 },
    apiRequests: { max: 1000, window: 60 },
    passwordReset: { max: 3, window: 60 },
  },
  fraudDetection: {
    enabled: true,
    thresholds: {
      lowRisk: 30,
      mediumRisk: 60,
      highRisk: 80,
    },
    blockedCountries: [],
    vpnDetection: true,
  },
};

const SAMPLE_PCI_COMPLIANCE: PCICompliance = {
  level: 'Level 2',
  lastAssessment: new Date('2024-06-01'),
  nextAssessment: new Date('2025-06-01'),
  requirements: [
    {
      id: 'req_1',
      description: 'Install and maintain a firewall configuration',
      status: 'compliant',
      lastChecked: new Date('2024-12-01'),
      evidence: 'Firewall audit report',
    },
    {
      id: 'req_2',
      description: 'Do not use vendor-supplied defaults for system passwords',
      status: 'compliant',
      lastChecked: new Date('2024-12-01'),
    },
  ],
  vulnerabilities: [],
};

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState<TwoFactorAuth>({
    isEnabled: false,
    method: 'authenticator',
    backupCodes: [],
    setup: {},
  });
  
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [fraudDetection, setFraudDetection] = useState<FraudDetection | null>(null);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([]);
  const [gdprConsents, setGdprConsents] = useState<GDPRConsent[]>([]);
  const [privacyRequests, setPrivacyRequests] = useState<DataPrivacyRequest[]>([]);
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>(SAMPLE_SECURITY_CONFIG);
  const [pciCompliance, setPciCompliance] = useState<PCICompliance>(SAMPLE_PCI_COMPLIANCE);
  
  const [ddosProtection] = useState({
    enabled: true,
    currentThreat: 'none' as const,
    requestsPerSecond: 150,
    blockedIPs: ['192.168.1.100', '10.0.0.55'] as string[],
  });
  
  const { user } = useAuth();

  // Enable 2FA
  const enable2FA = async (method: 'sms' | 'email' | 'authenticator') => {
    const secret = method === 'authenticator' ? generateSecret() : undefined;
    const qrCode = method === 'authenticator' ? generateQRCode(secret!) : undefined;
    
    setTwoFactorAuth(prev => ({
      ...prev,
      method,
      setup: { secret, qrCode },
    }));
    
    return { secret, qrCode };
  };

  // Verify 2FA
  const verify2FA = async (code: string, method: 'sms' | 'email' | 'authenticator' | 'backup_codes') => {
    // Mock verification logic
    if (method === 'backup_codes') {
      const isValidBackupCode = twoFactorAuth.backupCodes.includes(code);
      if (isValidBackupCode) {
        setTwoFactorAuth(prev => ({
          ...prev,
          backupCodes: prev.backupCodes.filter(c => c !== code),
        }));
        return true;
      }
    }
    
    // For other methods, simulate verification
    const isValid = code.length === 6 && /^\d+$/.test(code);
    
    if (isValid && !twoFactorAuth.isEnabled) {
      setTwoFactorAuth(prev => ({
        ...prev,
        isEnabled: true,
        lastUsed: new Date(),
        backupCodes: generateBackupCodesArray(),
      }));
    }
    
    return isValid;
  };

  // Generate backup codes
  const generateBackupCodes = async () => {
    const codes = generateBackupCodesArray();
    setTwoFactorAuth(prev => ({ ...prev, backupCodes: codes }));
    return codes;
  };

  // Log Security Event
  const logSecurityEvent = async (event: Omit<SecurityEvent, 'id' | 'timestamp'>) => {
    const securityEvent: SecurityEvent = {
      ...event,
      id: `event_${Date.now()}`,
      timestamp: new Date(),
    };
    
    setSecurityEvents(prev => [...prev, securityEvent]);
    
    // Log to audit trail
    await logAuditEvent({
      userId: event.userId,
      action: 'security_event_logged',
      resource: 'security',
      ipAddress: event.details.ipAddress,
      userAgent: event.details.userAgent,
      success: true,
      details: { eventType: event.type, severity: event.severity },
      sensitive: true,
    });
  };

  // Analyze Transaction for Fraud
  const analyzeTransaction = async (transactionData: any): Promise<FraudDetection> => {
    // Mock fraud detection analysis
    const factors = [
      { type: 'IP Reputation', score: 10, description: 'IP address has good reputation' },
      { type: 'Velocity Check', score: 15, description: 'Normal transaction velocity for user' },
      { type: 'Device Fingerprint', score: 5, description: 'Known device used by user' },
      { type: 'Geolocation', score: 20, description: 'Transaction from unusual location' },
    ];
    
    const totalScore = factors.reduce((sum, factor) => sum + factor.score, 0);
    
    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (totalScore < securityConfig.fraudDetection.thresholds.lowRisk) riskLevel = 'low';
    else if (totalScore < securityConfig.fraudDetection.thresholds.mediumRisk) riskLevel = 'medium';
    else if (totalScore < securityConfig.fraudDetection.thresholds.highRisk) riskLevel = 'high';
    else riskLevel = 'critical';
    
    const detection: FraudDetection = {
      riskScore: totalScore,
      riskLevel,
      factors,
      recommendations: riskLevel === 'high' || riskLevel === 'critical' 
        ? ['Verify customer identity', 'Review transaction manually', 'Contact customer'] 
        : ['Monitor transaction'],
      requiresManualReview: riskLevel === 'high' || riskLevel === 'critical',
    };
    
    setFraudDetection(detection);
    return detection;
  };

  // Log Audit Event
  const logAuditEvent = async (event: Omit<SecurityAuditLog, 'id' | 'timestamp'>) => {
    const auditEvent: SecurityAuditLog = {
      ...event,
      id: `audit_${Date.now()}`,
      timestamp: new Date(),
    };
    
    setAuditLogs(prev => [...prev, auditEvent]);
  };

  // Record GDPR Consent
  const recordConsent = async (consent: Omit<GDPRConsent, 'id' | 'timestamp'>) => {
    const gdprConsent: GDPRConsent = {
      ...consent,
      id: `consent_${Date.now()}`,
      timestamp: new Date(),
    };
    
    setGdprConsents(prev => [...prev, gdprConsent]);
    
    await logAuditEvent({
      userId: consent.userId,
      action: 'gdpr_consent_recorded',
      resource: 'privacy',
      ipAddress: consent.ipAddress,
      userAgent: 'browser',
      success: true,
      details: { consentType: consent.consentType, granted: consent.granted },
      sensitive: true,
    });
  };

  // Submit Privacy Request
  const submitPrivacyRequest = async (request: Omit<DataPrivacyRequest, 'id' | 'status' | 'requestedAt'>) => {
    const privacyRequest: DataPrivacyRequest = {
      ...request,
      id: `privacy_${Date.now()}`,
      status: 'pending',
      requestedAt: new Date(),
    };
    
    setPrivacyRequests(prev => [...prev, privacyRequest]);
    return privacyRequest;
  };

  // Check Rate Limit
  const checkRateLimit = async (action: string, identifier: string) => {
    // Mock rate limiting logic
    const config = securityConfig.rateLimiting[action as keyof typeof securityConfig.rateLimiting];
    if (!config) {
      return { allowed: true, remaining: 1000, resetTime: new Date(Date.now() + 60000) };
    }
    
    // Simulate current usage
    const currentUsage = Math.floor(Math.random() * config.max);
    const remaining = Math.max(0, config.max - currentUsage);
    const resetTime = new Date(Date.now() + config.window * 60000);
    
    return {
      allowed: currentUsage < config.max,
      remaining,
      resetTime,
    };
  };

  // Run Security Scan
  const runSecurityScan = async () => {
    // Mock security scan
    const vulnerabilities = [
      {
        type: 'Outdated Dependencies',
        severity: 'medium' as const,
        description: 'Some npm packages are outdated',
        recommendation: 'Update packages to latest versions',
      },
      {
        type: 'Missing Security Headers',
        severity: 'low' as const,
        description: 'Some HTTP security headers are missing',
        recommendation: 'Add Content-Security-Policy header',
      },
    ];
    
    const securityScore = 85; // Out of 100
    
    return { vulnerabilities, securityScore };
  };

  // Helper functions
  const generateSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  const generateQRCode = (secret: string) => {
    const appName = 'Rise Cosmetics';
    const userEmail = user?.email || 'user@example.com';
    const issuer = 'Rise Cosmetics';
    
    return `otpauth://totp/${encodeURIComponent(appName)}:${encodeURIComponent(userEmail)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
  };

  const generateBackupCodesArray = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substr(2, 8).toUpperCase());
    }
    return codes;
  };

  // Placeholder implementations for remaining functions
  const disable2FA = async (password: string) => {
    // Verify password then disable
    setTwoFactorAuth(prev => ({ ...prev, isEnabled: false, backupCodes: [] }));
  };
  const getSecurityEvents = (userId?: string, type?: string, severity?: string) => {
    return securityEvents.filter(event => 
      (!userId || event.userId === userId) &&
      (!type || event.type === type) &&
      (!severity || event.severity === severity)
    );
  };
  const resolveSecurityEvent = async (eventId: string, notes: string) => {
    setSecurityEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, resolved: true } : event
    ));
  };
  const reportFraud = async (orderId: string, reason: string) => {};
  const whitelistUser = async (userId: string, reason: string) => {};
  const blacklistUser = async (userId: string, reason: string) => {};
  const getAuditLogs = (filters?: any) => auditLogs;
  const exportAuditLogs = async (startDate: Date, endDate: Date) => new Blob(['audit logs'], { type: 'text/csv' });
  const withdrawConsent = async (consentId: string) => {
    setGdprConsents(prev => prev.map(consent => 
      consent.id === consentId ? { ...consent, withdrawnAt: new Date() } : consent
    ));
  };
  const getConsentHistory = (userId: string) => gdprConsents.filter(consent => consent.userId === userId);
  const processPrivacyRequest = async (requestId: string, action: 'approve' | 'reject', notes: string) => {
    setPrivacyRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { ...request, status: action === 'approve' ? 'completed' : 'rejected', completedAt: new Date(), processingNotes: notes }
        : request
    ));
  };
  const exportUserData = async (userId: string) => new Blob(['user data'], { type: 'application/json' });
  const deleteUserData = async (userId: string, retentionPeriod?: number) => {};
  const updateSecurityConfig = async (config: Partial<SecurityConfig>) => {
    setSecurityConfig(prev => ({ ...prev, ...config }));
  };
  const testSecurityConfig = async () => ({ valid: true, issues: [] });
  const incrementRateLimit = async (action: string, identifier: string) => {};
  const resetRateLimit = async (action: string, identifier: string) => {};
  const runComplianceCheck = async () => {};
  const updateComplianceStatus = async (requirementId: string, status: any, evidence?: string) => {};
  const scheduleComplianceAssessment = async (date: Date) => {};
  const enableDDoSProtection = async () => {};
  const blockIP = async (ip: string, reason: string, duration?: number) => {};
  const unblockIP = async (ip: string) => {};
  const encryptSensitiveData = async (data: string) => btoa(data);
  const decryptSensitiveData = async (encryptedData: string) => atob(encryptedData);
  const rotateEncryptionKeys = async () => {};
  const validateDataIntegrity = async (data: any) => true;
  const createSecurityIncident = async (incident: any) => `incident_${Date.now()}`;
  const updateIncidentStatus = async (incidentId: string, status: any) => {};
  const getActiveIncidents = async () => [];

  const value: SecurityContextType = {
    // Two-Factor Authentication
    twoFactorAuth,
    enable2FA,
    verify2FA,
    disable2FA,
    generateBackupCodes,
    
    // Security Events & Monitoring
    securityEvents,
    logSecurityEvent,
    getSecurityEvents,
    resolveSecurityEvent,
    
    // Fraud Detection
    fraudDetection,
    analyzeTransaction,
    reportFraud,
    whitelistUser,
    blacklistUser,
    
    // Security Audit Logging
    auditLogs,
    logAuditEvent,
    getAuditLogs,
    exportAuditLogs,
    
    // GDPR Compliance
    gdprConsents,
    recordConsent,
    withdrawConsent,
    getConsentHistory,
    
    // Data Privacy Requests
    privacyRequests,
    submitPrivacyRequest,
    processPrivacyRequest,
    exportUserData,
    deleteUserData,
    
    // Security Configuration
    securityConfig,
    updateSecurityConfig,
    testSecurityConfig,
    
    // Rate Limiting
    checkRateLimit,
    incrementRateLimit,
    resetRateLimit,
    
    // PCI DSS Compliance
    pciCompliance,
    runComplianceCheck,
    updateComplianceStatus,
    scheduleComplianceAssessment,
    
    // DDoS Protection
    ddosProtection,
    enableDDoSProtection,
    blockIP,
    unblockIP,
    
    // Encryption & Key Management
    encryptSensitiveData,
    decryptSensitiveData,
    rotateEncryptionKeys,
    validateDataIntegrity,
    
    // Security Scanning
    runSecurityScan,
    
    // Incident Response
    createSecurityIncident,
    updateIncidentStatus,
    getActiveIncidents,
  };

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
