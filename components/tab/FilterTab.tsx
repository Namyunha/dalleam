import React from 'react';
import LocationFilter from '../filter/LocationFilter';
import DateFilter from '../filter/DateFilter';
import SortByFilter from '../filter/SortByFilter';

function FilterTab({ isReviewPage }: { isReviewPage: boolean }) {
  return (
    <div className="flex justify-between items-start self-stretch">
      <div className="flex items-start gap-2">
        <LocationFilter />
        <DateFilter />
      </div>
      <SortByFilter isReviewPage={isReviewPage} />
    </div>
  );
}

export default FilterTab;
