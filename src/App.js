import { useDataLayerValue } from "./global-state/DataLayer"
import List from './components/List';
import './App.css'
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  const [state, dispatch] = useDataLayerValue();
  const [newListTitle, setNewListTitle] = useState('');

  const onTypeListHandler = (e) => {
    return setNewListTitle(e.target.value)
  }

  const createNewList = () => {
    setNewListTitle('')
    dispatch({
      type: "ADD_LIST",
      title: newListTitle
    })
  }

  const handleOnDragEnd = (result) => {
    // TO DO: Reordering logic
    const { destination, source, draggableId } = result;

    if(!destination) return;

    dispatch({
      type: "DRAG_HAPPENED",
      dragItems: {
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        draggableId
      }
    })
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="App">
        <div className="all-lists">
          {state.map((list, index) => {;
            return <List list={list} key={index}/>
          })}
          <div className="add-list">
            <input type="text" placeholder="Add new list" onChange={onTypeListHandler} value={newListTitle}/>
            <button onClick={createNewList}>Add</button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
