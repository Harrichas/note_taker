const path = require("path");
const dbJSON = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {
    //get request /api/notes
    app.get("/api/notes", function(req, res) {
        res.json(dbJSON);
      });
    //post request /api/notes
    app.post("/api/notes", function(req, res) {
        // Validate request body
        if(!req.body.title) {
          return res.json({error: "Missing required title"});
        }
      
        // Copy request body and generate ID
        const note = {...req.body, id: uuidv4()}
      
        // Push note to dbJSON array - saves data in memory
        dbJSON.push(note);
      
        // Saves data to file by persisting in memory variable dbJSON to db.json file.
        // This is needed because when we turn off server we loose all memory data like pbJSON variable.
        // Saving to file allows us to read previous notes (before server was shutdown) from file.
        fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(dbJSON), (err) => {
          if (err) {
            return res.json({error: "Error writing to file"});
          }
      
          return res.json(note);
        });
      });
    //delete request /api/notes/:id
    app.delete("/api/notes/:id", function(req, res) {
        let deleteId = req.params.id
        let newNotes = dbJSON.filter(note => note.id !== deleteId)
        dbJSON = newNotes
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbJSON), (err)=> {
            if (err) {
                return res.json({
                    error: ("error writing file")
                })
            }
            return res.json(newNotes)
        })
    })
}