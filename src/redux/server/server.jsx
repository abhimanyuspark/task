import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://6758099f60576a194d0e735c.mockapi.io/tasks";

// Existing thunks for CRUD operations
export const getTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get(url);
  return res.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const res = await axios.post(url, task);
  return res.data;
});

export const editTask = createAsyncThunk("tasks/editTask", async ({ id, updates }) => {
  const res = await axios.put(`${url}/${id}`, updates);
  return res.data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const res = await axios.delete(`${url}/${id}`);
  return res.data;
});

// New thunk to view a single task
export const viewTask = createAsyncThunk("tasks/viewTask", async (id) => {
  const res = await axios.get(`${url}/${id}`);
  return res.data;
});