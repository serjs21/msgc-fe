import React, {useEffect, useState} from 'react';
import {Input} from 'antd';
import './Search.css';

interface Props {
  onSearch: Function,
  placeholder?: string
}

const DEBOUNCE_DELAY = 300;

const Search = ({onSearch, placeholder = ''}: Props) => {
  const [query, setQuery] = useState();
  const [timeout, saveTimeout] = useState(null);

  const onChange = (e) => {
    const {value} = e.target;
    setQuery(value)
  };

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    saveTimeout(setTimeout(() => onSearch(query), DEBOUNCE_DELAY));
  }, [query]);

  return <span className='search-wrapper'>
    <Input.Search onChange={onChange} placeholder={placeholder} className='search'/>
  </span>
}

export default Search;