export const RECEIVE_STATS = 'RECEIVE_STATS';

export function receiveStats(stats) {
  return {
    type: RECEIVE_STATS,
    stats
  }
}