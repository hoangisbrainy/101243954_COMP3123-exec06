const express = require('express');
const noteModel = require('../models/NotesModel');
const app = express();
const mongoose = require('mongoose');

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    let s = {
        noteTitle : "first note",
        noteDescription: "hello1",
        priority:"low"
    }
    const note = new noteModel(s);

    try {
        await note.save();
        res.send(note);
    } catch (err) {
        res.status(500).send(err);
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async(req, res) => {
    const note = await noteModel.find();

    //TODO - Write your code here to returns all note
    try {
        res.send(note);
    } catch (err) {
        res.status(500).send(err);
    }
    
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async(req, res) => {
    const note = await noteModel.findById(req.params.noteId)

    //TODO - Write your code here to return only one note using noteid

    try{
        res.send(note)
    } catch(err){
        res.status(500).send(err)
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async(req, res) => {   
   try{
    const id = req.params.noteId;
    var updates = req.body;
    updates.noteDescription = "hello changed";

    const result = await NoteModel.findByIdAndUpdate(id, updates);

    res.status(200).send(`Note has been updated: ${result}`);
  } catch (err) {
    res.status(500).send(err);
  }
    });

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async(req, res) => {  
    //TODO - Write your code here to delete the note using noteid
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId)
        
        if(!note) {
            res.status(404).send("No note found")}

        res.status(200).send("Deleted successfully")
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app