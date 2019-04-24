# hacktivoverflow

## List of Basic routes:

| Route                                                    | HTTP   |                             | Request                                                      | On Success | On Error                              | Description                 |
| -------------------------------------------------------- | ------ | --------------------------- | ------------------------------------------------------------ | ---------- | ------------------------------------- | --------------------------- |
| <span style="color:#FF69B4">/users</span>                | GET    |                             |                                                              |            | "successfully get all users data."    | Get all the users info      |
| <span style="color:#FF69B4">/users/find</span>           | GET    | userId: String(required)    |                                                              |            | "successfully get user."              | Find a user with id         |
| <span style="color:#FF69B4">/users/login</span>          | POST   |                             | username:String(required)<br />passsword:String(required)    |            | "user logged in successfully"         | Log a user on app           |
| <span style="color:#FF69B4">/users/register</span>       | POST   |                             | username:String(required)<br />email:String(required)<br />passsword:String(required) |            | "user successfully registered"        | Register a user             |
| <span style="color:#FF69B4">/questions</span>            | POST   | userId: String(required)    | title:String(required)<br />content:String(required)<br />   |            | "question successfully added"         | post a question             |
| <span style="color:#FF69B4">/questions</span>            | GET    |                             |                                                              |            | "get all products successfully"       | Get all questions           |
| <span style="color:#FF69B4">/questions/find</span>       | GET    | id: String(required)        |                                                              |            | "successfully get question"           | Find question by id         |
| <span style="color:#FF69B4">/questions/edit</span>       | PUT    | id:String(required)         | title:String(required)<br />content:String(required)         |            | "successfully get all products data." | Edit a question             |
| <span style="color:#FF69B4">/questions</span>            | PUT    | userId:String(required)     | questionId:String(required)<br />vote:Boolean(required)      |            | "successfully voted question"         | Vote a question             |
| <span style="color:#FF69B4">/questions</span>            | DELETE | id:String(required)         |                                                              |            | "delete question success."            | Delete a question           |
| <span style="color:#FF69B4">/answers</span>              | POST   | questionId:String(required) | userId:String(required)<br />content:String(required)<br />  |            | "create answer success"               | Create an Answer            |
| <span style="color:#FF69B4">/answers</span>              | GET    |                             |                                                              |            | "all answers found"                   | Find All answers            |
| <span style="color:#FF69B4">/answers/find</span>         | GET    | id:String(required)         |                                                              |            | "answer found successfully"           | Find answer by id           |
| <span style="color:#FF69B4">/answers/questionFind</span> | GET    | id:String(required)         |                                                              |            | "answers found successfully"          | Find answers by question id |
| <span style="color:#FF69B4">/answers/edit</span>         | PUT    | id:String(required)         | content:String(required)                                     |            | "answer edited successfully"          | Edit answer find by id      |
| <span style="color:#FF69B4">/answers</span>              | PUT    | userId:String(required)     | answerId:String(required)<br />status:Boolean(required)      |            | "answer voted successfully"           | Vote an answer              |
| <span style="color:#FF69B4">/answers</span>              | DELETE | id:String(required)         |                                                              |            | "answer deleted successfully"         | Delete an answer            |
|                                                          |        |                             |                                                              |            |                                       |                             |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run this commands in both client and server folders:

```
$npm install
```

Run this command in server folder:

```
$nodemon app
```

Run this command in client folder: 

```
$npm run serve
```

 Access the Server side via http://localhost:3000/.

Access the Client side via http://localhost:8080/.



online:

Server side: <http://stackoverflow-server.michaeltim.com/>

Client side: <http://stackoverflow.michaeltim.com/>
