import express from "express";
const app = express();
const port = process.env.PORT || 4000;
import bodyParser from "body-parser";
import cors from "cors";

import mongoose from "mongoose";
const reservationRoutes = express.Router();

import Todo from "./todo-model.js";
import Reservation from "./model/reservation.js";

app.use(cors());
app.use(bodyParser.json());

//db connection
mongoose
    .connect("mongodb+srv://MERN:MERN123@cluster0.jqt2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(()=> console.log("DB Connected"))
    .catch((err) => console.log("DB Connection error", err));


app.use('/reservation', reservationRoutes);



reservationRoutes.route("/").get(function(req, res) {
    console.log("function is reached after get reservations");
    Reservation.find(function(err, reservations) {
        if (err) {
            console.log(err)
        } else {
            res.json(reservations)
            console.log(reservations);
        }
    })
});



reservationRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    console.log("id elérve");
    Reservation.findById(id, function(err, reservations) {
        if (err) {
            console.log("id-ra nem talált", err)
        } else {
            res.json(reservations)
            console.log("id-re talált", reservations);
        }
    });
});



reservationRoutes.route('/add').post(function(req, res) {
    let reservation = new Reservation(req.body);
    console.log("add new reservation: ", reservation);
    reservation.save()
        .then(reservation => {
            res.status(200).json({'reservation': 'reservation added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new reservation failed');
        });
});



reservationRoutes.route('/update/:id').post(function(req, res) {
    Reservation.findById(req.params.id, function(err, reservation) {
        if (!reservation)
            res.status(404).send("data is not found");
        else
            reservation.title = req.body.title;
            reservation.description = req.body.description;
            reservation.start = req.body.start;
            reservation.end = req.body.end;

            reservation.save().then(reservation => {
                res.json('Reservation updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

reservationRoutes.route('/delete/:id').post(function(req, res) {
    Reservation.findById(req.params.id, function(err, reservation) {
        if (!reservation)
            res.status(404).send("data is not found");
        else
            reservation.deleteOne({_id: req.params.id})
            .then( reservation => {
                res.json('Reservation deleted!');
            })
            .catch(err => {
                res.status(400).send("Deleting is not possible");
            });
    });
});








    app.listen(port, function() {
        console.log("Server is running on Port: " + port);
    });

