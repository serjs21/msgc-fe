import {fetchPage, updateStatus} from "./requests";

export const TYPES = {
  store: 'STORE_EMAILS',
  setStatus: 'SET_STATUS',
  setPage: 'SET_PAGE',
  reset: 'RESET',
  delete: 'DELETE',
};

export const storeEmails = (emails) => ({
  type: TYPES.store,
  payload: emails
});

export const deleteEmails = (ids) => ({
  type: TYPES.delete,
  payload: ids
});

export const setPage = (page) => ({
  type: TYPES.setPage,
  payload: page
});

export const reset = () => ({
  type: TYPES.reset
})

export const fetch = (page: number, filter?: string | null, query?:string | null) => async (dispatch, getState) => {
  const pagesCount = getState().get('storedPages');
  if(page === 1) {
    dispatch(reset());
  }
  if (page > pagesCount) {
    const emails = await fetchPage(page, filter, query)
    if (emails.length) {
      dispatch(storeEmails(emails));
      dispatch(setPage(page));
    }
  }
};

export const requestUpdateStatus = (emails, status: 'approved' | 'rejected') => async (dispatch) => {
  const ids = emails.map(email => email.id);
  await updateStatus(ids, status);
  dispatch(storeEmails(emails.map(email => ({...email, status}))));
}