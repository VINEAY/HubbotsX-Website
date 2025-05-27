"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import LeadTable from "@/components/admin/LeadTable";
import LeadForm from "@/components/admin/LeadForm";
import FilterBuilder from "@/components/admin/leads/FilterBuilder";
import SegmentsManager from "@/components/admin/leads/SegmentsManager";
import BulkActionBar from "@/components/admin/leads/BulkActionBar";
import SavedViews from "@/components/admin/leads/SavedViews";
import type { Lead, LeadStatus, FilterGroup } from "@/lib/types";

// Sample data for demonstration
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    company: "Acme Corp",
    source: "Website",
    status: "new",
    createdAt: "2025-04-10T10:00:00Z",
    updatedAt: "2025-04-10T10:00:00Z"
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Tech Solutions",
    source: "Referral",
    status: "contacted",
    notes: "Had an initial call, interested in premium plan",
    createdAt: "2025-04-09T14:30:00Z",
    updatedAt: "2025-04-09T15:45:00Z"
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "555-123-4567",
    source: "LinkedIn",
    status: "qualified",
    createdAt: "2025-04-08T09:15:00Z",
    updatedAt: "2025-04-08T16:20:00Z"
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    company: "Design Studio",
    phone: "555-987-6543",
    source: "Facebook Ad",
    status: "disqualified",
    notes: "Budget constraints, maybe revisit next quarter",
    createdAt: "2025-04-07T11:20:00Z",
    updatedAt: "2025-04-07T13:10:00Z"
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    company: "Global Enterprises",
    source: "Conference",
    status: "customer",
    notes: "Converted to customer on Pro plan",
    createdAt: "2025-04-06T08:45:00Z",
    updatedAt: "2025-04-06T17:30:00Z"
  }
];

// Sample data for saved segments
const mockSegments = [
  {
    id: "seg1",
    name: "New Leads",
    description: "All new leads that need initial contact",
    criteria: {
      status: ["new"] as LeadStatus[]
    },
    createdAt: "2025-04-05T10:00:00Z",
    updatedAt: "2025-04-05T10:00:00Z"
  },
  {
    id: "seg2",
    name: "Website Leads",
    description: "Leads that came from the website",
    criteria: {
      source: ["Website"]
    },
    createdAt: "2025-04-04T10:00:00Z",
    updatedAt: "2025-04-04T10:00:00Z"
  }
];

// Sample data for saved views
const mockSavedViews = [
  {
    id: "view1",
    name: "High Priority",
    description: "Qualified leads from LinkedIn",
    filter: {
      id: "filter1",
      logicalOperator: "and",
      conditions: [
        { id: "c1", field: "status", operator: "equals", value: "qualified" },
        { id: "c2", field: "source", operator: "equals", value: "LinkedIn" }
      ]
    },
    createdAt: "2025-04-03T10:00:00Z",
    createdBy: {
      id: "user1",
      name: "Admin User"
    }
  }
];

// Sample team members for assignment
const mockTeamMembers = [
  { id: "user1", name: "Admin User" },
  { id: "user2", name: "Sales Rep" },
  { id: "user3", name: "Marketing Manager" }
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [segments, setSegments] = useState(mockSegments);
  const [savedViews, setSavedViews] = useState(mockSavedViews);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterGroup | null>(null);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  // Simulating data fetching
  useEffect(() => {
    const fetchLeads = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setIsLoading(false);
    };

    fetchLeads();
  }, []);

  // Apply filters when currentFilter changes
  useEffect(() => {
    if (!currentFilter || currentFilter.conditions.length === 0) {
      setFilteredLeads(leads);
      return;
    }

    const filtered = leads.filter(lead => {
      const results = currentFilter.conditions.map(condition => {
        if (!condition.field || !condition.value) return true;

        const fieldValue = lead[condition.field as keyof Lead];
        if (fieldValue === undefined) return false;

        const stringValue = String(fieldValue).toLowerCase();
        const conditionValue = condition.value.toLowerCase();

        switch (condition.operator) {
          case "equals":
            return stringValue === conditionValue;
          case "contains":
            return stringValue.includes(conditionValue);
          case "startsWith":
            return stringValue.startsWith(conditionValue);
          case "endsWith":
            return stringValue.endsWith(conditionValue);
          case "greaterThan":
            return new Date(stringValue) > new Date(conditionValue);
          case "lessThan":
            return new Date(stringValue) < new Date(conditionValue);
          default:
            return true;
        }
      });

      return currentFilter.logicalOperator === "and"
        ? results.every(Boolean)
        : results.some(Boolean);
    });

    setFilteredLeads(filtered);
  }, [currentFilter, leads]);

  // Apply segment filter when activeSegment changes
  useEffect(() => {
    if (!activeSegment) {
      // If no segment is active and no current filter, show all leads
      if (!currentFilter) {
        setFilteredLeads(leads);
      }
      return;
    }

    // Reset active view when segment changes
    setActiveView(null);

    const segment = segments.find(s => s.id === activeSegment);
    if (!segment) return;

    const filtered = leads.filter(lead => {
      // Status filtering
      if (segment.criteria.status &&
          segment.criteria.status.length > 0 &&
          !segment.criteria.status.includes(lead.status)) {
        return false;
      }

      // Source filtering
      if (segment.criteria.source &&
          segment.criteria.source.length > 0 &&
          !segment.criteria.source.includes(lead.source)) {
        return false;
      }

      return true;
    });

    setFilteredLeads(filtered);
  }, [activeSegment, segments, leads, currentFilter]);

  // Load saved view when activeView changes
  useEffect(() => {
    if (!activeView) return;

    // Reset active segment when view changes
    setActiveSegment(null);

    const view = savedViews.find(v => v.id === activeView);
    if (!view) return;

    setCurrentFilter(view.filter);
  }, [activeView, savedViews]);

  const handleAddLead = (newLead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const lead: Lead = {
      ...newLead,
      id: `${leads.length + 1}`,
      createdAt: now,
      updatedAt: now,
    };

    setLeads(prev => [lead, ...prev]);
    setShowAddForm(false);
  };

  const handleDeleteLead = (id: string) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(prev => prev.filter(lead => lead.id !== id));
      setSelectedLeads(prev => prev.filter(leadId => leadId !== id));
    }
  };

  const handleUpdateStatus = (id: string, status: LeadStatus) => {
    setLeads(prev =>
      prev.map(lead =>
        lead.id === id
          ? { ...lead, status, updatedAt: new Date().toISOString() }
          : lead
      )
    );
  };

  const handleApplyFilter = (filter: FilterGroup) => {
    setCurrentFilter(filter);
    setActiveSegment(null);
    setActiveView(null);
  };

  const handleSaveFilter = (name: string, filter: FilterGroup) => {
    const newView = {
      id: `view${savedViews.length + 1}`,
      name,
      filter,
      createdAt: new Date().toISOString(),
      createdBy: {
        id: "user1",
        name: "Admin User"
      }
    };

    setSavedViews(prev => [...prev, newView]);
    setActiveView(newView.id);
  };

  const handleCreateSegment = (segment: Omit<typeof segments[0], "id" | "createdAt" | "updatedAt">) => {
    const newSegment = {
      ...segment,
      id: `seg${segments.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSegments(prev => [...prev, newSegment]);
    setActiveSegment(newSegment.id);
  };

  const handleUpdateSegment = (segmentId: string, updates: Partial<typeof segments[0]>) => {
    setSegments(prev =>
      prev.map(segment =>
        segment.id === segmentId
          ? { ...segment, ...updates, updatedAt: new Date().toISOString() }
          : segment
      )
    );
  };

  const handleDeleteSegment = (segmentId: string) => {
    setSegments(prev => prev.filter(segment => segment.id !== segmentId));
    if (activeSegment === segmentId) {
      setActiveSegment(null);
    }
  };

  const handleDeleteView = (viewId: string) => {
    setSavedViews(prev => prev.filter(view => view.id !== viewId));
    if (activeView === viewId) {
      setActiveView(null);
      setCurrentFilter(null);
    }
  };

  const handleSelectAllLeads = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleToggleLeadSelection = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads(prev => [...prev, leadId]);
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId));
    }
  };

  const handleBulkUpdateStatus = (status: LeadStatus) => {
    setLeads(prev =>
      prev.map(lead =>
        selectedLeads.includes(lead.id)
          ? { ...lead, status, updatedAt: new Date().toISOString() }
          : lead
      )
    );
  };

  const handleBulkDelete = () => {
    setLeads(prev => prev.filter(lead => !selectedLeads.includes(lead.id)));
    setSelectedLeads([]);
  };

  const handleExportLeads = () => {
    const leadsToExport = leads.filter(lead => selectedLeads.includes(lead.id));
    const csv = [
      ["ID", "Name", "Email", "Company", "Phone", "Source", "Status", "Notes", "Created", "Updated"].join(","),
      ...leadsToExport.map(lead => [
        lead.id,
        `"${lead.name}"`,
        lead.email,
        `"${lead.company || ''}"`,
        lead.phone || '',
        lead.source,
        lead.status,
        `"${lead.notes || ''}"`,
        new Date(lead.createdAt).toLocaleDateString(),
        new Date(lead.updatedAt).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAssignLeads = (userId: string) => {
    // In a real app, this would update the lead assignment in the database
    console.log(`Assigning leads ${selectedLeads.join(', ')} to user ${userId}`);

    // You would update the lead objects with the assigned user ID
    // and then update the UI accordingly

    // For this demo, we'll just show an alert
    alert(`${selectedLeads.length} leads assigned to ${mockTeamMembers.find(u => u.id === userId)?.name || 'team member'}`);

    // Clear selection after assignment
    setSelectedLeads([]);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Leads">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Lead Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {showAddForm ? "Add New Lead" :
             activeSegment ? `Segment: ${segments.find(s => s.id === activeSegment)?.name}` :
             activeView ? `View: ${savedViews.find(v => v.id === activeView)?.name}` :
             `All Leads (${filteredLeads.length})`}
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              {showAddForm ? "Cancel" : "Add Lead"}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <FilterBuilder
                onApplyFilter={handleApplyFilter}
                onSaveFilter={(name, filter) => {
                  const newFilter = { ...filter };
                  handleSaveFilter(name, newFilter);
                }}
                savedFilters={savedViews.map(view => ({
                  id: view.id,
                  name: view.name,
                  filter: view.filter
                }))}
                onLoadFilter={(filterId) => {
                  setActiveView(filterId);
                }}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <SavedViews
                views={savedViews}
                activeViewId={activeView}
                onSelectView={setActiveView}
                onSaveView={(name, description, filter) => handleSaveFilter(name, filter)}
                onDeleteView={handleDeleteView}
                currentFilter={currentFilter}
              />

              <SegmentsManager
                segments={segments}
                onCreateSegment={handleCreateSegment}
                onUpdateSegment={handleUpdateSegment}
                onDeleteSegment={handleDeleteSegment}
                onSelectSegment={setActiveSegment}
                leads={leads}
              />
            </div>
          </div>
        )}

        {showAddForm ? (
          <LeadForm
            onAddLead={handleAddLead}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <LeadTable
            leads={filteredLeads}
            onDeleteLead={handleDeleteLead}
            onUpdateStatus={handleUpdateStatus}
            selectedLeads={selectedLeads}
            onSelectAll={handleSelectAllLeads}
            onToggleSelect={handleToggleLeadSelection}
          />
        )}

        <BulkActionBar
          selectedLeadsCount={selectedLeads.length}
          onUpdateStatus={handleBulkUpdateStatus}
          onDelete={handleBulkDelete}
          onExport={handleExportLeads}
          onAssign={handleAssignLeads}
          onClearSelection={() => setSelectedLeads([])}
          teamMembers={mockTeamMembers}
        />
      </div>
    </AdminLayout>
  );
}
