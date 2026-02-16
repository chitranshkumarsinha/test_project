import { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';

function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await taskAPI.getAll();
      setTasks(data.data);
    } catch (error) {
      setMessage('Failed to load tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (editingId) {
        await taskAPI.update(editingId, { content });
        setMessage('Task updated!');
        setEditingId(null);
      } else {
        await taskAPI.create({ content });
        setMessage('Task created!');
      }
      setContent('');
      fetchTasks();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setContent(task.content);
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await taskAPI.delete(id);
      setMessage('Task deleted!');
      fetchTasks();
    } catch (error) {
      setMessage('Failed to delete task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskAPI.update(task._id, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      setMessage('Failed to update task');
    }
  };

  return (
    <div className="container">
      <div className="dashboard">
        <div className="header">
          <h2>My Tasks</h2>
          <button onClick={onLogout}>Logout</button>
        </div>

        {message && (
          <div className={message.includes('!') ? 'success' : 'error'}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter task content..."
            required
            rows="3"
          />
          <div className="form-actions">
            {editingId && (
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setContent(''); }}
              >
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update' : 'Add Task'}
            </button>
          </div>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Create one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                />
                <span className={task.completed ? 'completed' : ''}>
                  {task.content}
                </span>
                <div className="task-actions">
                  {!task.completed && (
                    <button onClick={() => handleEdit(task)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;