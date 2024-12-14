# API Endpoints
The backend provides the following RESTful API endpoints:

#### **Authentication APIs**
- **Register** (POST): `{{BASE_URL}}/auth/register`
  - Request Body:
    ```json
    {
      "username": "admin",
      "password": "admin123"
    }
    ```

- **Login** (POST): `{{BASE_URL}}/auth/login`
  - Request Body:
    ```json
    {
      "username": "advitya",
      "password": "advitya"
    }
    ```

- **Logout** (POST): `{{BASE_URL}}/auth/logout`

#### **Course Management APIs**
- **Get All Courses** (GET): `{{BASE_URL}}/courses`

- **Create Course** (POST): `{{BASE_URL}}/admin/courses`
  - Request Body:
    ```json
    {
      "title": "UI/UX Design Principles",
      "description": "Understand the principles of user interface and user experience design.",
      "duration": "10 hours",
      "instructor": "Sarah Brown"
    }
    ```

- **Update Course** (PUT): `{{BASE_URL}}/admin/courses/:id`
  - Request Body:
    ```json
    {
      "title": "Learn Rust",
      "description": "Learn Rust ASAP",
      "duration": "20hrs",
      "instructor": "Rahul"
    }
    ```

- **Delete Course** (DELETE): `{{BASE_URL}}/admin/courses/:id`

- **Enroll in Course** (POST): `{{BASE_URL}}/users/enroll/:courseId`
  - Requires Bearer Token Authentication.

- **Get Course Details** (GET): `{{BASE_URL}}/courses/:id`


## Postman Collection

For testing the APIs, you can use the provided Postman collection file located in the root directory: `Academically-assignment.postman_collection.json`. Import this file into Postman to get access to all predefined API endpoints.

---

## Additional Notes

- Ensure MongoDB is running before starting the backend server.
- Use appropriate Bearer tokens for APIs requiring authentication.
- The backend uses role-based access to distinguish between Admin and User actions.
