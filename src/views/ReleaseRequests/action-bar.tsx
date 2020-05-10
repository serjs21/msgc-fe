import React from 'react';
import {SendOutlined, CloseOutlined, DownloadOutlined, RedoOutlined} from '@ant-design/icons';
import {ActionButton, Search} from "../../components";
import Filter from './status-filter';
import './ActionBar.css';

interface Props {
  onReject: () => void,
  onRelease: () => void,
  onRefresh: () => void,
  onSearch: Function,
  onFilter: Function,
  actionsAllowed: boolean,
}

const ActionBar = ({onRelease, onRefresh, onReject, actionsAllowed, onFilter, onSearch} : Props) => {
  return <div className='action-bar'>
    <Filter onFilter={onFilter}/>
    <span className='right-side-actions'>
      <ActionButton onClick={onRelease} title='Release' icon={<SendOutlined />} disabled={!actionsAllowed}/>
      <ActionButton onClick={onReject} title='Reject' icon={<CloseOutlined />} danger  disabled={!actionsAllowed}/>
      <ActionButton onClick={() => {}} title='Download' icon={<DownloadOutlined />} disabled />
      <ActionButton onClick={onRefresh} title='Refresh' icon={<RedoOutlined />}/>
      <Search onSearch={onSearch} placeholder='Search' />
    </span>
  </div>
}

export default ActionBar;