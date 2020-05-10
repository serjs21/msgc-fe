import React from 'react';
import { Select } from 'antd';
import './StatusFilter.css';

const { Option } = Select;

const options = [
  {key: 'All Requests', value: null},
  {key: 'Open', value: 'open'},
  {key: 'Approved', value: 'approved'},
  {key: 'Rejected', value: 'rejected'},
]

const Filer = ({onFilter}) => {
  return <div className='filter'>
    <span className='filter-title'>Status</span>
    <Select onChange={onFilter} defaultValue={options[0].value} className='filter-select'>
      {options.map((option, idx) => (<Option value={option.value} key={idx.toString()}>{option.key}</Option>))}
    </Select>
  </div>
}

export default Filer;