import React from 'react';

const Filter = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onFilterChange(name, checked);
  };

  return (
    <div className="filter-group">
      <label className={`filter-label ${filters.domestic ? 'active' : ''}`}>
        <input
          type="checkbox"
          name="domestic"
          className="filter-checkbox"
          checked={filters.domestic}
          onChange={handleCheckboxChange}
        />
        국내
      </label>
      
      <label className={`filter-label ${filters.global ? 'active' : ''}`}>
        <input
          type="checkbox"
          name="global"
          className="filter-checkbox"
          checked={filters.global}
          onChange={handleCheckboxChange}
        />
        글로벌
      </label>
    </div>
  );
};

export default Filter;
