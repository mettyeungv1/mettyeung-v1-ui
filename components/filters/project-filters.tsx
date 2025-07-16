"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Calendar, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterChip } from '@/components/ui/filter-chip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjectStore } from '@/lib/stores/project-store';

const months = [
  { value: 1, label: 'January', label_km: 'មករា' },
  { value: 2, label: 'February', label_km: 'កុម្ភៈ' },
  { value: 3, label: 'March', label_km: 'មីនា' },
  { value: 4, label: 'April', label_km: 'មេសា' },
  { value: 5, label: 'May', label_km: 'ឧសភា' },
  { value: 6, label: 'June', label_km: 'មិថុនា' },
  { value: 7, label: 'July', label_km: 'កក្កដា' },
  { value: 8, label: 'August', label_km: 'សីហា' },
  { value: 9, label: 'September', label_km: 'កញ្ញា' },
  { value: 10, label: 'October', label_km: 'តុលា' },
  { value: 11, label: 'November', label_km: 'វិច្ឆិកា' },
  { value: 12, label: 'December', label_km: 'ធ្នូ' },
];

export function ProjectFilters() {
  const { 
    filters, 
    setFilters, 
    resetFilters, 
    getProjectCategories, 
    getAvailableYears 
  } = useProjectStore();

  const categories = getProjectCategories();
  const availableYears = getAvailableYears();

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== null && value !== '' && value !== 'all'
  ).length;

  const handleCategoryChange = (category: string) => {
    setFilters({ category });
  };

  const handleYearChange = (year: string) => {
    setFilters({ 
      year: year === 'all' ? null : parseInt(year),
      month: null // Reset month when year changes
    });
  };

  const handleMonthChange = (month: number) => {
    setFilters({ month: filters.month === month ? null : month });
  };

  const handleSearchChange = (search: string) => {
    setFilters({ search });
  };

  const handleStatusChange = (status: string) => {
    setFilters({ status });
  };

  return (
    <div className="space-y-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={resetFilters}
            disabled={activeFiltersCount === 0}
            className="h-11"
          >
            <X className="w-4 h-4 mr-2" />
            Clear ({activeFiltersCount})
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-500" />
          <h3 className="font-medium text-gray-900">Categories</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={`${category.name} (${category.count})`}
              active={filters.category === category.id}
              onClick={() => handleCategoryChange(category.id)}
              variant="outline"
            />
          ))}
        </div>
      </div>

      {/* Year and Month Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Year Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Year</h3>
          </div>
          <Select 
            value={filters.year?.toString() || 'all'} 
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="font-medium text-gray-900">Status</h3>
          </div>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Modern Month Filter (only show if year is selected) */}
      <AnimatePresence>
        {filters.year && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Months in {filters.year}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({ month: null })}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear month
              </Button>
            </div>
            
            {/* Modern horizontal scrollable month filter */}
            <div className="relative">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
                <Button
                  variant={filters.month === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters({ month: null })}
                  className="whitespace-nowrap flex-shrink-0 min-w-16"
                >
                  All
                </Button>
                {months.map((month) => (
                  <Button
                    key={month.value}
                    variant={filters.month === month.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleMonthChange(month.value)}
                    className="whitespace-nowrap flex-shrink-0 min-w-20"
                  >
                    {month.label}
                  </Button>
                ))}
              </div>
              
              {/* Gradient fade for scroll indication */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Summary */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <span className="text-sm font-medium text-blue-900">Active filters:</span>
            
            {filters.category !== 'all' && (
              <FilterChip
                label={`Category: ${categories.find(c => c.id === filters.category)?.name}`}
                removable
                onRemove={() => setFilters({ category: 'all' })}
                variant="secondary"
                size="sm"
              />
            )}
            
            {filters.year && (
              <FilterChip
                label={`Year: ${filters.year}`}
                removable
                onRemove={() => setFilters({ year: null, month: null })}
                variant="secondary"
                size="sm"
              />
            )}
            
            {filters.month && (
              <FilterChip
                label={`Month: ${months.find(m => m.value === filters.month)?.label}`}
                removable
                onRemove={() => setFilters({ month: null })}
                variant="secondary"
                size="sm"
              />
            )}
            
            {filters.status !== 'all' && (
              <FilterChip
                label={`Status: ${filters.status}`}
                removable
                onRemove={() => setFilters({ status: 'all' })}
                variant="secondary"
                size="sm"
              />
            )}
            
            {filters.search && (
              <FilterChip
                label={`Search: "${filters.search}"`}
                removable
                onRemove={() => setFilters({ search: '' })}
                variant="secondary"
                size="sm"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}