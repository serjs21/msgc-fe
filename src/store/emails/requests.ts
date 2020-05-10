import axios from "axios";
import {baseUrl} from '../../config';

type Email = {
  id: number,
  uuid: string,
  createdAt: string,
  recipient: string,
  subject: string,
  sender: string,
  category: 'physing' | 'ransomware' | 'hacking',
  status: 'open' | 'approved' | 'rejected',
  requestedAt: string,
  requestedBy: string,
  requestReason: string,
};

export const fetchPage = async (page = 1, filter, query) => {

  let queryParams = '';
  if (filter) {
    queryParams = queryParams + `&filter=${filter}`
  }

  if(query) {
    queryParams = queryParams + `&search=${query}`
  }

  try {
    const response = await axios.get(baseUrl(`emails?page=${page}${queryParams}`));
    return response.data as Email[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const updateStatus = async (ids, status: 'approved' | 'rejected') => {
  const updateDelta = ids.map(id => ({id, status}));

  try {
    await axios.post(baseUrl(`emails/batch_update`), {
      body: {ids, delta: {status}},
    });
    return updateDelta;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const createNew = async () => {
  try {
    return await axios.post(baseUrl(`emails/new`));
  } catch (e) {
    console.error(e);
  }
}