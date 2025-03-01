# OutBreak Watch

OutBreak Watch is a web application that allows users to manually visualize the outbreak of diseases across the world by coloring affected countries on a world map. The application provides an interactive map where users can color countries based on the severity or presence of disease outbreaks, helping to visualize and keep track of global disease outbreaks.

## Features

- Inetractive world map to visualize and keep track of disease outbreaks.
- Simple and interactive user interface for selecting and coloring countries.
- Easy-to-use controls to modify the map’s appearance and highlight specific outbreak regions.
- Option to color countries based on different categories (e.g., severity of the outbreak).
- Option to add, remove or keep track of new Outbreaks.

## Technologies Used

- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime used for the server-side logic.
- **Express**: Web framework for handling HTTP requests and routing.
- **Body-Parser**: Middleware to handle incoming request bodies in the application.
- **PostgreSQL**: Database used for storing outbreak-related data.
- **TailwindCSS**: Utility-first CSS framework for styling and responsiveness.

## Prerequisites

- **React.js** (v19) and **tailwind** (v4.0.8) must be installed on your machine.
- **Node.js** (v14 or above) and **npm** must be installed on your machine.
- **PostgreSQL** must be installed to run the database locally.

## Installation

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/UnknownCode01/OutBreak-Watch.git
```

### 3. Set Up PostgreSQL Database

1. Create a PostgreSQL database to store outbreak data.
2. Set up the necessary tables to track which countries have been affected by the disease.
3. Update the database connection details in your application code.


### 4. Navigate to the Project Directory and install dependencies

```bash
cd OutBreak-Watch
cd backend
npm i
cd ..
cd frontend
npm i
```

## Running the Application

Once the dependencies are installed and the database is set up, you can run the application in development mode.

### 1. Start the Development Server

```bash
cd OutBreak-Watch
cd backend
nodemon index.js
Open another terminal
cd ..
cd frontend
npm run dev
```

### 2. Open the Application

After the server has started, open your browser and go to:

```
http://localhost:5173
```

You should now see the OutBreak Watch application running on your local machine, with an interactive world map for manually coloring affected countries.

## Usage

- Upon loading the page, the world map will be displayed.
- You can manually select a country and assign a color to it to indicate the presence of an outbreak.
- You can add other maps to indicate different illness outbreak.
- Use the controls to adjust the color scheme and specify the outbreak severity for each country.

## Database Structure

The application uses PostgreSQL to store user and country visit data. Below is the structure of the database:

- **users** table:
  - `id`: Primary key for each user (auto-incremented).
  - `name`: Name of the user (e.g. Black Death, COVID-19, Plague etc.).
  - `color`: The color assigned to the user for marking countries.

- **visited_countries** table:
  - `id`: Primary key for each record.
  - `country_code`: The country code (e.g., 'FR' for France, 'GB' for Great Britain).
  - `user_id`: A reference to the `users` table, linking each visited country to a specific user.

### Sample Data:

Example records inserted into the database:

- **users**:
  - User `Plague ` has the color `teal`.
  - User `COVID-19` has the color `powderblue`.
  - User `Black Death` has the color `red`.

- **visited_countries**:
  - User `Plague` has affected France (`FR`) and Great Britain (`GB`).
  - User `COVID-19` has affected Canada (`CA`) and France (`FR`).

### Example Query:

A `JOIN` query retrieves data that combines both the users and their visited countries:

```sql
SELECT * 
FROM visited_countries 
JOIN users 
ON users.id = visited_countries.user_id;
```

This query will return a list of countries visited by each user, including the user's name and color, which can be used to color those countries on the world map.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request.

---
