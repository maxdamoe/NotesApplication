// SET UP DEPENDENCIES & BOILERPLATE //
const fs = require("fs");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// IMPORT THE "PATH" module here //
const path = require("path");
//// SET VARIABLE THAT REQUIRES DB FILE TO ACCESS DATA //
const userNotes = require("./db/db.json")

//// set up Express app to handle data parsing ////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// END BOILERPLATE & DEPENDENCIES //

/// ROUTES START HERE ///////////////
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

/// GET /NOTES SHOULD RETURN THE NOTES.HTML FILE
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


//// GET /api/notes should read the db.json file and return all saved notes json
app.get("/api/notes", (req, res) => {
    console.log(userNotes);
    return res.json(userNotes);   /// will return all userNotes in json format 


});


// POST /API/NOTES SHOULD RECEIVE A NEW NOTE TO SAVE ON THE REQUEST BODY AND ADD IT TO DB.JSON FILE, & RETURN NEW NOTE TO CLIENT 
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = (userNotes.length).toString();

    userNotes.push(newNote);

    // WRITE FILE, STRINGIFY USERNOTES ARRAY, AND LOG ERROR IF THERE 
    fs.writeFile(notes, JSON.stringify(userNotes), (err) => {
        if (err)
            console.log(err);
    })
    res.json(newNote);
})

// app.delete("api/notes/:id", (req, res) => {
//     for (let i = 0; i < userNotes.length; i++) {
//         let deleteNote = userNotes[i];


// }


// THE * ROUTE WILL RETURN USER TO HOME PAGE AND SHOULD ALWAYS COME AFTER OTHER ROUTES THAT 'GET' OR IT WILL TAKE PRECEDENCE OVER THE OTHERS. // 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

// APP IS LISTENING TO PORT //
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})