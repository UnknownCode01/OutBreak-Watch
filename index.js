import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "db1",
  password: "12345",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function initializeCurrentUser() {
  const result = await db.query("SELECT id FROM users WHERE name = $1;", ['Countries']);
  return result.rows[0].id; 
}

let currentUserId = await initializeCurrentUser();
const default_id = await initializeCurrentUser();
let users = [];

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add_country", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1;",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      const existingCountry = await db.query(
        "SELECT * FROM visited_countries WHERE country_code = $1 AND user_id = $2",
        [countryCode, currentUserId]
      );
      if (existingCountry.rowCount > 0) {
        throw new Error();
      }
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error:"Country has already been added",
    });
    }
  } catch (err) {
    console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error:"Country doesn't exists",
    });
  }
});

app.post("/remove_country", async (req, res) => {
  const input = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE $1;",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      const existingCountry = await db.query(
        "SELECT * FROM visited_countries WHERE country_code = $1 AND user_id = $2",
        [countryCode, currentUserId]
      );
      if (existingCountry.rowCount == 0) {
        throw new Error();
      }
      await db.query(
        "DELETE FROM visited_countries WHERE country_code = $1 and user_id = $2 ;",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error:"Country is not Selected",
    });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
      res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error:"Country doesn't exists",
    });
  }
});

app.post("/user", async (req, res) => {
  if (req.body.edit === "add_disease") {
    res.render("add_disease.ejs");
  } else if(req.body.edit === "remove_disease"){
    res.render("remove_disease.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/add_disease", async (req, res) => {
  try {
    const name = req.body.name;
    const color = req.body.color;
    const search = await db.query(
      "SELECT COUNT(*) FROM USERS WHERE name = $1;",
      [name]
    );
    const count = parseInt(search.rows[0].count, 10);
    if (count > 0) {
      throw new Error();
    }
    else{
      const result = await db.query(
        "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
        [name, color]
      );
      const id = result.rows[0].id;
      currentUserId = id;
      res.redirect("/");
    }
  }
  catch(error){
    res.render("add_disease.ejs", {
      error:"Disease already exists",
    });
  }
});

app.post("/remove_disease", async (req, res) => {
  try {
    const name = req.body.name;
    if(name==="Countries"){
      res.render("remove_disease.ejs", {
        error:"Can't delete Countries",
      });
    }else{
      const result = await db.query(
        "SELECT * FROM USERS WHERE name = $1;",
        [name]
      );
      if (result.rows.length === 0) {
        throw new Error();
      }
      const id = result.rows[0].id;
  
      await db.query("DELETE FROM visited_countries WHERE id = $1;", [id]);
      await db.query("DELETE FROM users WHERE name = $1;", [name]);
      
      currentUserId = default_id;
      res.redirect("/");
    }
    
  } catch (error) {
    res.render("remove_disease.ejs", {
      error:"Disease doesn't exist",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
