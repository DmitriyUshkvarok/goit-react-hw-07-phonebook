import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/contactsSlice';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();

  const changeFieldFilter = e => {
    const value = e.currentTarget.value;
    dispatch(changeFilter(value));
  };
  return (
    <label>
      <input
        className={css.inputFilter}
        placeholder="Enter to search..."
        type="text"
        name="filter"
        onChange={changeFieldFilter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
    </label>
  );
};

export default Filter;
