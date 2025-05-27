// Lead management types
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'disqualified' | 'customer';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  source: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Lead activity tracking types
export type ActivityType = 'note' | 'call' | 'email' | 'meeting' | 'task';

export interface LeadActivity {
  id: string;
  leadId: string;
  type: ActivityType;
  content: string;
  createdBy: {
    id: string;
    name: string;
  };
  createdAt: string;
}

// Advanced filtering types
export type FilterOperator = "equals" | "contains" | "startsWith" | "endsWith" | "greaterThan" | "lessThan";
export type LogicalOperator = "and" | "or";

export interface FilterCondition {
  id: string;
  field: keyof Lead | "";
  operator: FilterOperator;
  value: string;
}

export interface FilterGroup {
  id: string;
  logicalOperator: LogicalOperator;
  conditions: FilterCondition[];
}

// Dashboard analytics types
export interface LeadAnalytics {
  totalLeads: number;
  newLeadsToday: number;
  conversionRate: number;
  leadsBySource: { [key: string]: number };
  leadsByStatus: { [key in LeadStatus]: number };
  leadsByTime: { date: string; count: number }[];
}
