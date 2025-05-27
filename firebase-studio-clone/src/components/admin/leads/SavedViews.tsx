"use client";

import { useState } from "react";
import type { FilterGroup } from "@/lib/types";

interface SavedView {
  id: string;
  name: string;
  description?: string;
  filter: FilterGroup;
  isDefault?: boolean;
  createdAt: string;
  createdBy?: {
    id: string;
    name: string;
  };
}

interface SavedViewsProps {
  views: SavedView[];
  activeViewId: string | null;
  onSelectView: (viewId: string | null) => void;
  onSaveView: (name: string, description: string, filter: FilterGroup) => void;
  onDeleteView: (viewId: string) => void;
  currentFilter: FilterGroup | null;
}

export default function SavedViews({
  views,
  activeViewId,
  onSelectView,
  onSaveView,
  onDeleteView,
  currentFilter,
}: SavedViewsProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newView, setNewView] = useState({
    name: "",
    description: "",
  });

  const handleSaveView = () => {
    if (!newView.name || !currentFilter) return;

    onSaveView(newView.name, newView.description, currentFilter);
    setNewView({ name: "", description: "" });
    setShowSaveDialog(false);
  };

  return (
    <div className="bg-black/40 rounded-lg border border-gray-800 overflow-hidden mb-4">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Saved Views</h3>
        <button
          type="button"
          onClick={() => setShowSaveDialog(true)}
          disabled={!currentFilter}
          className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Current View
        </button>
      </div>

      <div className="divide-y divide-gray-800">
        <button
          type="button"
          onClick={() => onSelectView(null)}
          className={`w-full text-left p-3 hover:bg-gray-900/40 ${!activeViewId ? "bg-gray-900/40" : ""}`}
        >
          <div className="flex items-center">
            <span className="text-white font-medium">All Leads</span>
            <span className="ml-2 px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">Default</span>
          </div>
        </button>

        {views.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <p>No saved views yet.</p>
            <p className="text-sm mt-1">Save your filters to quickly access specific lead views.</p>
          </div>
        ) : (
          views.map((view) => (
            <div
              key={view.id}
              className={`p-3 hover:bg-gray-900/40 cursor-pointer ${
                activeViewId === view.id ? "bg-gray-900/40" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div
                  className="flex-1"
                  onClick={() => onSelectView(view.id)}
                >
                  <h4 className="font-medium text-white">{view.name}</h4>
                  {view.description && (
                    <p className="text-sm text-gray-400 mt-1">{view.description}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Created {new Date(view.createdAt).toLocaleDateString()}
                    {view.createdBy && ` by ${view.createdBy.name}`}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Are you sure you want to delete the "${view.name}" view?`)) {
                      onDeleteView(view.id);
                    }
                  }}
                  className="text-gray-400 hover:text-red-500 p-1"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save View Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-white mb-4">Save Current View</h3>

            <div className="mb-4">
              <label htmlFor="viewName" className="block text-sm font-medium text-gray-300 mb-1">
                View Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="viewName"
                value={newView.name}
                onChange={(e) => setNewView({ ...newView, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="e.g., High Priority Leads"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="viewDescription" className="block text-sm font-medium text-gray-300 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                id="viewDescription"
                value={newView.description}
                onChange={(e) => setNewView({ ...newView, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="What makes this view special?"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveView}
                disabled={!newView.name}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
