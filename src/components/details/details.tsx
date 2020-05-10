import React from 'react';
import './Details.css';


type Column = {
  title: string,
  data: {
    key: string,
    title: string,
  }[]
}

interface Props {
  title: string,
  columnsStructure: Column[],
  data: object[],
}

const Column = ({columnStructure, data}) => {
  return (
    <div className='details-column'>
      <div className='details-column-title'>{columnStructure.title}</div>
      {columnStructure.data.map((entry) =>
        <div className='details-entry' key={entry.title}>
          <span className='details-entry-key'>{entry.title}</span>
          <span className='details-entry-value'>{data[entry.key]}</span>
        </div>
      )}
    </div>
  )
}

const Details = ({title, columnsStructure, data}: Props) => {
  let content = null;

  if (data.length === 1) {
    content = columnsStructure.map((column) => <Column columnStructure={column} data={data[0]} key={column.title}/>);
  }

  if (data.length > 1) {
    content = <div className='multiple-selected'>{data.length} items selected</div>
  }

  return (
    <div className='details'>
      <div className='details-title'>{title}</div>
      <div className='details-content'>
        {content}
      </div>
    </div>
  )
};


export default Details;