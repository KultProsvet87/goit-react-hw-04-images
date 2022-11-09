import { Notify } from 'notiflix';
import { ButtonTypes } from 'components/Button/ButtonTypes';
import { Button } from 'components/Button/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const SearchBar = ({ handleSubmite, isLoading }) => {
  const [search, setSearch] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  const handleSearchInput = e => {
    setSearch(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.search.value;

    if (!searchQuery) {
      Notify.warning('Please enter your query in the search box');
      return;
    }

    if (prevSearchQuery === searchQuery) {
      Notify.info('We already found it');
      return;
    }

    setPrevSearchQuery(searchQuery);

    handleSubmite(searchQuery);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <Button {...ButtonTypes.search} disabled={isLoading} />
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={search}
          onChange={handleSearchInput}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  handleSubmite: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
