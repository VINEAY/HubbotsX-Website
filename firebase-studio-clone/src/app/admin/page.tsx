"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import type { LeadStatus } from "@/lib/types";

// Mock data for the dashboard
const mockStats = {
  totalLeads: 132,
  newLeadsToday: 7,
  conversionRate: 24.2,
  leadsByStatus: {
    new: 42,
    contacted: 35,
    qualified: 28,
    disqualified: 15,
    customer: 12,
  },
  recentActivity: [
    { id: 1, type: "new_lead", name: "Thomas Anderson", date: "15 minutes ago" },
    { id: 2, type: "status_change", name: "Emily Chen", from: "contacted", to: "qualified", date: "2 hours ago" },
    { id: 3, type: "new_lead", name: "Sarah Miller", date: "3 hours ago" },
    { id: 4, type: "status_change", name: "James Wilson", from: "qualified", to: "customer", date: "yesterday" },
    { id: 5, type: "note_added", name: "Maria Garcia", date: "yesterday" },
  ],
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<typeof mockStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchStats = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setStats(mockStats);
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "contacted": return "bg-yellow-500";
      case "qualified": return "bg-green-500";
      case "disqualified": return "bg-red-500";
      case "customer": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_lead": return "👤";
      case "status_change": return "🔄";
      case "note_added": return "📝";
      default: return "📋";
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Total Leads</h3>
            <p className="text-3xl font-bold text-white">{stats?.totalLeads}</p>
            <div className="flex items-center mt-2">
              <span className="text-green-500 text-sm mr-1">↑</span>
              <span className="text-green-500 text-sm font-medium">{stats?.newLeadsToday} today</span>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-white">{stats?.conversionRate}%</p>
            <div className="mt-2 text-sm text-gray-400">Leads to customers</div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Lead Quality</h3>
            <div className="flex items-center space-x-1">
              <div className="h-2 rounded-l-full bg-blue-500 w-[32%]" />
              <div className="h-2 bg-yellow-500 w-[26%]" />
              <div className="h-2 bg-green-500 w-[21%]" />
              <div className="h-2 bg-red-500 w-[11%]" />
              <div className="h-2 rounded-r-full bg-purple-500 w-[10%]" />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
                <span className="text-xs text-gray-400">New</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1" />
                <span className="text-xs text-gray-400">Contacted</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1" />
                <span className="text-xs text-gray-400">Qualified</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-1" />
                <span className="text-xs text-gray-400">Disqualified</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1" />
                <span className="text-xs text-gray-400">Customer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-black/40 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 className="font-medium text-white">Recent Activity</h3>
            </div>
            <div className="divide-y divide-gray-800">
              {stats?.recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4 flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      {activity.type === "new_lead" && (
                        <>New lead <span className="font-medium">{activity.name}</span> added</>
                      )}
                      {activity.type === "status_change" && (
                        <>
                          <span className="font-medium">{activity.name}</span> changed from{" "}
                          <span className="capitalize">{activity.from}</span> to{" "}
                          <span className="capitalize">{activity.to}</span>
                        </>
                      )}
                      {activity.type === "note_added" && (
                        <>Note added to <span className="font-medium">{activity.name}</span></>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/40 rounded-xl border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h3 className="font-medium text-white">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <Link
                href="/admin/leads"
                className="block py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-center font-medium"
              >
                Manage Leads
              </Link>
              <button
                className="w-full py-3 px-4 bg-black/50 hover:bg-black/70 text-white rounded-lg text-center font-medium"
              >
                Generate Report
              </button>
              <button
                className="w-full py-3 px-4 bg-black/50 hover:bg-black/70 text-white rounded-lg text-center font-medium"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
