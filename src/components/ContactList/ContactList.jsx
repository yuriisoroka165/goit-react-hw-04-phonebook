import PropTypes from "prop-types";
import ContactListItem from "../ContactListItem/ContactListItem";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact }) => (
    <ul className={css.contactList__list}>
        {contacts.map(({ id, name, number }) => (
            <ContactListItem
                key={id}
                id={id}
                name={name}
                number={number}
                onDeleteContact={onDeleteContact}
            />
        ))}
    </ul>
);

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
