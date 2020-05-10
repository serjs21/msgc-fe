import React, {useEffect, useState} from 'react';
import {deleteEmails, fetch, requestUpdateStatus, reset} from '../../store/emails/actions';
import {connect} from 'react-redux';
import {every, capitalize} from 'lodash';
import EmailsTable from './table';
import Details from './email-details';
import ActionBar from "./action-bar";
import './ReleaseRequests.css';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {notification} from 'antd';

const Loading = () => <div className='spinner-wrapper'><Spin tip="Loading..." indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}/></div>

const ReleaseRequests = ({fetchPage, emails, storedPages, onReset, updateStatus, deleteEmails}) => {
  const [selectedEmails, selectEmail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [query, setQuery] = useState(undefined);
  const [filter, setFilter] = useState(null);
  const [allowedActions, setAllowedActions] = useState(false);
  const [emailsCollection, setEmailsCollection] = useState([]);

  const onScroll = () => {
    if (page === storedPages) {
      setPage(page + 1);
    }
  };

  const getStatusUpdater = (status) => async () => {
    await updateStatus(selectedEmails, status);
    notification.success({
      message: `Email Updated`,
      description: `Status changed to ${capitalize(status)}`,
      placement: 'bottomRight'
    });

    if(filter === 'open') {
      const idsToDelete = selectedEmails.map(email => email.id);
      selectEmail([]);
      deleteEmails(idsToDelete);
    } else {
      selectEmail([]);
    }}

  useEffect(() => {
    setPage(storedPages);
  }, [storedPages]);

  useEffect(() => {
    setPage(0);
  }, [query, filter])

  useEffect(() => {
    setLoading(true);
    if (page === 0) {
      setPage(1);
      selectEmail([]);
      setEmailsCollection([]);
    }
    else fetchPage(page, filter, query).then((emails) => {
      setLoading(false);
      setEmailsCollection([].concat(emailsCollection, emails));
    })
  }, [page])

  useEffect(() => {
    const allowedActionsOnSelected = selectedEmails.length && every(selectedEmails, (email = {} ) => email.status === 'open')
    setAllowedActions(allowedActionsOnSelected)
  }, [selectedEmails])

  return  <div className='release-requests-container'>
    <ActionBar onReject={getStatusUpdater('rejected')}
               onRelease={getStatusUpdater('approved')}
               onRefresh={onReset}
               onFilter={setFilter}
               onSearch={setQuery}
               actionsAllowed={allowedActions}/>
    {loading && page === 1 ? <Loading/> :
      <>
      <EmailsTable emails={emailsCollection} onSelect={selectEmail} className='emails-table' onScroll={onScroll}/>
      <div className='email-table-details'>
      {selectedEmails.length ? <Details email={selectedEmails}/> : null}
      </div>
      </>
    }
  </div>
};

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (page, filter, query) => dispatch(fetch(page, filter, query)),
  onReset: () => dispatch(reset()),
  updateStatus: (emails, status) => dispatch(requestUpdateStatus(emails, status)),
  deleteEmails: (ids) => dispatch(deleteEmails(ids))
})

const mapStateToProps = (state) => ({
  emails: state.get('emails').toJS(),
  storedPages: state.get('storedPages')
})

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseRequests);