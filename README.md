# A group project demonstration

> A demo project to understand the workflow with team members to obey with as a whole.

## Features

- For Sign up
  - POST - `http://localhost:5000/signup/`

```bash
{
  "firstName": "Hasibul",
  "lastName": "Islam",
  "email": "hasib143sl@gmail.com",
  "password": "Ab3@",
  "confirmPassword": "Ab3@",
  "contactNumber": "01906315901"
}
```

- For Sign in
  - POST - `http://localhost:5000/signin`

```bash
{
  "email": "hasib143sl@gmail.com",
  "password": "Ab3@"
}
```

- To display all user

  - GET - `http://localhost:5000/all`

- To Reset password
  - PATCH - `http://localhost:5000/reset?email=USER_EMAIL_ADDRESS`

```bash
{
  "password": "Kc3@"
}
```

- For uploading avatar
  - POST - `http://localhost:5000/avatar`
