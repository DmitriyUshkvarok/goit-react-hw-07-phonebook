import ContactItem from '../ContactItem/ContactItem';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContact,
  getFilter,
  getContacts,
} from '../../redux/contactsSlice';

function ContactList() {
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const deleteSelectedContact = contactId => dispatch(deleteContact(contactId));

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContactList = filtredContacts();

  return (
    <ul className={css.contactList}>
      {filteredContactList.map(({ id, name, number }) => {
        return (
          <li className={css.item} key={id}>
            <ContactItem
              id={id}
              name={name}
              number={number}
              onDeleteContact={deleteSelectedContact}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ContactList;
