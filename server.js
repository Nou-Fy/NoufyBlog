const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 1. Création du serveur HTTP de base
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // 2. Initialisation de Socket.io sur ce serveur
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Nouveau client connecté :", socket.id);

    // Écouter un événement envoyé par le client
    socket.on("message-client", (data) => {
      console.log("Message reçu :", data);
      // Renoyer à TOUS les clients connectés
      io.emit("message-serveur", data);
    });

    socket.on("disconnect", () => {
      console.log("Client déconnecté");
    });
  });

  // 3. Lancer le serveur sur le port 3000
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Prêt sur http://localhost:3000");
  });
});
