import { createSlice } from '@reduxjs/toolkit';

const contactsInitState = () => {
  if (JSON.parse(localStorage.getItem('contacts')) === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem('contacts'));
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitState(),
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, number, id) {
        return {
          payload: {
            name,
            number,
            id,
          },
        };
      },
    },
    deleteContact(state, action) {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
