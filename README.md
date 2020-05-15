# ps1-backend
API Rests repo of the project developed in the software design subject

### Routes
| Route        | Verb(s)   | Handler                  | Middleware      | Name            |
|--------------|-----------|--------------------------|-----------------|-----------------|
| /            | HEAD,GET  | Closure                  |                 | /               |
| /users       | POST      | UserController.store     |                 | /users          |
| /users/:id   | PUT       | UserController.update    |                 | /users/:id      |
| /users       | HEAD,GET  | UserController.index     | auth,is:(admin) | users.index     |
| /users/:id   | HEAD,GET  | UserController.show      | auth,is:(admin) | users.show      |
| /users/:id   | DELETE    | UserController.destroy   | auth,is:(admin) | users.destroy   |
| /schools     | HEAD,GET  | SchoolController.index   | auth,is:(admin) | schools.index   |
| /schools     | POST      | SchoolController.store   | auth,is:(admin) | schools.store   |
| /schools/:id | HEAD,GET  | SchoolController.show    | auth,is:(admin) | schools.show    |
| /schools/:id | PUT,PATCH | SchoolController.update  | auth,is:(admin) | schools.update  |
| /schools/:id | DELETE    | SchoolController.destroy | auth,is:(admin) | schools.destroy |
| /sessions    | POST      | SessionController.create |                 | /sessions       |

### TODO[DONE] List
- [x] Users CRUD
- [x] Users Authentication
- [x] Schools CRUD
- [x] Users-Schools relationship (n-n)
- [x] School-Address relationship (1-1)
- [ ] Classroom CRUD
- [ ] School-Classroom relationship (1-n)
- [ ] Ticket CRUD
- [ ] School-Tickets relationship (1-n)
- [ ] User-Tickets relationship (1-n)
- [ ] Historic CRUD (Associative class between entities School and Ticket)
- [ ] School-Address relationship (1-n)
- [x] Deploy

## Authors
- [@mtsdalmolin](https://github.com/mtsdalmolin)
- [@dsantos95](https://github.com/dsantos95)

# [Adonis Setup Configuration] Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
