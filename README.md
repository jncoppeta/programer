# programer
A web application built for the purpose of creating new workout programs. 

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/jncoppeta/programer.git
```
That's it! You're ready to go now.

## Running the App
1. cd into init
```bash
cd programer/init
```
2. Run the compose file with the build option
```
docker-compose up --build
```
(note: wait until the frontend starts. This is evident by messages such as `frontend  | 2024/08/07 01:53:45 [notice] 1#1: start worker process 53`

3. Visit the site [here](http://localhost:80)!

4. In order to create a program, click the sandbox tab in the top header. Then click Create New Program. You now have the ability to fully customize your project. When you are ready to publish it, select the `Publish Program` option from the dropdown and enter the project's respective ID. Now if you click the `projects` tab on the top header, you will see your new project. Click on that project to see the program in its entirety. If you made a mistake and want to change something, simply go the sandbox, select the `Backlog Project` option, enter its ID, and you can now edit the program again.
## Web Stack

- **Frontend:** React
- **Backend:** Node.js, ExpressJS
- **Database:** MySQL
- **Other:** TailwindCSS, Bootstrap, FontAwesome



