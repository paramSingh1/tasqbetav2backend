import React, { useState, useEffect, useContext } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import todoContext from "../../Context/Todo/todoContext";
import alertContext from "../../Context/Alert/alertContext";
import authContext from "../../Context/Auth/authContext";
import Spinner from "../Spinner";

const EditTodo = ({ closeEditTodo, todoId }) => {
  ReactModal.setAppElement("#root");
  const { updateTodo, deleteTodo } = useContext(todoContext);
  const { loading } = useContext(authContext);
  const dateToDateTimeLocale = (dt) => {
    let date = new Date(dt);
    return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? "" : "0"}${
      date.getMonth() + 1
    }-${date.getDate() > 9 ? "" : "0"}${date.getDate()}T${
      date.getHours() > 9 ? "" : "0"
    }${date.getHours()}:${
      date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
    }`;
  };
  useEffect(() => {
    (async () => {
      try {
        let {
          data: { todo },
        } = await axios.get(`/api/user/todos/${todoId}`);
        setFormData({
          task: todo.task,
          category: todo.category,
          clientduedate: dateToDateTimeLocale(todo.clientduedate),
          note: todo.note,
          priority: todo.priority,
          notificationType: todo.notificationType,
          clientreminder1: dateToDateTimeLocale(todo.clientreminders[0]),
          clientreminder2: dateToDateTimeLocale(todo.clientreminders[1]),
          timezone: todo.timezone,
        });
      } catch (error) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { alert } = useContext(alertContext);
  const [formData, setFormData] = useState({
    task: "Product Launch",
    category: "work",
    clientduedate: "",
    note: "",
    priority: "low",
    notificationType: "both",
    clientreminder1: "",
    clientreminder2: "",
    timezone: "+5:30",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      task: formData.task,
      category: formData.category,
      clientduedate: new Date(formData.clientduedate).toString(),
      note: formData.note,
      priority: formData.priority,
      notificationType: formData.notificationType,
      clientreminders: [
        new Date(formData.clientreminder1).toString(),
        new Date(formData.clientreminder2).toString(),
      ],
      timezone: formData.timezone,
      _id: todoId,
    };
    console.log(payload);
    updateTodo(payload);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = () => {
    deleteTodo(todoId);
    closeEditTodo();
  };
  return (
    <ReactModal
      isOpen={true}
      style={{
        content: {
          border: "none",
          height: "100vh",
          width: "100vw",
          background: "none",
        },
        overlay: {},
      }}
    >
      <div id="contact-modal" className="modal">
        <div id="modal-content">
          <div id="modal-header">
            <span onClick={closeEditTodo} className="close-modal">
              &times;
            </span>
            <div>
              <label className="todo-check-container">
                {/* <input className="todo-checkbox" type="checkbox" /> */}
                <span style={{ "margin-left": "20px", "margin-right": "20px" }}>
                  Edit a tasq
                </span>
              </label>
              {/* <button className="edit-btn" type="submit"> */}
              {/* <span><i className="far fa-edit"></i></span> */}
              {/* </button> */}
            </div>
          </div>
          <div id="modal-body">
            {alert && (
              <>
                {" "}
                <div className={`alert alert-${alert.type} `}>
                  {alert.message}
                </div>
              </>
            )}
            <form onSubmit={handleSubmit}>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="category">
                  Task :{" "}
                </label>
                <input
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={handleChange}
                />
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="category">
                  Category :{" "}
                </label>
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={formData.category}
                >
                  <option value="work">Work</option>
                  <option value="school">School</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="priority">
                  Priority :{" "}
                </label>
                <select
                  name="priority"
                  id="name"
                  onChange={handleChange}
                  value={formData.priority}
                >
                  <option value="urgent">Urgent</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="due-date">
                  Due Date :{" "}
                </label>
                <input
                  type="datetime-local"
                  id="due-date"
                  name="clientduedate"
                  onChange={handleChange}
                  value={formData.clientduedate}
                />
                {/* <input type="time" id="due-time" name="due-time" /> */}
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="timezone">
                  Time Zone:
                </label>
                <select
                  name="timezone"
                  id="timezone-offset"
                  className="span5"
                  onChange={handleChange}
                  value={formData.timezone}
                >
                  <option value="-12:00">
                    (GMT -12:00) Eniwetok, Kwajalein
                  </option>
                  <option value="-11:00">
                    (GMT -11:00) Midway Island, Samoa
                  </option>
                  <option value="-10:00">(GMT -10:00) Hawaii</option>
                  <option value="-09:30">(GMT -9:30) Taiohae</option>
                  <option value="-09:00">(GMT -9:00) Alaska</option>
                  <option value="-08:00">
                    (GMT -8:00) Pacific Time (US &amp; Canada)
                  </option>
                  <option value="-07:00">
                    (GMT -7:00) Mountain Time (US &amp; Canada)
                  </option>
                  <option value="-06:00">
                    (GMT -6:00) Central Time (US &amp; Canada), Mexico City
                  </option>
                  <option value="-05:00">
                    (GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima
                  </option>
                  <option value="-04:30">(GMT -4:30) Caracas</option>
                  <option value="-04:00">
                    (GMT -4:00) Atlantic Time (Canada), Caracas, La Paz
                  </option>
                  <option value="-03:30">(GMT -3:30) Newfoundland</option>
                  <option value="-03:00">
                    (GMT -3:00) Brazil, Buenos Aires, Georgetown
                  </option>
                  <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
                  <option value="-01:00">
                    (GMT -1:00) Azores, Cape Verde Islands
                  </option>
                  <option value="+00:00">
                    (GMT) Western Europe Time, London, Lisbon, Casablanca
                  </option>
                  <option value="+01:00">
                    (GMT +1:00) Brussels, Copenhagen, Madrid, Paris
                  </option>
                  <option value="+02:00">
                    (GMT +2:00) Kaliningrad, South Africa
                  </option>
                  <option value="+03:00">
                    (GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg
                  </option>
                  <option value="+03:30">(GMT +3:30) Tehran</option>
                  <option value="+04:00">
                    (GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi
                  </option>
                  <option value="+04:30">(GMT +4:30) Kabul</option>
                  <option value="+05:00">
                    (GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent
                  </option>
                  <option value="+05:30">
                    (GMT +5:30) Bombay, Calcutta, Madras, New Delhi
                  </option>
                  <option value="+05:45">(GMT +5:45) Kathmandu, Pokhara</option>
                  <option value="+06:00">
                    (GMT +6:00) Almaty, Dhaka, Colombo
                  </option>
                  <option value="+06:30">(GMT +6:30) Yangon, Mandalay</option>
                  <option value="+07:00">
                    (GMT +7:00) Bangkok, Hanoi, Jakarta
                  </option>
                  <option value="+08:00">
                    (GMT +8:00) Beijing, Perth, Singapore, Hong Kong
                  </option>
                  <option value="+08:45">(GMT +8:45) Eucla</option>
                  <option value="+09:00">
                    (GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk
                  </option>
                  <option value="+09:30">(GMT +9:30) Adelaide, Darwin</option>
                  <option value="+10:00">
                    (GMT +10:00) Eastern Australia, Guam, Vladivostok
                  </option>
                  <option value="+10:30">(GMT +10:30) Lord Howe Island</option>
                  <option value="+11:00">
                    (GMT +11:00) Magadan, Solomon Islands, New Caledonia
                  </option>
                  <option value="+11:30">(GMT +11:30) Norfolk Island</option>
                  <option value="+12:00">
                    (GMT +12:00) Auckland, Wellington, Fiji, Kamchatka
                  </option>
                  <option value="+12:45">(GMT +12:45) Chatham Islands</option>
                  <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
                  <option value="+14:00">
                    (GMT +14:00) Line Islands, Tokelau
                  </option>
                </select>
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="reminder1">
                  First Reminder :
                </label>
                <input
                  type="datetime-local"
                  className="reminder1"
                  name="clientreminder1"
                  onChange={handleChange}
                  value={formData.clientreminder1}
                />
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="reminder2">
                  Second Reminder :
                </label>
                <input
                  type="datetime-local"
                  className="reminder2"
                  name="clientreminder2"
                  onChange={handleChange}
                  value={formData.clientreminder2}
                />
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="notifications">
                  Notifications :
                </label>
                <select
                  id="notifications"
                  name="notificationType"
                  onChange={handleChange}
                  value={formData.notificationType}
                >
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="todo-form-group">
                <label className="todo-label-title" htmlFor="message">
                  Write a Note :{" "}
                </label>
                <textarea
                  id="message"
                  placeholder="Enter note here ..."
                  onChange={handleChange}
                  name="note"
                  value={formData.note}
                ></textarea>
              </div>
              <div id="modal-footer">
                <div className="todo-footer-btns">
                  <div className="todo-save-btn">
                    <button type="submit">
                      <i className="fas fa-check-circle"></i>Save Changes
                    </button>
                  </div>
                  <div className="todo-delete-btn">
                    <button onClick={handleDelete}>
                      <i className="fas fa-trash-alt"></i>Delete tasq
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditTodo;
