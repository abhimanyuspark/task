import { createSlice } from "@reduxjs/toolkit";
import {
  getTasks,
  addTask,
  editTask,
  viewTask,
  deleteTask,
} from "../server/server";

const initialState = {
  tasks: [],
  isLoading: false,
  viewedTask: {},
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(getTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch particullar task
      .addCase(viewTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(viewTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.viewedTask = action.payload;
      })
      .addCase(viewTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add task
      .addCase(addTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Edit task
      .addCase(editTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.viewedTask = action.payload;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete task
      .addCase(deleteTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((d) => d.id !== action.payload.id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
