# Patent Infringement Check App

## Setup
- To be provided

## Usage
- To be provided

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

