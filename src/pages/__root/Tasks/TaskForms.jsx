import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  Input,
  Button,
  validation,
  Loading,
  CancelButton,
} from "../../../components";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addTask, editTask, viewTask } from "../../../redux/server/server";
import { statusData } from "../../../data/data";

const TaskForms = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    status: "pending",
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

  const onSubmitAddMore = async (e) => {
    e.preventDefault();

    const validError = validation(formData);
    const isValid = Object.keys(validError).length === 0;

    if (isValid) {
      await dispatch(addTask(formData));
      toast.success("Task Added Successfully");

      setFormData((p) => ({
        ...p,
        id: "",
        title: "",
        status: "pending",
        created_At: "",
        updated_At: "",
      }));
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

  return (
    <div className="p-4">
      {isLoading && <Loading />}
      <form
        onSubmit={onSubmit}
        className="flex gap-4 flex-col border border-slate-200 p-4 bg-white rounded-md"
      >
        <h2 className="text-2xl font-bold">
          {id ? "Updated Task" : "Add Task"}
        </h2>

        <hr />

        <Input
          label="Title"
          name="title"
          value={formData.title}
          error={formError.title}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e }));
            setFormError((prev) => ({ ...prev, title: "" }));
          }}
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              status: e.target.value,
            }))
          }
        >
          {statusData.map((s, i) => (
            <option key={i} value={s.value}>
              {s.name}
            </option>
          ))}
        </Select>

        <div className="flex gap-2 items-stretch sm:items-center flex-col sm:flex-row">
          <Button type="submit" />
          {id ? (
            ""
          ) : (
            <Button
              onClick={onSubmitAddMore}
              type="button"
              text="Submit & add more"
            />
          )}
          <CancelButton
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForms;
