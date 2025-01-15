import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

var teaData = [];
let nextId = 1;
app.get("/", (req, res) => {
    res.send("All Ok");
});
app.post("/teas", (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
});
// get a tea with id
app.get("/teas", (req, res) => {
    res.status(200).send(teaData);
});
app.get("/teas:id", (req, res) => {
    const tea = teaData.find((t) => parseInt(t.id) === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
});
// Update tea
app.put("/teas:id", (req, res) => {
    const tea = teaData.find((t) => parseInt(t.id) === parseInt(req.params.id));

    if (!tea) {
        return res.statur(404).send("Tea not found");
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

app.delete("/teas:id", (req, res) => {
    let index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
    if (!index) {
        res.send("Tea not found");
    }
    teaData.splice(index, 1);
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});
