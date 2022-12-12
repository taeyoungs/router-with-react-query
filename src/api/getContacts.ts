import axios from 'axios';
import type { IContact } from '../types';

const getContacts = async () => {
  return axios.get<IContact[]>('/').then((res) => res.data);
};

export default getContacts;
