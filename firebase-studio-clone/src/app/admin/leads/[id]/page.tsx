"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import type { Lead, LeadStatus, LeadActivity } from "@/lib/types";

// Extended interface that includes activities for lead details
interface LeadWithActivities extends Lead {
  activities?: LeadActivity[];
}

// Sample activities to demonstrate functionality
const mockActivities: LeadActivity[] = [
  {
    id: "act1",
    leadId: "1",
    type: "note",
    content: "Initial contact made via email",
    createdBy: {
      id: "user1",
      name: "Admin User"
    },
    createdAt: "2025-04-12T09:30:00Z"
  },
  {
    id: "act2",
    leadId: "1",
    type: "email",
    content: "Sent product information brochure",
    createdBy: {
      id: "user1",
      name: "Admin User"
    },
    createdAt: "2025-04-13T14:00:00Z"
  },
  {
    id: "act3",
    leadId: "2",
    type: "call",
    content: "Had a 15-minute intro call. They're interested in premium plan.",
    createdBy: {
      id: "user1",
      name: "Admin User"
    },
    createdAt: "2025-04-09T15:30:00Z"
  },
  {
    id: "act4",
    leadId: "3",
    type: "meeting",
    content: "Scheduled demo for next week",
    createdBy: {
      id: "user1",
      name: "Admin User"
    },
    createdAt: "2025-04-10T11:00:00Z"
  }
];

// Sample data for demonstration (this would be fetched from API in a real app)
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

export default function LeadDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<LeadWithActivities | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const [newActivity, setNewActivity] = useState({ type: "note", content: "" });
  const [activities, setActivities] = useState<LeadActivity[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchLead = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network request

      const foundLead = mockLeads.find(l => l.id === leadId);

      if (foundLead) {
        // Find activities for this lead
        const leadActivities = mockActivities.filter(act => act.leadId === leadId);

        setLead({ ...foundLead, activities: leadActivities });
        setFormData(foundLead);
        setActivities(leadActivities);
      }

      setIsLoading(false);
    };

    fetchLead();
  }, [leadId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!lead) return;

    // In a real app, this would be an API call
    const updatedLead = {
      ...lead,
      ...formData,
      updatedAt: new Date().toISOString()
    };

    setLead(updatedLead);
    setIsEditing(false);
  };

  const handleAddActivity = () => {
    if (!lead || !newActivity.content.trim()) return;

    const activity: LeadActivity = {
      id: `act${Date.now()}`,
      leadId: lead.id,
      type: newActivity.type as "note" | "call" | "email" | "meeting" | "task",
      content: newActivity.content,
      createdBy: {
        id: "user1",
        name: "Admin User"
      },
      createdAt: new Date().toISOString()
    };

    setActivities(prev => [activity, ...prev]);
    setNewActivity({ type: "note", content: "" });

    // In a real app, this would be an API call to save the activity
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "note":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case "call":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case "email":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "meeting":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "task":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "contacted":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "qualified":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "disqualified":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "customer":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Lead Details">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!lead) {
    return (
      <AdminLayout title="Lead Not Found">
        <div className="bg-black/40 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Lead Not Found</h2>
          <p className="text-gray-400">The lead you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => router.push('/admin/leads')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Back to Leads
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Lead: ${lead.name}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin/leads')}
              className="mr-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-white">Lead Details</h2>
          </div>
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Edit Lead
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lead Information Card */}
          <div className="md:col-span-2 bg-black/40 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4">Lead Information</h3>

            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Source</label>
                  <input
                    type="text"
                    name="source"
                    value={formData.source || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="disqualified">Disqualified</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Name</div>
                  <div className="text-white">{lead.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white">{lead.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white">{lead.phone || '-'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Company</div>
                  <div className="text-white">{lead.company || '-'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Source</div>
                  <div className="text-white">{lead.source}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 capitalize">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-400">Notes</div>
                  <div className="text-white whitespace-pre-wrap">{lead.notes || '-'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Created</div>
                  <div className="text-white">{new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Last Updated</div>
                  <div className="text-white">{new Date(lead.updatedAt).toLocaleDateString()} {new Date(lead.updatedAt).toLocaleTimeString()}</div>
                </div>
              </div>
            )}
          </div>

          {/* Lead Timeline and Add Activity */}
          <div className="md:col-span-1">
            <div className="bg-black/40 rounded-lg p-6 border border-gray-800 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Add Activity</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Activity Type</label>
                  <select
                    value={newActivity.type}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="note">Note</option>
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                    <option value="task">Task</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Details</label>
                  <textarea
                    value={newActivity.content}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, content: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter activity details..."
                  />
                </div>
                <button
                  onClick={handleAddActivity}
                  disabled={!newActivity.content.trim()}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Activity
                </button>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-medium text-white mb-4">Activity Timeline</h3>
              {activities.length === 0 ? (
                <div className="text-gray-400 text-center py-6">
                  No activities recorded yet
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border-l-2 border-gray-800 pl-4 pb-4">
                      <div className="flex items-center mb-1">
                        <div className="p-1 rounded-full bg-gray-800 mr-2">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="text-sm font-medium text-white capitalize">{activity.type}</div>
                        <div className="ml-auto text-xs text-gray-400">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 ml-6">{activity.content}</div>
                      <div className="text-xs text-gray-500 ml-6 mt-1">
                        By {activity.createdBy.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
