//importamos el json
const users = require("./user.json");

const express = require("express");

const crypto = require("node:crypto");

const { validateUse, validateParcialUser } = require("./user");

const app = express();

app.use(express.json());

app.disable("X-powered-by");

app.get("/users", (req, res) => {
  res.header("Access-Control-Allow-origin", "");
  const { Id } = req.query;

  if (users) {
    const filterUsers = users.filter((user) => user.id == Id);
    return res.json(filterUsers);
  }

  res.json(users);
});

// todas las url se definen con el mismo recurso
app.post("/users", (req, res) => {
  const result = validateUse(req.body);

  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.message) });
  }

  const newUSer = {
    id: crypto.randomUUID(),
    ...result.data,
  }; //crypto crea id o indentificador universal unicas, y es totalmente unico

  users.push(newUSer);

  res.status(201).json(newUSer);
});

////////////////////////////////////////////////
app.get("/users/:id", (req, res) => {
  // path-to-regexp
  const { id } = req.params; //estamos recuperando un dato

  const user = users.find((user) => user.id === id); //intentando
  if (user) return res.json(user);

  res.status(404).json({ message: "user not found" });
});

//////////////////////////////////////////////////
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;

  const result = validateParcialUser(req.body);

  const usersIndex = users.findIndex((user) => (user.id = id));

  if (!result.success) {
    return res.status(404).json({ message: "usuario no actualizado" });
  }

  const updateUser = { ...users[usersIndex], ...result.data };

  users[usersIndex] = updateUser;

  return res.json(updateUser);
});


const PORT = process.env.PORT ?? 3000 // para configurar el problema del puerto

app.listen(PORT, () => {
  console.log("power on server");
});

// estamos haciendo una direccion que recupere todos los datos
