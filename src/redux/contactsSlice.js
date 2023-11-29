import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts } from './operations';

// const contactsInitState = () => {
//   if (JSON.parse(localStorage.getItem('contacts')) === null) {
//     return [];
//   }
//   return JSON.parse(localStorage.getItem('contacts'));
// };
const contactsInitState = {
  contactsList: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contactsList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contactsList = [...state.contactsList, action.payload];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  // reducers: {
  //   addContact: {
  //     reducer(state, action) {
  //       state.push(action.payload);
  //     },
  //     prepare(name, number, id) {
  //       return {
  //         payload: {
  //           name,
  //           number,
  //           id,
  //         },
  //       };
  //     },
  //   },
  //   deleteContact(state, action) {
  //     return state.filter(item => item.id !== action.payload);
  //   },
  // },
});

// export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
