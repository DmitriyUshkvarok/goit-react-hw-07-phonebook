import PropTypes from 'prop-types';
import { FcCellPhone } from 'react-icons/fc';
import css from './ContactItem.module.css';

function ContactItem({ id, name, number, onDeleteContact }) {
  return (
    <>
      <a className={css.link} href="tel:{number}">
        <p className={css.name}>{name}</p>
        <div className={css.numberWrapper}>
          <p className={css.number}>{number}</p>
          <FcCellPhone />
        </div>
      </a>
      <button
        className={css.btnDeleted}
        type="button"
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
