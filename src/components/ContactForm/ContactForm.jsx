import css from './ContactForm.module.css';
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from 'redux/contactApi';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [createContact, { isLoading }] = useCreateContactMutation();
  const { data: contacts } = useGetContactsQuery();

  const handleSubmit = event => {
    event.preventDefault();
    const existingContact = contacts?.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.phone === phone
    );

    if (existingContact) {
      toast.error(`${name} already exists in the contact list.`);
      return;
    }

    createContact({ name, phone })
      .then(() => {
        toast.success(`${name} is added to the contact list.`);
        setName('');
        setPhone('');
      })
      .catch(() => {
        toast.error(`Failed to add ${name} to the contact list.`);
      });
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
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
            onChange={handleNameChange}
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
            value={phone}
            onChange={handlePhoneChange}
            placeholder="number"
            type="tel"
            name="phone"
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
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add contact'}
      </button>
    </form>
  );
}

export default ContactForm;
