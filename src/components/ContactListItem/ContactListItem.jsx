import PropTypes from "prop-types";
import css from "./ContactListItem.module.css";

const ContactsListItem = ({ id, name, number, onDeleteContact }) => (
    <li className={css.contactsListItem__item}>
        <span className={css.contactsListItem__item_circle}></span>
        <p className={css.contactsListItem__item_name}>
            {name}:
            <span className={css.contactsListItem__item_number}>{number}</span>
        </p>
        <button
            type="button"
            className={css.contactsListItem__button}
            onClick={() => onDeleteContact(id)}
        >
            Delete
        </button>
    </li>
);


ContactsListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}

export default ContactsListItem;
