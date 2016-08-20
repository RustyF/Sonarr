import sortDirections from 'Utilities/sortDirections';
import { setServerSideCollectionSort } from '../baseActions';

function createSetServerSideCollectionSortHandler(section, getFromState, fetchHandler) {
  return function(payload) {
    return function(dispatch, getState) {
      const state = getFromState(getState())[section];
      const sortKey = payload.sortKey || state.sortKey;
      let sortDirection = payload.sortDirection;

      if (!sortDirection) {
        if (payload.sortKey === state.sortKey) {
          sortDirection = state.sortDirection === sortDirections.ASCENDING ?
                          sortDirections.DESCENDING :
                          sortDirections.ASCENDING;
        } else {
          sortDirection = state.sortDirection;
        }
      }

      dispatch(setServerSideCollectionSort({ section, sortKey, sortDirection }));
      dispatch(fetchHandler());
    };
  };
}

export default createSetServerSideCollectionSortHandler;
