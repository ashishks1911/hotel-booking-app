import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range';

const DateSlider = ({ onDateChange, onFilterChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection"
  })

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  }

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection"
    })
    onDateChange(null, null);
    onFilterChange(null, null);
  }
  return (
    <div>
      <h4>Filter Booking By Date</h4>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className='mb-4'
      />
      <button className='btn btn-secondary' onClick={handleClearFilter}>Clear Filter</button>

    </div>
  )
}

export default DateSlider
