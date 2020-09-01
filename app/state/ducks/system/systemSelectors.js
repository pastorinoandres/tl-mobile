
// import { createSelector } from 'reselect';

export const getShippingTime = (state)=> state.system.shippingTime
export const getSession = (state) => state.system.session
export const getRegisterData = (state) => state.system.services.email
export const getProvider = (state) => state.system.session?.provider
export const getFirebaseUser = state => state.system.services.firebase?.user
export const getNetInfo = state => state.system.netInfo


// export const getAnswer = createSelector(selector_1, selector_n, (selector_1Return, selector_nReturn )=> x )
