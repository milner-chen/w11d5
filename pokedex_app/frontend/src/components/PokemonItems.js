import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, getItems } from "../store/items";

const PokemonItems = ({ pokemon, setEditItemId }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems(pokemon.number))
  }, []);
  
  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });
  

  if (!items) {
    return null;
  }

  const deleteThis = (e) => {
    // debugger
    dispatch(deleteItem(e, pokemon.number))
  };

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => deleteThis(item.id)}>
            Delete
          </button>
        </td>
        
      )}
    </tr>
  ));
};

export default PokemonItems;