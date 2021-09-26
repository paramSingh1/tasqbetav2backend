import { check, validationResult } from 'express-validator';

function userRegisterValidationRules() {
    return [
        check("username", "UserName is Required").notEmpty(),
        check("email", "Valid Email Address is Required").isEmail(),
        check(
            "password",
            "Min 8 characters,Atleast 1 Uppercase, 1 Lowercase, 1 Number 1 Special Character "
        ).matches(/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/),
        check("password2").custom(
            (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password & Confirm Password do not match");
                } else {
                    return value;
                }
            }
        ),
        check("phone", "Phone Number is not valid").isMobilePhone(),
        check("role", "Invalid Role").equals("user")
    ]
}

function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ errors: errors.array() });
}


function userLoginValidationRules() {
    return [
        check("email", "Email Address is Required").isEmail(),
        check("password", "Password is required ").notEmpty(),
    ]
}

function todosValidationRules() {
    return [
        check("task", "Task is Required").notEmpty(),
        check("category", "Invalid Category").isIn(["personal", "work", "other"]),
        check("clientduedate").custom((clientduedate, { req }) => {
            //Server Side Current Date is taken by default in UTC offset 0
            let serverPresentDate = new Date();
            // console.log(serverPresentDate); Server Side Current Date in UTC

            if (!clientduedate) {
                throw new Error("Due Date is Required");
            }
            let serverduedate = new Date(clientduedate);
            // console.log(serverPresentDate);
            // console.log(serverduedate);
            if (serverduedate < serverPresentDate) {
                throw new Error("Due Date Cannot be Backdated");
            }
            let noOfDays = Math.round((Date.parse(serverduedate) - Date.parse(serverPresentDate)) / (1000 * 60 * 60 * 24));
            let noOfMins = Math.round((Date.parse(serverduedate) - Date.parse(serverPresentDate)) / (1000 * 60));
            // console.log(noOfDays); Extract the difference in Days
            // console.log(noOfMins); Extracts the difference in Minutes
            if (noOfDays > 30 || noOfMins < 1) { //Change back to 30 mins
                throw new Error("Due Date Must be >30 Mins and < 30 days");
            }
            req.body.serverduedate = serverduedate;
            return true;
        }),
        check("notificationType", "Invalid Notification Type").isIn(["email", "sms", "both"]),
        check("priority", "Invalid Priority").isIn(["urgent", "medium", "low"]),
        check("note", "Note is Required or Cant be more than 150 characters").isLength({ max: 150 }),
        check("clientreminders").custom((clientreminders, { req }) => {
            if (!clientreminders || clientreminders.length == 0) {
                throw new Error("Reminders are Required.Atleast one reminder");
            }
            let serverreminders = clientreminders.map((ele) => new Date(ele));
            //The above variable holds the reminder timestamps in UTC which are not validated yet
            let serverPresentDate = new Date();

            if (serverreminders.length == 1) {
                //Check if the only one reminder is 5 Mins < due date
                // console.log("The Present Date is : ", serverPresentDate);
                //Check the only one reminder is 5 mins > current time
                let noOfMinsLower = Math.round((Date.parse(serverreminders[0]) - Date.parse(serverPresentDate)) / (1000 * 60));
                // console.log("The LowerBound Check  in Mins (Difference): ", noOfMinsLower);

                let noOfMinsUpper = Math.round((Date.parse(req.body.serverduedate) - Date.parse(serverreminders[0])) / (1000 * 60));
                // console.log("The UpperBouncd Check in Mins (Difference) : ", noOfMinsUpper);
                if (noOfMinsLower < 1 || noOfMinsUpper < 1) { //change noOfMinsLower back to 5
                    throw new Error("The Reminder has to be atleast 5 Mins > current time and atleast 5 Mins < duedate");
                }
            } else {
                //Step1 : Sort all the timestamps in ascending order
                serverreminders = serverreminders.sort((a, b) => a - b);

                //Check Upperbound and lowerbound
                let noOfMinsLowerFirst = Math.round((Date.parse(serverreminders[0]) - Date.parse(serverPresentDate)) / (1000 * 60));
                let noOfMinsUpperFirst = Math.round((Date.parse(req.body.serverduedate) - Date.parse(serverreminders[0])) / (1000 * 60));
                if (noOfMinsLowerFirst < 1 || noOfMinsUpperFirst < 1) {
                    throw new Error("The Reminder has to be atleast 5 Mins > current time and atleast 5 Mins < duedate");
                }

                let noOfMinsLowerLast = Math.round((Date.parse(serverreminders[serverreminders.length - 1]) - Date.parse(serverPresentDate)) / (1000 * 60));
                let noOfMinsUpperLast = Math.round((Date.parse(req.body.serverduedate) - Date.parse(serverreminders[serverreminders.length - 1])) / (1000 * 60));
                if (noOfMinsLowerLast < 1 || noOfMinsUpperLast < 1) {
                    throw new Error("The Reminder has to be atleast 5 Mins > current time and atleast 5 Mins < duedate");
                }
                //If you want to check interval differemce, implement bubble sort aprroach, 
            }
            req.body.serverreminders = serverreminders;
            return true;
        }),
        check("timezone", "Timezone is Required").notEmpty()

    ]
}


export {
    userRegisterValidationRules,
    errorMiddleware,
    userLoginValidationRules,
    todosValidationRules
};