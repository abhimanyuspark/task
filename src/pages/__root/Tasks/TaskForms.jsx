import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Select, Input, Button, validation } from "../../../components";
import { useParams } from "react-router";
import { addTask, editTask } from "../../../redux/server/server";

const TaskForms = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    status: false,
    created_At: id ? new Date() : "",
    updated_At: new Date(),
  });
  const [formError, setFormError] = useState({
    title: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;

    if (isValid) {
      if (id) {
        dispatch(editTask({ id, formData }));
      } else {
        dispatch(addTask(formData));
      }
    }
    else{
      setFormError(validError)
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(viewTask(id)).then((data) => {
        setFormData({
          taskId: data.taskId,
          title: data.title,
          status: data.completed,
          created_At: data.created_At,
        });
      });
    }
  }, [dispatch, id]);

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-4 flex-col">
        <Input
          label={"Title"}
          name="title"
          value={formData.title}
          error={formError.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </Select>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TaskForms;
