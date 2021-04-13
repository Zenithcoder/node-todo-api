
## HTTP Verbs

Here's an example of how HTTP verbs map to create, read, update, delete operations in a particular context:

| HTTP METHOD     | POST            | GET                      | PATCH       | DELETE      |
| --------------- | --------------- | ------------------------ | ----------- | ----------- |
| /todos          | Create new todo | List all todos from user | -           | -           |
| /todos/:id      | -               | List specific todo       | Update todo | Delete todo |
 
## Error handling

Error handling acording with REST API [standards](http://www.restapitutorial.com/httpstatuscodes.html)

| Code  | Description                                                                                         |
| :---- | :-------------------------------------------------------------------------------------------------- |
| `200` | The request has succeeded                                                                           |
| `400` | The request could not be understood by the server due to malformed syntax                           |
| `404` | The server has not found anything matching the Request-URI                                          |

 

* [POST /todos](#post-todos)
* [GET /todos/:id](#get-todosid)

### POST /todos

Request body:

```json
{
  "text": "Sample todo"
}
```

### GET /todos/:id

Response body:

```json
{
  "todo": {
    "_id": "5aa587d1cfce06ecbef0a7ae",
    "text": "Sample Todo2",
    "__v": 0,
    "completedAt": null,
    "completed": false
  }
}
```
