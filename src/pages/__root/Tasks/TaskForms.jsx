import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  Input,
  Button,
  validation,
  Loading,
} from "../../../components";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addTask, editTask, viewTask } from "../../../redux/server/server";

const TaskForms = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    status: false,
    created_At: id ? "" : new Date(),
    updated_At: "",
  });

  const [formError, setFormError] = useState({
    title: "",
  });
  
  const onSubmit = async (e) => {
    e.preventDefault();

    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;

    if (isValid) {
      if (id) {
        const updatedFormData = { ...formData, updated_At: new Date() };
        await dispatch(editTask({ id, updates: updatedFormData }));
        toast.success("Task Updated Successfully");
      } else {
        await dispatch(addTask(formData));
        toast.success("Task Added Successfully");
      }
      navigate(-1);
    } else {
      setFormError(validError);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const res = await dispatch(viewTask(id));
        const data = res.payload;

        if (data) {
          setFormData((p) => ({ ...p, ...data }));
        }
      };
      fetchTask();
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-4 flex-col">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          error={formError.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e }))}
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target.value === "true",
            }))
          }
        >
          <option value="true">Completed</option>
          <option value="false">In complete</option>
        </Select>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default TaskForms;
