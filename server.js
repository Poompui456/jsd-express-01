import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ], // frontend domain
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello USER, I am your Server ^u^");
});

// Declare a simple array called “members” to temporarily store members
let members = [];

// Route to handle POST requests to create a new post
app.post("/members", (req, res) => {
  const { name, lastname, position } = req.body;

  // Example: Save the post to a data store
  const newMember = {
    id: String(members.length + 1),
    name: name,
    lastname: lastname,
    position: position,
  };

  members.push(newMember);

  res.status(201).json(newMember);
});

// Route to handle GET requests to read posts
app.get("/members", (req, res) => {
  res.status(200).json(members);
});

app.delete("/members/:id", (req, res) => {
  const memberId = req.params.id;

  const memberIndex = members.findIndex((member) => member.id === memberId);

  if (memberIndex !== -1) {
    members.splice(memberIndex, 1);

    res.status(200).send(`Member with ID ${memberId} deleted successfully.`);
  } else {
    res.status(404).send("Member not found.");
  }
});

// Route to handle PUT requests to update a member
app.put("/members/:id", (req, res) => {
  const memberId = req.params.id;
  const { name, lastname, position } = req.body;

  const member = members.find((m) => m.id === memberId);

  if (member) {
    if (name !== undefined) member.name = name;
    if (lastname !== undefined) member.lastname = lastname;
    if (position !== undefined) member.position = position;

    res.status(200).json(member);
  } else {
    res.status(404).send("Member not found.");
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🦄 Server running on port ${PORT} 🎉`);
});
