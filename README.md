# Patent Infringement Check App

This repository contains a full-stack application for checking patent infringement against a company's products. The app features a backend built with Node.js and a frontend built using React.js. The application uses a language model API to determine potential patent infringements.

## Table of Contents
1. [Installation](#installation)
2. [User Manual](#user-manual)
3. [System Architecture Diagram](#system-architecture-diagram)
4. [Core Functionality](#core-functionality)
5. [Project Development Plan](#project-development-plan)

## Installation

### Prerequisites
- Docker and Docker Compose installed.
- Node.js (if building locally without Docker).

### Steps to Install and Run
1. **Update the OpenAI API Key**:
   - Open the [backend/app/config.js](/backend/app/config.js) file.
   - Replace the value `your_openai_api_key_here` with your OpenAI API key.

2. **Build and Run the Application Using Docker Compose**:
   - Run the following command to build the backend and frontend services:
     ```sh
     docker-compose build
     ```
   - Start the application:
     ```sh
     docker-compose up
     ```

3. **Access the Application**:
   - **Frontend**: Visit `http://localhost:3000` to access the application.
   - **Backend**: API endpoints are available at `http://localhost:3001`.

### Optional: Running Locally without Docker
- Navigate to the `backend` and `frontend` directories and run `npm install` in both.
- Start the backend:
  ```sh
  cd backend
  npm start
  ```
- Start the frontend:
  ```sh
  cd frontend
  npm start
  ```

## User Manual

### Accessing the App
- **Homepage**: When you first visit the homepage, you will see a form to enter a **Patent ID** and a **Company Name**.

### Running an Infringement Check
1. **Enter Patent ID**: Type in the patent ID you want to check.
2. **Enter Company Name**: Type in the company name whose products you wish to analyze.
3. **Submit the Form**: Click on the "Check Infringement" button.
4. **View Results**: After submitting, the app will display the top two products that potentially infringe on the patent, including explanations, relevant claims, and infringement likelihood.

## System Architecture Diagram

The system architecture includes the following components:

```
+------------------+         +-------------------+
|                  |         |                   |
|  React Frontend  +--------->  Node.js Backend  |
|                  |         |                   |
+--------+---------+         +---------+---------+
         |                           |
         |                           v
         |                  +-------------------+
         |                  |  OpenAI API       |
         v                  +-------------------+
+------------------+
|                  |
|  User's Browser  |
|                  |
+------------------+
```

1. **React Frontend**: Provides a responsive user interface where users can input patent IDs and company names, and view results.
2. **Node.js Backend**: Manages incoming requests, interacts with the local dataset, and uses OpenAI API for analysis.
3. **OpenAI API**: Processes patent and product data to determine potential infringement and provides analysis.

## Core Functionality
1. **Input Patent ID and Company Name**: Users can input a patent ID and the name of a company whose products they want to check.
2. **Run Patent Infringement Analysis**: The backend uses the patent details and company products to generate an infringement analysis via the OpenAI API.
3. **Return Top Two Infringing Products**: The analysis identifies the top two products likely infringing on the patent and details which claims are at risk.
4. **Dockerized Deployment**: Both frontend and backend are containerized using Docker, simplifying installation and deployment.

Feel free to reach out for any questions!
 
## Project Development Plan

### Project Setup
- **Initialize Project Structure**:
  - Set up a repository and initialize Node.js (or Python) for the backend.
  - Set up the frontend framework and create necessary components.
- **Docker Configuration**:
  - Write a `Dockerfile` for both frontend and backend services.
  - Use `docker-compose` to orchestrate these services together.

### Backend Development
- **Set Up API Endpoints**:
  - Create an endpoint to receive user input (`/infringement-check`), which will accept patent ID and company name.
  - Create an endpoint for retrieving saved analysis reports (`/saved-reports`).
- **Data Handling**:
  - Load the `patents.json` and `company_products.json` files to extract the necessary data.
  - Develop logic to fuzzy match company names using a library like **fuzzywuzzy** (Python) or similar.
- **Infringement Analysis Logic**:
  - Integrate with the LLM (via API) to generate explanations and determine the infringement likelihood.
  - Implement a simple caching mechanism to reduce repetitive API calls for the same analysis.
- **Save Reports Functionality**:
  - Create a report-saving endpoint (`/save-report`) to persist infringement results. Store saved reports in a file or use a lightweight database like SQLite.

### Frontend Development
- **UI for Input**:
  - Develop a form where users can enter the patent ID and company name.
  - Add basic validation to ensure the user has entered all required fields.
- **Results Display**:
  - Design a UI component to display the infringement analysis, including product details and relevant claims.
  - Ensure that the results are easy to read and well formatted.
- **Saved Reports Page**:
  - Create a page to view previously saved reports. Display them in a user-friendly way.

### Integration and Testing
- **LLM API Integration**:
  - Integrate the backend with the LLM API for performing patent analysis.
  - Handle any API rate limits or errors gracefully to avoid breaking the user experience.
- **End-to-End Testing**:
  - Test the complete flow from frontend to backend, ensuring that inputs are correctly processed and results are displayed.
  - Write unit tests for core functionality, including API calls and data processing.

### Dockerization and Hosting (Bonus)
- **Dockerize the Application**:
  - Write separate `Dockerfile`s for both frontend and backend services.
  - Use `docker-compose` to create a unified environment.
- **Hosting (Bonus)**:
  - Deploy the app on a hosting platform like **AWS**, **DigitalOcean**, or use **Heroku** for simplicity.
  - Ensure that the web server has all necessary configurations to run the containerized app.

### README and Documentation
- **Write README.md**:
  - Include setup instructions, how to run the app using Docker, and any assumptions made.
  - Provide an overview of the core functionalities and how to use the app.

### Additional Features (Bonus)
- **User Input Parsing (Bonus)**:
  - Implement fuzzy matching of company names to handle slight differences or typos in user input.
- **Saving and Viewing Reports (Bonus)**:
  - Add an option for users to save analysis results and view them later.
  - Store saved reports in JSON or a simple database.

### Final Review and Polishing
- **Code Review**: Perform a final review of the code, refactoring where necessary.
- **UI/UX Improvements**: Improve the UI for better user experience, such as adding loading indicators during analysis.
- **Bug Fixes**: Address any discovered bugs, especially those that could break user input or analysis flows.

