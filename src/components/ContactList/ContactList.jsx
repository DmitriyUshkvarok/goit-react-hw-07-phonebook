import ContactItem from '../ContactItem/ContactItem';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactApi';
import { getFilter } from 'redux/contactSelector';

function ContactList() {
  const { data: contacts, isFetching, error } = useGetContactsQuery();
  const { filter } = useSelector(state => getFilter(state));

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const filteredContactList = filteredContacts();

  if (!filteredContactList || filteredContactList.length === 0) {
    return <p className={css.filterInfo}>There's nothing here yet...</p>;
  }

  if (isFetching) {
    return <p className={css.loadingList}>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <ul className={css.contactList}>
      {filteredContactList &&
        filteredContactList.map(({ id, name, phone }) => {
          return (
            <li className={css.item} key={id}>
              <ContactItem id={id} name={name} phone={phone} />
            </li>
          );
        })}
    </ul>
  );
}

export default ContactList;
