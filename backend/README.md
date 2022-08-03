# Login System

this is a backend of a Login System

Other frontend clients may consume the resources provided by this server.

## Video Recording content

1. Setup my environment - Provision a Database
    a. Establish connection to database using NodeJS
    b. Setup Express Server
    c. Connect Express Server with Database Connection
    d. Clean up (Refactoring)
    - magic values
    - git tracking - ignore node_modules
    - extracted logic from app.js
    e. Test (Jest)
    - installed jest & supertest (simulate http request)
    - created a test
    - afterAll --> Close database connection to end the proccess
    - sete the connection pool size when testing to 1

2. Login logic
    a. Register
        - created `user_tab`
        - basic flow of accepting username and password from request
        - send it to database
        - salt and has the password before storing to database
    b. Login
        - jwt


## Features
1. Register User
2. Login with Username + Password
