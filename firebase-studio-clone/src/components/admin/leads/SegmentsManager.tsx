"use client";

import { useState, useEffect } from "react";
import type { Lead, LeadStatus } from "@/lib/types";

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria;
  count?: number;
  createdAt: string;
  updatedAt: string;
}

interface SegmentCriteria {
  status?: LeadStatus[];
  source?: string[];
  minCreatedAt?: string;
  maxCreatedAt?: string;
  customFields?: {
    field: keyof Lead;
    value: string;
    operator: "equals" | "contains" | "startsWith" | "endsWith" | "gt" | "lt";
  }[];
}

interface SegmentsManagerProps {
  segments: Segment[];
  onCreateSegment: (segment: Omit<Segment, "id" | "createdAt" | "updatedAt" | "count">) => void;
  onUpdateSegment: (segmentId: string, updates: Partial<Segment>) => void;
  onDeleteSegment: (segmentId: string) => void;
  onSelectSegment: (segmentId: string) => void;
  leads: Lead[];
}

export default function SegmentsManager({
  segments,
  onCreateSegment,
  onUpdateSegment,
  onDeleteSegment,
  onSelectSegment,
  leads,
}: SegmentsManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeSegment, setActiveSegment] = useState<string>("");
  const [segmentForm, setSegmentForm] = useState<{
    name: string;
    description: string;
    criteria: {
      status: LeadStatus[];
      source: string[];
    };
  }>({
    name: "",
    description: "",
    criteria: {
      status: [],
      source: [],
    },
  });

  // Calculate segment counts
  useEffect(() => {
    segments.forEach((segment) => {
      const count = countLeadsInSegment(segment, leads);
      if (count !== segment.count) {
        onUpdateSegment(segment.id, { count });
      }
    });
  }, [segments, leads, onUpdateSegment]);

  const countLeadsInSegment = (segment: Segment, leads: Lead[]): number => {
    return leads.filter((lead) => {
      // Status filtering
      if (
        segment.criteria.status &&
        segment.criteria.status.length > 0 &&
        !segment.criteria.status.includes(lead.status)
      ) {
        return false;
      }

      // Source filtering
      if (
        segment.criteria.source &&
        segment.criteria.source.length > 0 &&
        !segment.criteria.source.includes(lead.source)
      ) {
        return false;
      }

      // Date filtering
      if (segment.criteria.minCreatedAt) {
        const minDate = new Date(segment.criteria.minCreatedAt);
        const leadDate = new Date(lead.createdAt);
        if (leadDate < minDate) return false;
      }

      if (segment.criteria.maxCreatedAt) {
        const maxDate = new Date(segment.criteria.maxCreatedAt);
        const leadDate = new Date(lead.createdAt);
        if (leadDate > maxDate) return false;
      }

      // Custom field filtering
      if (segment.criteria.customFields) {
        for (const field of segment.criteria.customFields) {
          const leadValue = lead[field.field] as string;
          if (!leadValue) return false;

          switch (field.operator) {
            case "equals":
              if (leadValue !== field.value) return false;
              break;
            case "contains":
              if (!leadValue.includes(field.value)) return false;
              break;
            case "startsWith":
              if (!leadValue.startsWith(field.value)) return false;
              break;
            case "endsWith":
              if (!leadValue.endsWith(field.value)) return false;
              break;
            // Add more operators as needed
          }
        }
      }

      return true;
    }).length;
  };

  const handleCreateSegment = () => {
    if (!segmentForm.name) return;

    onCreateSegment({
      name: segmentForm.name,
      description: segmentForm.description,
      criteria: {
        status: segmentForm.criteria.status.length > 0 ? segmentForm.criteria.status : undefined,
        source: segmentForm.criteria.source.length > 0 ? segmentForm.criteria.source : undefined,
      },
    });

    setSegmentForm({
      name: "",
      description: "",
      criteria: {
        status: [],
        source: [],
      },
    });
    setShowCreateForm(false);
  };

  const handleStatusChange = (status: LeadStatus) => {
    setSegmentForm((prev) => {
      const newStatus = prev.criteria.status.includes(status)
        ? prev.criteria.status.filter((s) => s !== status)
        : [...prev.criteria.status, status];

      return {
        ...prev,
        criteria: {
          ...prev.criteria,
          status: newStatus,
        },
      };
    });
  };

  const handleSourceChange = (source: string) => {
    if (!source.trim()) return;

    setSegmentForm((prev) => {
      const exists = prev.criteria.source.includes(source);

      return {
        ...prev,
        criteria: {
          ...prev.criteria,
          source: exists
            ? prev.criteria.source.filter((s) => s !== source)
            : [...prev.criteria.source, source],
        },
      };
    });
  };

  const getUniqueSourcesFromLeads = (): string[] => {
    const sources = new Set<string>();
    leads.forEach((lead) => {
      if (lead.source) sources.add(lead.source);
    });
    return Array.from(sources);
  };

  return (
    <div className="bg-black/40 rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Smart Segments</h3>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90"
        >
          {showCreateForm ? "Cancel" : "Create Segment"}
        </button>
      </div>

      {showCreateForm ? (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Segment Name</label>
              <input
                type="text"
                value={segmentForm.name}
                onChange={(e) => setSegmentForm({ ...segmentForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g., High Value Prospects"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
              <input
                type="text"
                value={segmentForm.description}
                onChange={(e) => setSegmentForm({ ...segmentForm, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="What makes this segment special?"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Lead Status</label>
            <div className="flex flex-wrap gap-2">
              {["new", "contacted", "qualified", "disqualified", "customer"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(status as LeadStatus)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    segmentForm.criteria.status.includes(status as LeadStatus)
                      ? "bg-primary text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Lead Source</label>
            <div className="flex flex-wrap gap-2">
              {getUniqueSourcesFromLeads().map((source) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => handleSourceChange(source)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    segmentForm.criteria.source.includes(source)
                      ? "bg-primary text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCreateSegment}
              disabled={!segmentForm.name}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Segment
            </button>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-800">
          {segments.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              <p>No segments created yet.</p>
              <p className="text-sm mt-1">Create segments to automatically group leads based on criteria.</p>
            </div>
          ) : (
            segments.map((segment) => (
              <div
                key={segment.id}
                className={`p-4 hover:bg-gray-900/40 cursor-pointer ${
                  activeSegment === segment.id ? "bg-gray-900/40" : ""
                }`}
                onClick={() => {
                  setActiveSegment(segment.id);
                  onSelectSegment(segment.id);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{segment.name}</h4>
                    {segment.description && (
                      <p className="text-sm text-gray-400 mt-1">{segment.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {segment.criteria.status && segment.criteria.status.map((status) => (
                        <span
                          key={status}
                          className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs"
                        >
                          {status}
                        </span>
                      ))}
                      {segment.criteria.source && segment.criteria.source.map((source) => (
                        <span
                          key={source}
                          className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full text-xs"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-md text-sm">
                      {segment.count || 0} leads
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSegment(segment.id);
                      }}
                      className="ml-3 text-gray-400 hover:text-red-500 p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
