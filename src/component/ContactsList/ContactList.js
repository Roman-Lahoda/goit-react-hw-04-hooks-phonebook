import PropTypes from "prop-types";
import s from "./ContactList.module.css";

const ContactsList = ({ list, onDelete }) => {
  return (
    <ul className={s.contactList}>
      {list.map((item) => {
        return (
          <li key={item.id} className={s.contact}>
            <span>{item.name}:</span>
            <span>{item.number}</span>
            <button
              className={s.btn}
              type="button"
              onClick={() => {
                onDelete(item.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
