// import PropTypes from 'prop-types';
import { FcCellPhone } from 'react-icons/fc';
import css from './ContactItem.module.css';
import { useDeleteContactMutation } from 'redux/contactApi';

function ContactItem({ id, name, phone }) {
  const [deleteContact] = useDeleteContactMutation();

  const deleteSelectedContact = id => {
    deleteContact(id);
  };

  return (
    <>
      <a className={css.link} href="tel:{number}">
        <p className={css.name}>{name}</p>
        <div className={css.numberWrapper}>
          <p className={css.number}>{phone}</p>
          <FcCellPhone />
        </div>
      </a>
      <button
        className={css.btnDeleted}
        type="button"
        onClick={() => deleteSelectedContact(id)}
      >
        Delete
      </button>
    </>
  );
}

export default ContactItem;

// ContactItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
// };
