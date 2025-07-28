import React, { useEffect, useState } from 'react';

function ApiDemo({ activePage }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState('');
  const [nextId, setNextId] = useState(1);

  const API_URL = 'https://jsonplaceholder.typicode.com/users';


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);

      const maxId = data.reduce((max, user) => Math.max(max, user.id), 0);
      setNextId(maxId + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addUser = () => {
    if (!newUserName.trim()) {
      alert('Please enter a user name.');
      return;
    }

    const newUser = { id: nextId, name: newUserName };
    setUsers(prev => [...prev, newUser]);
    setNextId(prev => prev + 1);
    setNewUserName('');
  };

  const updateUser = (id) => {
    const updatedName = prompt('Enter new name:');
    if (!updatedName || !updatedName.trim()) return;
    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, name: updatedName } : user))
    );
  };

  const deleteUser = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div className="crud-container">
      <h2>{activePage === 'view' ? 'All Records' : 'Manage Users'}</h2>


      {activePage === 'add' && (
        <div className="crud-add">
          <input
            type="text"
            value={newUserName}
            placeholder="New user name"
            onChange={e => setNewUserName(e.target.value)}
          />
          <button onClick={addUser}>Add User</button>
        </div>
      )}


      {loading && <p className="loading-text">Loading users...</p>}
      {error && <p className="error-text">Error: {error}</p>}


      <div className="crud-list">
        <ul>
          {users.length > 0 ? (
            users.map(user => (
              <li key={user.id}>
                <span><strong>[{user.id}]</strong> {user.name}</span>
                <div>
                  {activePage === 'edit' && (
                    <button className="edit-btn" onClick={() => updateUser(user.id)}>Edit</button>
                  )}
                  {activePage === 'delete' && (
                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
                  )}
                </div>
              </li>
            ))
          ) : (
            !loading && <p>No users found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ApiDemo;
