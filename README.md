# A government petitions website for the (made-up) citizens of Shangri-La.
React.ts + Spring Boot + MySQL

## Prerequisites
Before running the application, please install the following:
- JDK 11 (or higher)
- Maven
- Node.js v20 (or higher)
- npm (Node Package Manager)
- MySQL local server installed and running

**Before running, please alter the `application.properties` file inside /cw2_server to use your local MySQL database settings.**

## Running the server
1. Open a terminal/command prompt.
2. Navigate to the server folder (cw2_server).
3. Run the following command:
   ```bash
   ./mvnw spring-boot:run
   ```
## Running the client
1. Open another terminal/command prompt window.
2. Navigate to the client folder (cw2_client).
3. Install the node.js dependencies by running:
   ```bash
   npm install
   ```
4. Run the client with the command:
   ```bash
   npm start
   ```

### The following login can be used for an admin account:
Email: admin@petition.parliament.sr\
Password: 2025%shangrila
