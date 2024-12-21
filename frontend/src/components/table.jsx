import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", email: "" });
  const [editingUserId, setEditingUserId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/prox/api/v1/user/getAll");
      setUsers(response.data.user);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Update user
        await axios.put(`/prox/api/v1/user/update/${editingUserId}`, formData);
      } else {
        // Create user
        await axios.post("/prox/api/v1/user/create", formData);
      }
      setFormData({ name: "", age: "", email: "" });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setEditingUserId(user._id); // Set the ID of the user being edited
    setFormData({
      name: user.name,
      age: user.age,
      email: user.email,
    }); // Populate the form with the selected row's data
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/prox/api/v1/user/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={formData.name} // Prefilled value
            onChange={handleInputChange}
            placeholder="Name"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            value={formData.age} // Prefilled value
            onChange={handleInputChange}
            placeholder="Age"
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email} // Prefilled value
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingUserId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.age}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(user)} // Pass the user object
                  className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
