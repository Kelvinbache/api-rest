//importamos el json
const users = require("./user.json");

const express = require("express");

const crypto = require("node:crypto");

const { validateUse, validateParcialUser } = require("./user");

const app = express();

app.use(express.json());

app.disable("X-powered-by");


app.get("/users",(req,res)=>{
   res.status(200).json(users)
})



const PORT = process.env.PORT ?? 3000 // para configurar el problema del puerto

app.listen(PORT, () => {
  console.log("power on server");
});

// estamos haciendo una direccion que recupere todos los datos
