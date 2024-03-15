const fs = require("fs")

const home = (req,res) => {
    fs.readFile('./view/main.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        res.send(data);
    });
}
    

const search = (req,res) => {
    return res.send("Search");
}

const seeBoard = (req,res) => {
    return res.send("See Board")
}

const editBoard = (req,res) => {
    return res.send("Edit Board")
}

const deleteBoard = (req,res) => {
    return res.send("Delete Board");
}

const writeBoard = (req,res) => {
    return res.send("Write Board");
}

module.exports = {
    home,
    search,
    seeBoard,
    editBoard,
    deleteBoard,
    writeBoard
};

