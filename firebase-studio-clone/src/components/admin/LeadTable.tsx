"use client";

import { useState, useEffect } from "react";
import type { Lead, LeadStatus } from "@/lib/types";

interface LeadTableProps {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  selectedLeads: string[];
  onSelectAll: (checked: boolean) => void;
  onToggleSelect: (leadId: string, checked: boolean) => void;
  onViewLead?: (id: string) => void;
}

export default function LeadTable({
  leads,
  onDeleteLead,
  onUpdateStatus,
  selectedLeads,
  onSelectAll,
  onToggleSelect,
  onViewLead
}: LeadTableProps) {
  const [sortField, setSortField] = useState<keyof Lead>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
  const [searchTerm, setSearchTerm] = useState("");

  // Update filtered leads when leads change or search term changes
  useEffect(() => {
    let result = [...leads];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        lead =>
          lead.name.toLowerCase().includes(term) ||
          lead.email.toLowerCase().includes(term) ||
          lead.company?.toLowerCase().includes(term) ||
          lead.source.toLowerCase().includes(term) ||
          lead.status.toLowerCase().includes(term) ||
          lead.notes?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortField === "createdAt" || sortField === "updatedAt") {
        const dateA = new Date(a[sortField]).getTime();
        const dateB = new Date(b[sortField]).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredLeads(result);
  }, [leads, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof Lead) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Lead) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
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

  const allSelected = filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length;

  return (
    <div className="bg-black/40 rounded-lg overflow-hidden border border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-medium text-white">Lead Management</h3>
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-3 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black/60">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 bg-gray-900 border-gray-700 rounded focus:ring-primary focus:ring-1"
                />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {getSortIcon("name")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("company")}
              >
                Company {getSortIcon("company")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("source")}
              >
                Source {getSortIcon("source")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {getSortIcon("status")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Created {getSortIcon("createdAt")}
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                  {searchTerm ? "No leads match your search" : "No leads found"}
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-black/20">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={(e) => onToggleSelect(lead.id, e.target.checked)}
                      className="w-4 h-4 bg-gray-900 border-gray-700 rounded focus:ring-primary focus:ring-1"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{lead.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{lead.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{lead.company || "-"}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{lead.source}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className="text-sm rounded-full px-2 py-1 font-medium border-0 focus:ring-0 focus:outline-none cursor-pointer bg-gray-800 text-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="disqualified">Disqualified</option>
                      <option value="customer">Customer</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    {onViewLead && (
                      <button
                        onClick={() => onViewLead(lead.id)}
                        className="text-primary hover:text-primary/80 mr-3"
                      >
                        View
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteLead(lead.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
