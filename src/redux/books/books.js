const ADD_BOOK = 'bookStore/books/ADD_BOOK';
const REMOVE_BOOK = 'bookStore/books/REMOVE_BOOK';
const STARTED_BOOK = 'bookStore/books/STARTED_BOOK';
const MANAGE_BOOK_FAILURE = 'bookStore/books/ADD_BOOK_FAILURE';

const appIdentifier = 'oFzStVgFLC3mbAjB7OrJ';
const urlApi = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi';

const addBook = (payload) => ({
  type: ADD_BOOK,
  payload,
});

const removeBook = (payload) => ({
  type: REMOVE_BOOK,
  payload,
});

const manageBookStarted = () =>({
  type: STARTED_BOOK,
})

const manageBookFailed = error =>({
  type: MANAGE_BOOK_FAILURE,
  payload: {
    error
  }
})
const addBookToApi = (data)=> {
  const url = urlApi + '/apps/' + appIdentifier + '/books';
  return fetch(
    url,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        item_id: data.id,
        title: data.title,
        category: "Fiction"
      }),
    }
  );
}

const deleteBookFromApi = (id) => {
  const url = urlApi + '/apps/' + appIdentifier + '/books/' + id;
  return fetch(
    url,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({item_id: id})
    }
  );
}
export const addNewBook = (payload) => {
  return dispatch => {
    dispatch(manageBookStarted());
    addBookToApi(payload)
    .then(res => {
      dispatch(addBook(payload));
    })
    .catch(err =>{
      dispatch(addBookFailed(err.message));
    })

  }
}

export const removeExistBook = (id) => {
  return dispatch => {
    dispatch(manageBookStarted());
    deleteBookFromApi(id)
    .then(res => {
      dispatch(removeBook);
    })
    .catch(err => {

    })
  }
}

const booksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOOK:
      return [
        ...state,
        action.payload,
      ];
    case REMOVE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};

export default booksReducer;
