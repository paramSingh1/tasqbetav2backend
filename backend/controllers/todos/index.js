import express from "express";
import { scheduledJobs } from "node-schedule";
import axios from 'axios'
//Import Auth middleware
import auth from '../../middlewares/auth/index.js';
import {
    todosValidationRules,
    errorMiddleware
} from "../../middlewares/validations/index.js";

//Import DB Models 
import UserTodo from "../../models/UserTodos.js";
//Import Service Workers functions from helpers
import duedateScheduler from "../../helpers/duedateScheduler.js";
import remindersScheduler from "../../helpers/remindersScheduler.js";

import duedateRescheduler from "../../helpers/duedateRescheduler.js";
import reminderRescheduler from "../../helpers/reminderRescheduler.js";
import cancelServiceWorker from "../../helpers/cancelServiceWorker.js";
const router = express.Router();

//Enforce Auth Middleware on all routes
router.use(auth);

/*
    API EndPoint : /api/user/todos/add
    Method : POST
    Payload : {
        "task" : "Plan a Birthday Party",
        "category" : "work",
        "clientduedate" : "Wed Sep 22 2021 14:58:31 GMT+0530",
        "note" : "A Surprise feast blah blah blah",
        "priority": "urgent",
        "notificationType" : "both",
        "clientreminders" : ["Wed Sep 22 2021 13:30:31 GMT+0530",
    "Wed Sep 22 2021 13:50:31 GMT+0530"],
    "timezone" : "Bombay/India"
    }
    Access Type : Private
    Description : Insert a New Todo
*/
router.post('/add',
    todosValidationRules(),
    errorMiddleware,
    async (req, res) => {
        try {
            const userData = await UserTodo.findOne({ user: req.user.userid });
            // console.log(userData);
            if (!userData) {
                return res.status(400).json({ errors: [{ msg: "User Not Found" }] });
            }
            userData.todos.push(req.body);
            await userData.save();
            //Extract the last one
            let recentTodoObj = userData.todos[userData.todos.length - 1];
            let userid = req.user.userid;
            // console.log(recentTodoObj);
            // console.log(userid);
            //Instantiate the Service Worker - Schedule a job
            // console.log(scheduledJobs);
            let microservicePayload = {
                recentTodo: recentTodoObj,
                userid: userid
            }
            await axios.post("http://localhost:8080/api/duedate/scheduleduedate", microservicePayload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // duedateScheduler(recentTodoObj, userid);
            // //Instantiate the Service Worker - Schedule a job for reminders
            // remindersScheduler(recentTodoObj, userid);
            res.status(200).json({ Success: "Todo is Added" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ err });
        }
    });

/*
    API EndPoint : /api/user/todos
    Method : GET
    Access Type : Private
    Description : Get all the Todos of a User
*/
router.get('/', async (req, res) => {
    try {
        const userData = await UserTodo.findOne({ user: req.user.userid });
        if (!userData) {
            return res.status(400).json({ errors: [{ msg: "User Not Found" }] });
        }
        const { todos } = userData;
        res.status(200).json({ todos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

/*
    API EndPoint : /api/user/todos
    Method : PUT
    Access Type : Private
    Description : Edit a Particular of a User
*/
router.put('/edit/:todoid',
    todosValidationRules(),
    errorMiddleware,
    async (req, res) => {
        try {
            const userData = await UserTodo.findOne({ user: req.user.userid });
            if (!userData) {
                return res.status(400).json({ errors: [{ msg: "User Not Found" }] });
            }
            const { todos } = userData;
            //get the index of the todo item, if found
            const indexFound = todos.findIndex((ele) => ele._id == req.params.todoid);
            //check if todoid is present
            if (indexFound == -1) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "Invalid Todo ID" }] });
            }
            //the id of the todoid must stay the same
            todos[indexFound] = req.body;
            todos[indexFound]._id = req.params.todoid;
            //save to mongodb
            await userData.save();
            console.log(scheduledJobs);

            //Instantiate the service worker - Reschedule the job (Delete the old job & schedule)
            let microservicePayload = {
                todo: todos[indexFound],
                userid: req.user.userid
            }
            await axios.put("http://localhost:8080/api/duedate/rescheduleduedate", microservicePayload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            // duedateRescheduler(todos[indexFound], req.user.userid);
            // reminderRescheduler(todos[indexFound], req.user.userid);

            res.status(200).json({ Success: "Todo is Edited" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    });

/*
    API EndPoint : /api/user/todos/:todoid
    Method : GET
    Access Type : Private
    Description : Get a Particular Todo of a User
*/
router.get('/:todoid', async (req, res) => {
    try {
        const userData = await UserTodo.findOne({ user: req.user.userid });
        //check if userid is correct
        if (!userData) {
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }

        const { todos } = userData;
        const todo = todos.find((ele) => ele._id == req.params.todoid);
        if (!todo) {
            return res.status(400).json({ errors: [{ msg: "Invalid TodoID" }] });
        }
        res.status(200).json({ todo });
    } catch (error) {
        res.status(500).json({ error });
    }
});

/*
    API EndPoint : /api/user/todos/delete/:todoid
    Method : DELETE
    Access Type : Private
    Description : DELETE a Particular Todo of a User
*/
router.delete('/delete/:todoid', async (req, res) => {
    try {
        const userData = await UserTodo.findOne({ user: req.user.userid });
        if (!userData) {
            return res.status(500).json({ errors: [{ msg: "Server Error" }] });
        }
        let { todos } = userData;
        //using filter we can ignore the id which matches the todoid
        todos = todos.filter((ele) => ele._id != req.params.todoid);
        userData.todos = todos;
        //save to db
        await userData.save();

        //Delete the Service worker job
        // console.log(scheduledJobs);
        // cancelServiceWorker(req.params.todoid);

        await axios.delete(`http://localhost:8080/api/duedate/cancelduedate/${req.params.todoid}`);
        // console.log(scheduledJobs);
        res.status(200).json({ Success: "Todo is Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
export default router;