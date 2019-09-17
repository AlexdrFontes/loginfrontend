import { createSelector } from 'reselect'

export const getToken = createSelector([
  (state) => state.emailAuth.token
],
(token) => token
)

export const getRecoverSucess = createSelector([
  (state) => state.emailAuth.recoverSucess
],
(recoverSucess) => recoverSucess
)

export const getRecoverError = createSelector([
  (state) => state.emailAuth.recoverError
],
(recoverError) => recoverError
)

export const getAcceptInvitationSuccess = createSelector([
  (state) => state.emailAuth.token
],
(detail) => detail
)
