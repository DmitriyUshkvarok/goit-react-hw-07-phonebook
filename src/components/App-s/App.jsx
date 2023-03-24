// import { useState } from 'react';
// import { nanoid } from 'nanoid';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactForm';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/contactsSlice';
import css from './App.module.css';

function App() {
  const contacts = useSelector(getContacts);

  return (
    <>
      <ContactForm />
      <Filter />
      {contacts[0] ? (
        <ContactList />
      ) : (
        <p className={css.filterInfo}>There’s nothing here yet...</p>
      )}
    </>
  );
}

export default App;
