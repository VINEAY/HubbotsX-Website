"use client";

import { useState } from "react";
import type { LeadStatus } from "@/lib/types";

interface BulkActionBarProps {
  selectedLeadsCount: number;
  onUpdateStatus: (status: LeadStatus) => void;
  onDelete: () => void;
  onExport: () => void;
  onAssign?: (userId: string) => void;
  onClearSelection: () => void;
  teamMembers?: { id: string; name: string }[];
}

export default function BulkActionBar({
  selectedLeadsCount,
  onUpdateStatus,
  onDelete,
  onExport,
  onAssign,
  onClearSelection,
  teamMembers = [],
}: BulkActionBarProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  if (selectedLeadsCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-800 py-3 px-4 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-white">{selectedLeadsCount} leads selected</span>
          <button
            type="button"
            onClick={onClearSelection}
            className="text-gray-400 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Status Update Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowAssignDropdown(false);
              }}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm flex items-center"
            >
              <span>Update Status</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${showStatusDropdown ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showStatusDropdown && (
              <div className="absolute bottom-full mb-1 right-0 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden">
                <div className="py-1">
                  {["new", "contacted", "qualified", "disqualified", "customer"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        onUpdateStatus(status as LeadStatus);
                        setShowStatusDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Assign Dropdown (if enabled) */}
          {onAssign && teamMembers.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowAssignDropdown(!showAssignDropdown);
                  setShowStatusDropdown(false);
                }}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm flex items-center"
              >
                <span>Assign To</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform ${showAssignDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showAssignDropdown && (
                <div className="absolute bottom-full mb-1 right-0 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg overflow-hidden">
                  <div className="py-1">
                    {teamMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => {
                          onAssign(member.id);
                          setShowAssignDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
                      >
                        {member.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Button */}
          <button
            type="button"
            onClick={onExport}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-md text-sm"
          >
            Export
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${selectedLeadsCount} leads? This cannot be undone.`)) {
                onDelete();
              }
            }}
            className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-white rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
