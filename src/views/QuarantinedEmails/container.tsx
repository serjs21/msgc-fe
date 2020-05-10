import React from 'react';
import {ActionButton} from "../../components";
import {MailTwoTone, PlusOutlined} from '@ant-design/icons';
import {createNew} from "../../store/emails/requests";
import {message} from 'antd';

message.config({
  duration: 1,
});

const QuarantinedEmails = () => {
  const onClick = () => {
    createNew();
    message.info(<span><PlusOutlined style={{
      fontSize: '26px',
      color: '#1690fe',
    }}/>
    <MailTwoTone style={{ fontSize: '26px' }}/> </span>)
  }
  return <div style={{
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: '40px',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <img style={{height: '550px', width: '1000px', paddingBottom: '20px'}} className="img-responsive"
         src={'https://freefrontend.com/assets/img/html-funny-404-pages/GSAP-SVG-Animation-404-Error-Milk-Carton.png'}
         alt="logo"/>

    <ActionButton onClick={onClick} title='Add New Email though' icon={<MailTwoTone/>}/>
  </div>
};

export default QuarantinedEmails;