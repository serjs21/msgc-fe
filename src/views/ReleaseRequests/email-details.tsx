import React from 'react';
import { Details } from '../../components';

const columnsStructure = [{
  title: 'E-mail Information',
  data: [
    {
      title: 'ID',
      key: 'uuid',
  },{
      title: 'Received Time',
      key: 'createdAt',
  },{
      title: 'Recipient',
      key: 'recipient',
  },{
      title: 'Subject',
      key: 'subject',
  },{
      title: 'Sender',
      key: 'sender',
  },{
      title: 'Categorized As',
      key: 'category',
  },
  ]
},
  {
    title: 'Request Information',
    data: [
      {
        title: 'Request Time',
        key: 'uuid',
      },{
        title: 'Requested By',
        key: 'createdAt',
      },{
        title: 'Justification',
        key: 'recipient',
      },
      {
        title: 'Status',
        key: 'status',
      },
    ]
  }]

const EmailDetails = ({email}) => {
  return <Details title='Details' columnsStructure={columnsStructure} data={email}/>
}

export default EmailDetails;