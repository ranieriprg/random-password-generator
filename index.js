const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(express.static("public"));

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", "handlebars");
app.set("views", "views");

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/generate", (req, res) => {
  res.send("Aqui vamos gerar uma senha!");
});

app.post("/generate", (req, res) => {
  const length = parseInt(req.body.length) || 8;
  const password = generatePassword(length);
  res.render("home", { password });
});

app.get("/", (req, res) => {
  res.render("home");
});

function generatePassword(length = 8) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

app.listen(port, function (err) {
  if (err) {
    console.log("error", err);
  }
  console.log(`rodando na porta ${port}`);
});
