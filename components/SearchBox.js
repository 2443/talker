import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';

const { Search } = Input;

const SearchBox = ({ placeholder, action, loading }) => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword, changeSearchKeyword] = useInput('');
  const onSearch = useCallback(() => {
    dispatch(action(searchKeyword));
  }, [searchKeyword]);
  return (
    <div style={{ margin: '10px' }}>
      <Search
        placeholder={placeholder}
        value={searchKeyword}
        onChange={changeSearchKeyword}
        onSearch={onSearch}
        style={{ height: '30px' }}
        loading={loading}
      />
    </div>
  );
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  action: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default SearchBox;
