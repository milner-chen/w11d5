export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

export const deleteItem = (id, pokemonId) => async dispatch => {
  const res = await fetch(
    `/api/items/${id}`,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accpet': 'application/json'
      }
    }
  )
  if (res.ok) {
    // debugger
    const data = await res.json();
    dispatch(remove(data, pokemonId));
    console.log("deletion worked!")
  } else console.log('something');
}

export const getItems = (id) => async dispatch => {
  fetch(`/api/pokemon/${id}/items`)
  .then((res) => {
    if (res.ok) {
      console.log("grabbing items worked");
      return res.json();
    } else console.log ("we messed up");
  })
  .then((arr) => {
    // debugger;
    dispatch(load(arr, id));
  })
}

export const editItem = (item) => async (dispatch) => {

  const res = await fetch(
    `/api/items/${item.id}`,
    {
      method: 'PUT', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify(item)
    }
  );

  if (res.ok) {
    console.log("items ok")
    const data = await res.json();
    dispatch(update(data));
    return true;
  } else {
    console.log("item not ok...");
    return false;
  };

}

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;