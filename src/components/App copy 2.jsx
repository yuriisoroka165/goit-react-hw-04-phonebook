import { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import css from "./App.module.css";

class App extends Component {
    state = {
        contacts: [],
        filter: "",
    };

    componentDidMount() {
        const contacts = localStorage.getItem("contacts");
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
        }
    };

    deleteContact = contactId => {
        this.setState(prevState => {
            return {
                contacts: prevState.contacts.filter(
                    contact => contact.id !== contactId
                ),
            };
        });
    };

    newContactAudit = newContact => {
        return this.state.contacts.filter(
            contact =>
                contact.name.toLowerCase() === newContact.name.toLowerCase()
        );
    };

    contactFormSubmitHandler = newContact => {
        if (this.newContactAudit(newContact).length > 0) {
            alert(`${newContact.name} is already in contacts.`);
            return false;
        } else {
            this.setState(prevState => ({
                contacts: [...prevState.contacts, newContact],
            }));
            return true;
        }
    };

    contactFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    render() {
        const { contacts, filter } = this.state;
        const filterValueLowerCase = filter.toLowerCase();

        const visibleContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(filterValueLowerCase)
        );

        return (
            <div className={css.app__container}>
                <h1>Phonebok</h1>
                <ContactForm onSubmit={this.contactFormSubmitHandler} />

                <h2>Contacts</h2>
                <Filter filterValue={filter} onChange={this.contactFilter} />
                <ContactList
                    onDeleteContact={this.deleteContact}
                    contacts={visibleContacts}
                />
            </div>
        );
    }
}

export default App;
