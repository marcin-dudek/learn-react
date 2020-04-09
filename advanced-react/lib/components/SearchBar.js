import React, {useState, useRef, useCallback, memo} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {fade, makeStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBar = (props) => {
  const {doSearch} = {...props};
  const classes = useStyles();
  const [value, setValue] = useState('');
  const search = useRef(
    debounce((q) => {
      doSearch(q);
    }, 600)
  ).current;

  const handleChange = useCallback((e) => {
    if (value !== e.target.value) {
      setValue(e.target.value);
      search(e.target.value);
    }
  });

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{'aria-label': 'search'}}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

SearchBar.propTypes = {
  doSearch: PropTypes.func.isRequired,
};

// SearchBar.whyDidYouRender = true;

export default memo(SearchBar);
