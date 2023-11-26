import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import styles from './contactList.module.css';

export function ContactList() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleClick = itemId => {
    dispatch(deleteContact(itemId));
  };

  if (contacts === null) {
    return null;
  }
  if (filter === '') {
    return (
      <ul className={styles['contact-list']}>
        {contacts.map(item => (
          <li className={styles.contact} key={item.id}>
            <p>
              {item.name}: {item.number}
            </p>
            <button
              type="button"
              className={styles.button}
              id={item.id}
              onClick={() => {
                handleClick(item.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
  let dispName;
  let dispNumber;
  let id;
  contacts.forEach(contact => {
    if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
      dispName = contact.name;
      dispNumber = contact.number;
      id = contact.id;
    }
  });
  return (
    <ul className={styles['contact-list']}>
      <li className={styles.contact} key={id}>
        {dispName}: {dispNumber}
      </li>
    </ul>
  );
}
