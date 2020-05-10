import React from 'react';
import {Table} from 'antd';
import {startCase, capitalize} from 'lodash';

const columns = [
  {
    title: 'ID',
    dataIndex: 'uuid',
  },
  {
    title: 'Request Time',
    dataIndex: 'requestedAt',
    render: (date) => new Date(date).toLocaleString()
  },
  {
    title: 'Requested By',
    dataIndex: 'requestedBy',
    render: startCase,
  },
  {
    title: 'Recipient',
    dataIndex: 'recipient',
    render: startCase,
  },
  {
    title: 'Sender',
    dataIndex: 'sender',
    render: startCase,
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    render: capitalize,
  },
  {
    title: 'Categorized As',
    dataIndex: 'category',
    render: capitalize,
  },
];

const EmailsTable = ({emails = [], onSelect, className, onScroll}) => {

  const OnScrollDown = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;

    if (bottom < 30) {
      onScroll();
    }
  }

  const onChange = (ids, items) => {
    onSelect(items.filter(Boolean));
  }

  return <span onScrollCapture={OnScrollDown}>
    <Table dataSource={emails}
           rowKey="id"
           pagination={false}
           columns={columns}
           className={className}
           rowSelection={{
             type: 'checkbox',
             onChange,
           }}
    />
  </span>
}

export default EmailsTable;