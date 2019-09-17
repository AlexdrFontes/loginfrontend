import { createSelector } from 'reselect'

export const getUser = createSelector([
  (state) => state.auth.user
],
(user) => user
)
