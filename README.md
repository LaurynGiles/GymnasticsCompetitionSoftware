# Gymnastics Competition Software

## Overview
This project is a comprehensive software solution designed to streamline the management and scoring of gymnastics competitions. It consists of two main applications for **judges** and **admins**, along with a backend server that handles real-time data processing and storage. The software provides a user-friendly platform to manage competition scores, track gymnasts' performances, and organise event logistics efficiently.

## Applications

### 1. Judging Application
The **Judging Application** is an interface tailored for judges. This app allows judges to:
- Join or manage judging groups and tables.
- Assign and update scores for gymnasts in real-time.
- View current sessions, levels, and gymnasts competing.
- Communicate effectively with other judges and receive updates on judging-related events.

**Link to Judging Application:** [https://gymnasticscompetitionsoftwarejudge.onrender.com](https://gymnasticscompetitionsoftwarejudge.onrender.com)

### 2. Admin Application
The **Admin Application** is intended for administrators and event organisers. This app provides functionality for:
- Managing competition logistics, including creating sessions, assigning judges, and setting up events.
- Monitoring scores and overseeing competition progress.
- Handling judge assignments and reviewing event results for accuracy.

**Link to Admin Application:** [https://gymnasticscompetitionsoftware-li1a.onrender.com](https://gymnasticscompetitionsoftware-li1a.onrender.com)

### Backend Server
The backend server is responsible for managing real-time data communication between the judging and admin applications. It handles user authentication, score submission, event management, and data storage, supporting a seamless experience across both applications.

**Link to Backend:** [https://gymnasticscompetitionsoftware.onrender.com](https://gymnasticscompetitionsoftware.onrender.com)

## Running the Application Locally with Docker

You can use Docker containers to run the applications locally for testing and development. Note that the container setup may not currently be configured to point to the hosted links, so some functionality may require adjustments to local configurations for proper cross-app communication.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LaurynGiles/GymnasticsCompetitionSoftware.git
   cd GymnasticsCompetitionSoftware
   ```

2. **Build and run admin application**
   ```bash
   cd admin-frontend
   docker build -t admin-frontend .
   docker run -p 3001:3001 admin-frontend
   ```
   
3. **Build and run judging application**
   ```bash
   cd judge-frontend
   docker build -t judge-frontend .
   docker run -p 3002:3002 judge-frontend
   ```
   
4. **Build and run backend**
   ```bash
   cd backend
   docker build -t backend .
   docker run -p 5000:5000 backend
   ```
   
5. **Access the applications in your browser:**

    Admin Application: http://localhost:3001
    Judging Application: http://localhost:3002
    Backend API: http://localhost:5000
