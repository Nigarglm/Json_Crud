import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {

  const [posts, setPosts] = useState([]);
  const [userIdInput, setUserIdInput] = useState('');
  const [postIdInput, setPostIdInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleReload = () => {
    fetchData();
  };

  const handleClean = () => {
    setPosts([]);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleGetSpecificData = () => {
    let filteredPosts = posts;

    if (userIdInput.trim() !== '') {
      filteredPosts = filteredPosts.filter(post => post.userId === parseInt(userIdInput));
    }

    if (postIdInput.trim() !== '') {
      filteredPosts = filteredPosts.filter(post => post.id === parseInt(postIdInput));
    }

    setPosts(filteredPosts);
  };

  return (
    <div className="App">
      <div className="get">
        <div>
        <label>User ID:</label>
        <input type="text" value={userIdInput} onChange={(e) => setUserIdInput(e.target.value)} />
        </div>
        <div>
          <label>Post ID:</label>
        <input type="text" value={postIdInput} onChange={(e) => setPostIdInput(e.target.value)} />
        </div>
        <button onClick={handleGetSpecificData}>Get</button>
      </div>
      <div className="">
        <button onClick={handleReload}>Reload</button>
        <button onClick={handleClean}>Clean</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td><button onClick={() => handleDelete(post.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

