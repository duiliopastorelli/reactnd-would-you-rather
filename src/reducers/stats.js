import {RECEIVE_STATS} from "../actions/stats";

export default function stats(state = {}, action) {
  switch (action.type) {
    case RECEIVE_STATS:
      return {
        ...state,
        ...action.stats
      };

    default:
      return state
  }
}