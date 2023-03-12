import { useEffect, useState } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import css from "./App.module.css";

export default function App() {
    //лінива ініціалізація стану contacts
    const [contacts, setContacts] = useState(() => {
        return JSON.parse(localStorage.getItem("contacts")) ?? [];
    });
    const [filter, setFilter] = useState("");

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
        if (contacts.length === 0) {
            localStorage.removeItem("contacts");
        }
    }, [contacts]);

    const deleteContact = contactId => {
        setContacts(prevContacts => [
            ...prevContacts.filter(contact => contact.id !== contactId),
        ]);
    };

    // в даній функції знаки питання після значень перевіряють чи існує таке значення передвикликом toLowerCase()
    const newContactAudit = newContact => {
        return contacts.filter(
            contact =>
                contact.name?.toLowerCase() === newContact.name?.toLowerCase()
        );
    };

    const contactFormSubmitHandler = newContact => {
        if (newContactAudit(newContact).length > 0) {
            alert(`${newContact.name} is already in contacts.`);
            return false;
        } else {
            setContacts(prevContacts => [...prevContacts, newContact]);
            return true;
        }
    };

    const contactFilter = event => {
        setFilter(event.target.value);
    };

    const filterValueLowerCase = filter?.toLowerCase();

    const visibleContacts = contacts.filter(contact => {
        return contact.name?.toLowerCase().includes(filterValueLowerCase);
    });

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
