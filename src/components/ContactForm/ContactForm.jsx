import { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import css from "./ContactForm.module.css";

export default function ContactForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleChange = event => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (onSubmit({ id: nanoid(), name, number })) {
            reset();
        }
    };

    const reset = () => {
        setName("");
        setNumber("");
    };

    return (
        <form className={css.contactForm__form} onSubmit={handleSubmit}>
            <label
                htmlFor="name"
                className={`${css.contactForm__field} ${css.contactForm__field_label}`}
            >
                Name:
                <input
                    className={css.contactForm__input}
                    id="name"
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleChange}
                />
            </label>
            <label
                htmlFor="number"
                className={`${css.contactForm__field} ${css.contactForm__field_label}`}
            >
                Number:
                <input
                    className={css.contactForm__input}
                    id="number"
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleChange}
                />
            </label>
            <button type="submit" className={css.contactForm__submit_button}>
                Add contact
            </button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
