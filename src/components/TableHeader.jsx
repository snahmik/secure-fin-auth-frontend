import React from 'react';

const TableHeader = ({headerLabels}) => {
  return (
    <thead className='border-b-2'>
    <tr className='text-left text-sm font-bold uppercase tracking-wider'>
      {headerLabels.map((headerLabel, index) => {
        let cssClass = index === 0 ? 'p-4 pt-2' : 'p-4 pt-2 border-l border-slate-200';

        if (headerLabel === 'Action') {
          cssClass += ' text-center w-1'
        }

        return <th key={'header' + index}
                   className={cssClass}>{headerLabel}</th>
      })
      }
    </tr>
    </thead>
  );
};

export default TableHeader;