import { useState } from 'react';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContacts } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChangeName = e => setName(e.currentTarget.value);
  const onChangeNunber = e => setNumber(e.currentTarget.value);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const newElement = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? toast.error(
          `${name}`,
          'This user is already in the contact list.',
          'OK'
        )
      : dispatch(addContact(newElement));

    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.formTitle}>PhoneBook</h1>
      <div className={css.inputWrapper}>
        <label className={css.label}>
          Name
          <input
            className={css.inputName}
            value={name}
            onChange={onChangeName}
            placeholder="name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.inputNumber}
            value={number}
            onChange={onChangeNunber}
            placeholder="number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
      </div>
      <button
        className={css.btnSubmit}
        type="submit"
        aria-label="button-submit"
      >
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
