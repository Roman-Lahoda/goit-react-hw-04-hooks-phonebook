import { useState, useEffect } from "react";
import shortid from "shortid";
import s from "./App.module.css";
import ContactsForm from "./component/ContactsForm";
import Filter from "./component/Filter";
import ContactsList from "./component/ContactsList";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setContacts(JSON.parse(window.localStorage.getItem("contacts")) || []);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = (data) => {
    const newContact = {
      id: shortid.generate(),
      ...data,
    };

    const sameContact = contacts.find(
      (contact) => contact.name === newContact.name
    );

    if (sameContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  const onChangeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const onDeleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={s.phonebook}>
      <h1 className={s.pageTitle}>Phonebook</h1>
      <ContactsForm onSubmit={onAddContact} />
      {contacts.length > 0 && <h2 className={s.title}>Contacts</h2>}
      {contacts.length > 1 && (
        <Filter value={filter} onChange={onChangeFilter} />
      )}
      <ContactsList list={filteredContacts} onDelete={onDeleteContact} />
    </div>
  );
}
