<h2>General Architecture</h2>
<br>

1. SuperAdmin -> Teacher -> Instructor & Students
2. Hence a SuperAdmin can create Teachers and teachers can register Instructors and Students into Classes
3. SuperAdminPassword needs to passed into the body while creating a teacher
4. then teachers can create students and instructors using their JWT tokens
5. Teachers can add students into a lecture by updating students array inside of class object

<h3>Covering :</h3>

1. Docs -> /docs
2. RBAC ( Role Based Access Control)
3. Authentication using JWT
4. Overall workflow
