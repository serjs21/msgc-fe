import React from 'react';
import './ActionButton.css';

interface Props {
  onClick: () => void,
  title: string,
  icon: any,
  disabled?: boolean,
  danger?: boolean,
}

const ActionButton = ({onClick, title, icon, disabled = false, danger = false} : Props) => {
  return <button className={`action-button ${disabled ? 'disabled' : 'enabled'} ${danger ? 'danger' : ''}`}  onClick={onClick} disabled={disabled}>
    <span className='action-button-icon'>{icon}</span>
    <span className='action-button-title'>{title}</span>
  </button>

}

export default ActionButton;