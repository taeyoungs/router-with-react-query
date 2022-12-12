import { QueryClient, useQuery } from '@tanstack/react-query';

import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import getContacts from '../api/getContacts';
import { IContact } from '../types';

const contactsQuery = () => ({
  queryKey: [{ scope: 'contact' }],
  queryFn: async () => getContacts(),
});

export const loader = (queryClient: QueryClient) => async (): Promise<IContact[]> => {
  const query = contactsQuery();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export default function Root() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  const { data: contacts } = useQuery({
    ...contactsQuery(),
    initialData,
  });

  const navigation = useNavigation();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" arai-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>*</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  );
}
