# programer
A web application built for the purpose of creating new workout programs. 

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/jncoppeta/programer.git
```
2. Open the ```programer/backend/server.js``` file
3. Modify the following to match your database
```javascript
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "programer"
})
```

## Running the App
2. cd into the backend
```bash
cd programer/backend
```
4. Install dependencies
```bash
npm install
```
4. Start the backend server
```bash
npm start
```
5. cd into the frontend
```bash
cd ../frontend
```
6. install dependenices
```bash
npm install
```
7. Start the frontend client
```bash
npm start
```

## Web Stack

- **Frontend:** React
- **Backend:** Node.js, ExpressJS
- **Database:** MySQL
- **Other:** TailwindCSS, Bootstrap, FontAwesome



