import { rest } from 'msw';
import sortBy from 'sort-by';
import type { IContact } from '../types';

const initialState: IContact[] = [
  {
    id: Math.random().toString(36).substring(2, 9),
    favorite: false,
    createdAt: Date.now() + 1,
  },
  {
    id: Math.random().toString(36).substring(2, 9),
    favorite: false,
    createdAt: Date.now() + 2,
  },
];

const contacts: IContact[] = [];

export const handlers = [
  rest.get<IContact[]>('/', (_, res, ctx) => {
    if (contacts.length === 0) {
      return res(ctx.status(200), ctx.delay(1000), ctx.json(initialState));
    }

    const sortedContacts = contacts.sort(sortBy('last', 'createAt'));
    return res(ctx.status(200), ctx.delay(1000), ctx.json(sortedContacts));
  }),
];
