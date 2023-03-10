import { useEffect, useState } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import css from "./App.module.css";

export default function App() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        try {
            const contacts = localStorage.getItem("contacts");
            const parsedContacts = JSON.parse(contacts);
            if (parsedContacts) {
                setContacts([...contacts]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);

    const deleteContact = contactId => {
        setContacts(prevState => {
            prevState.contacts.filter(contact => contact.id !== contactId);
        });
    };

    const newContactAudit = newContact => {
        return contacts.filter(
            contact =>
                (contact.name.toLowerCase() === newContact.name.toLowerCase())
        );
    };

    const contactFormSubmitHandler = newContact => {
        if (newContactAudit(newContact).length > 0) {
            alert(`${newContact.name} is already in contacts.`);
            return false;
        } else {
            setContacts(prevState => ({
                contacts: [...prevState.contacts, newContact],
            }));
            return true;
        }
    };

    const contactFilter = event => {
        setFilter(event.target.value);
    };

    // const filterValueLowerCase = filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
        contact.name
    );
    console.log(visibleContacts);

    return (
        <div className={css.app__container}>
            <h1>Phonebok</h1>
            <ContactForm onSubmit={contactFormSubmitHandler} />

            <h2>Contacts</h2>
            <Filter filterValue={filter} onChange={contactFilter} />
            <ContactList
                onDeleteContact={deleteContact}
                contacts={visibleContacts}
            />
        </div>
    );
}
