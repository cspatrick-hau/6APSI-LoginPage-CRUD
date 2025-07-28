import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');

  const [event, setEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [dateError, setDateError] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleBackToHome = () => {
    setActivePage('home');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));

    if (name === 'date') {
      validateDate(value);
    }
  };

  const validateDate = (dateValue) => {
    if (!dateValue) {
      setDateError('');
      return;
    }

    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedYear = selectedDate.getFullYear();

    if (selectedYear !== 2025) {
      setDateError('Event date must be within the year 2025.');
    } else if (selectedDate < today) {
      setDateError('Event date cannot be earlier than today.');
    } else {
      setDateError('');
    }
  };

  const handleSave = () => {
    if (!event.title || !event.date || !event.location || !event.description) {
      alert('Please fill in all fields.');
      return;
    }

    if (dateError) {
      alert(dateError);
      return;
    }

    setEditMode(false);
    alert('Event saved successfully!');
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    setEvent({ title: '', date: '', location: '', description: '' });
    setDateError('');
    alert('Event deleted!');
  };

  return (
    <div className="landing-container">
      
      <div className="sidebar">
        <div>
          <h2>Dashboard</h2>
          <ul className="menu-list">
            <li className="menu-item">
              <button className="menu-button" onClick={() => setActivePage('add')}>
                <img src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="Add" />
                Add Record
              </button>
            </li>
            <li className="menu-item">
              <button className="menu-button" onClick={() => setActivePage('edit')}>
                <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" />
                Edit Record
              </button>
            </li>
            <li className="menu-item">
              <button className="menu-button" onClick={() => setActivePage('delete')}>
                <img src="https://cdn-icons-png.flaticon.com/512/3096/3096673.png" alt="Delete" />
                Delete Record
              </button>
            </li>
            <li className="menu-item">
              <button className="menu-button" onClick={() => setActivePage('view')}>
                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" alt="View" />
                View Reports
              </button>
            </li>
          </ul>
        </div>

        
        <div>
          <button onClick={handleBackToHome} className="menu-button back-button">
            ⬅ Back to Landing Page
          </button>
          <button onClick={handleLogout} className="menu-button logout-button">
            Logout
          </button>
        </div>
      </div>

      
      <div className="main-content">
        {activePage === 'home' && (
          <>
            <h1>Welcome to the Landing Page!</h1>
            <p>
              This web system is designed to efficiently manage participants for events, seminars, or competitions.
              It provides essential functionalities such as adding, editing, and removing participant records,
              as well as generating reports for all registered attendees. With a simple and user-friendly interface,
              the system streamlines participant management and enhances overall event organization.
            </p>

            
            <div className="event-section">
              
              <div className="event-form">
                <h2>{editMode ? 'Edit Event' : 'Create Event'}</h2>
                <input
                  type="text"
                  name="title"
                  value={event.title}
                  placeholder="Event Title"
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="date"
                  value={event.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                />
                {dateError && <p className="event-error">{dateError}</p>}
                <input
                  type="text"
                  name="location"
                  value={event.location}
                  placeholder="Location"
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  value={event.description}
                  placeholder="Event Description"
                  onChange={handleChange}
                ></textarea>
                <div>
                  <button className="action-button" onClick={handleSave}>Save</button>
                  <button className="action-button edit" onClick={handleEdit}>Edit</button>
                  <button className="action-button delete" onClick={handleDelete}>Delete</button>
                </div>
              </div>

              
              <div className="event-display">
                <h2>Event Details</h2>
                {event.title ? (
                  <div>
                    <p><strong>Title:</strong> {event.title}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                  </div>
                ) : (
                  <p>No event created yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
