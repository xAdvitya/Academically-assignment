# Academically-assignment

This is the submission for the MERN Stack Intern assignment. The project is a basic Learning Management System (LMS) with separate Admin and User views, implemented with the following technologies:  

- **Frontend**: Next.js, TypeScript, Tailwind CSS  
- **Backend**: Node.js, Express.js, Prisma 
- **Database**: MongoDB  

---

## Project Structure  

- **Frontend Folder**: [Link to Frontend](./frontend)  
- **Backend Folder**: [Link to Backend](./backend)  

---

## Features  

### Admin View:  
1. Add, update, and delete courses.  
2. View all available courses.  

### User View:  
1. Browse available courses.  
2. View course details.  
3. Enroll in courses.  

### Authentication & Role Management:  
- Role-based access control for Admin and User.  
- Admin: Full access to manage courses.  
- User: Can only browse and enroll in courses.  

---

## Getting Started  

### Prerequisites:  
1. Node.js  
2. MongoDB  

### Installation:  

1. Clone the repository:  
   ```bash  
   git clone [repository-link]  
   ```  

2. Install dependencies for both backend and frontend:  
   ```bash  
   cd backend  
   npm install  
   
   cd ../frontend  
   npm install  
   ```  

3. Configure environment variables for backend (`.env` file):  
   ```plaintext  
   MONGO_URI=your_mongo_db_connection_string  
   JWT_SECRET=your_secret_key
   PORT=local_port
   ```

4. Pushing schema to mongodb
   ```bash
   npx prisma db push
   ```

5. Run the backend server:  
   ```bash  
   cd backend  
   node index.js 
   ```  

6. Run the frontend server:  
   ```bash  
   cd frontend  
   npm run dev
   ```  

---


If you have any questions or feedback, feel free to reach out!
