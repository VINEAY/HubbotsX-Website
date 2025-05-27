"use client";

import { useState, useEffect } from "react";
import type { Lead, LeadStatus } from "@/lib/types";

type FilterOperator = "equals" | "contains" | "startsWith" | "endsWith" | "greaterThan" | "lessThan";
type LogicalOperator = "and" | "or";

interface FilterCondition {
  id: string;
  field: keyof Lead | "";
  operator: FilterOperator;
  value: string;
}

interface FilterGroup {
  id: string;
  logicalOperator: LogicalOperator;
  conditions: FilterCondition[];
}

interface FilterBuilderProps {
  onApplyFilter: (filter: FilterGroup) => void;
  onSaveFilter?: (name: string, filter: FilterGroup) => void;
  savedFilters?: { id: string; name: string; filter: FilterGroup }[];
  onLoadFilter?: (filterId: string) => void;
}

const FIELD_OPTIONS: { label: string; value: keyof Lead }[] = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Company", value: "company" },
  { label: "Phone", value: "phone" },
  { label: "Source", value: "source" },
  { label: "Status", value: "status" },
  { label: "Notes", value: "notes" },
  { label: "Created Date", value: "createdAt" },
  { label: "Updated Date", value: "updatedAt" },
];

const OPERATOR_OPTIONS: { label: string; value: FilterOperator }[] = [
  { label: "Equals", value: "equals" },
  { label: "Contains", value: "contains" },
  { label: "Starts with", value: "startsWith" },
  { label: "Ends with", value: "endsWith" },
  { label: "Greater than", value: "greaterThan" },
  { label: "Less than", value: "lessThan" },
];

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "qualified", "disqualified", "customer"];

export default function FilterBuilder({
  onApplyFilter,
  onSaveFilter,
  savedFilters = [],
  onLoadFilter,
}: FilterBuilderProps) {
  const [filterGroup, setFilterGroup] = useState<FilterGroup>({
    id: "main",
    logicalOperator: "and",
    conditions: [{ id: "1", field: "", operator: "equals", value: "" }]
  });

  const [saveFilterName, setSaveFilterName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedSavedFilter, setSelectedSavedFilter] = useState("");

  const addCondition = () => {
    setFilterGroup(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        {
          id: Date.now().toString(),
          field: "",
          operator: "equals",
          value: ""
        }
      ]
    }));
  };

  const removeCondition = (id: string) => {
    if (filterGroup.conditions.length <= 1) return; // Keep at least one condition

    setFilterGroup(prev => ({
      ...prev,
      conditions: prev.conditions.filter(condition => condition.id !== id)
    }));
  };

  const updateCondition = (id: string, field: keyof FilterCondition, value: any) => {
    setFilterGroup(prev => ({
      ...prev,
      conditions: prev.conditions.map(condition =>
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    }));
  };

  const handleApplyFilter = () => {
    onApplyFilter(filterGroup);
  };

  const handleLogicalOperatorChange = (operator: LogicalOperator) => {
    setFilterGroup(prev => ({
      ...prev,
      logicalOperator: operator
    }));
  };

  const handleSaveFilter = () => {
    if (saveFilterName.trim() && onSaveFilter) {
      onSaveFilter(saveFilterName, filterGroup);
      setSaveFilterName("");
      setShowSaveDialog(false);
    }
  };

  const handleLoadFilter = () => {
    if (selectedSavedFilter && onLoadFilter) {
      onLoadFilter(selectedSavedFilter);
    }
  };

  return (
    <div className="bg-black/40 rounded-lg p-4 border border-gray-800 mb-4">
      <h3 className="text-lg font-medium text-white mb-4">Advanced Filter</h3>

      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-gray-300">Match</span>
          <div className="flex rounded-md overflow-hidden border border-gray-700">
            <button
              type="button"
              onClick={() => handleLogicalOperatorChange("and")}
              className={`px-3 py-1 text-sm ${
                filterGroup.logicalOperator === "and"
                  ? "bg-primary text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              ALL
            </button>
            <button
              type="button"
              onClick={() => handleLogicalOperatorChange("or")}
              className={`px-3 py-1 text-sm ${
                filterGroup.logicalOperator === "or"
                  ? "bg-primary text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              ANY
            </button>
          </div>
          <span className="text-gray-300">of the following conditions:</span>
        </div>

        <div className="space-y-3">
          {filterGroup.conditions.map((condition) => (
            <div key={condition.id} className="flex flex-wrap gap-2 items-center">
              <select
                value={condition.field}
                onChange={(e) => updateCondition(condition.id, "field", e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select field</option>
                {FIELD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={condition.operator}
                onChange={(e) => updateCondition(condition.id, "operator", e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {OPERATOR_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {condition.field === "status" ? (
                <select
                  value={condition.value}
                  onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={condition.field === "createdAt" || condition.field === "updatedAt" ? "date" : "text"}
                  value={condition.value}
                  onChange={(e) => updateCondition(condition.id, "value", e.target.value)}
                  placeholder="Value"
                  className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              )}

              <button
                type="button"
                onClick={() => removeCondition(condition.id)}
                className="p-1 text-gray-400 hover:text-red-500"
                aria-label="Remove condition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addCondition}
          className="mt-3 flex items-center text-sm text-primary hover:text-primary/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add condition
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={handleApplyFilter}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm font-medium"
        >
          Apply Filter
        </button>

        {onSaveFilter && (
          <button
            type="button"
            onClick={() => setShowSaveDialog(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
          >
            Save Filter
          </button>
        )}

        {savedFilters.length > 0 && (
          <div className="flex gap-2">
            <select
              value={selectedSavedFilter}
              onChange={(e) => setSelectedSavedFilter(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Saved filters</option>
              {savedFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleLoadFilter}
              disabled={!selectedSavedFilter}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Load
            </button>
          </div>
        )}
      </div>

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-white mb-4">Save Filter</h3>

            <div className="mb-4">
              <label htmlFor="filterName" className="block text-sm font-medium text-gray-300 mb-1">
                Filter Name
              </label>
              <input
                type="text"
                id="filterName"
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter filter name"
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
                onClick={handleSaveFilter}
                disabled={!saveFilterName.trim()}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
