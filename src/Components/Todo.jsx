import React, { useState, useEffect } from "react";

const Todo = () => {
  const [showForm, setshowform] = useState(true);
  const [showNew, setshowNew] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [inputTitle, setinputTitle] = useState("");
  const [inputDesc, setinputDesc] = useState("");
  const [items, setitems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('todos');
    if (storedItems) {
      setitems(JSON.parse(storedItems)); // Parse and set the items
    }
  }, []);

  const handleInput = (e) => setinputTitle(e.target.value);
  const handleInputdesc = (e) => setinputDesc(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTitle || !inputDesc) {
      alert("Fill in both fields");
      return;
    }

    const newItem = { id: new Date().getTime().toString(), name: inputTitle, desc: inputDesc };
    if (toggleSubmit) {
      setitems((prevItems) => {
        const updatedItems = [newItem, ...prevItems];
        localStorage.setItem('todos', JSON.stringify(updatedItems)); // Save to local storage
        return updatedItems;
      });
    } else {
      setitems((prevItems) => {
        const updatedItems = prevItems.map(item => item.id === isEditItem ? newItem : item);
        localStorage.setItem('todos', JSON.stringify(updatedItems)); // Save to local storage
        return updatedItems;
      });
    }

    setinputTitle("");
    setinputDesc("");
    settoggleSubmit(true);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setitems(updatedItems);
    localStorage.setItem('todos', JSON.stringify(updatedItems)); // Save to local storage
  };

  const handleEdit = (id) => {
    const editItem = items.find((item) => item.id === id);
    setinputTitle(editItem.name);
    setinputDesc(editItem.desc);
    settoggleSubmit(false);
    setisEditItem(id);
  };

  return (
    <div className="container">
      {showNew && (
        <div className="col-12 text-end">
          <button className="btn btn-primary" onClick={() => setshowform(true)}>
            New
          </button>
        </div>
      )}

      {showForm && (
        <div className="border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="text-center">
              <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
            </div>
            <form className="col-12 p-2" onSubmit={handleSubmit}>
              <label htmlFor="title" className="my-2">Enter Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="title"
                className="w-100 my-1 p-2"
                onChange={handleInput}
                value={inputTitle}
              />
              <label className="my-2" htmlFor="description">Enter Description</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                className="w-100 my-1 p-2"
                onChange={handleInputdesc}
                value={inputDesc}
              />
              <button className="btn btn-primary my-2">
                {toggleSubmit ? "Save" : "Update"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="py-2">
        {items.map((elem) => (
          <div className="row border rounded shadow p-3 mb-3 bg-white rounded" key={elem.id}>
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div>
                <h4>{elem.name}</h4>
                <p>{elem.desc}</p>
              </div>
              <div>
                <button className="btn btn-primary mx-2" onClick={() => handleEdit(elem.id)}>Edit</button>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(elem.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 

export default Todo;
