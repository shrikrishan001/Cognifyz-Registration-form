const express = require("express");
const session = require("express-session");
const db = require("./db");

const app = express();

// =============================
// View Engine
// =============================
app.set("view engine", "ejs");

// =============================
// Middleware
// =============================
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    session({
        secret: "cognifyz_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);

// =============================
// Home
// =============================
app.get("/", (req, res) => {
    res.render("index");
});

// =============================
// Login Page
// =============================
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/dashboard", (req, res) => {

    console.log("Session Data:", req.session);

    console.log("Session User:", req.session.user);

    if (!req.session.user) {
        return res.send("Session Not Found");
    }

    res.render("dashboard", {
        user: req.session.user
    });

});

// =============================
// Register
// =============================
app.post("/submit", (req, res) => {

    const {
        fullname,
        email,
        countryCode,
        phone,
        dob,
        gender,
        country,
        state,
        district,
        city,
        address,
        pincode,
        password,
        confirmpassword
    } = req.body;

    if (
        !fullname || !email || !countryCode || !phone ||
        !dob || !gender || !country || !state ||
        !district || !city || !address || !pincode ||
        !password || !confirmpassword
    ) {
        return res.send("❌ Please fill all fields.");
    }

    if (password !== confirmpassword) {
        return res.send("❌ Passwords do not match.");
    }

    db.run(
        `INSERT INTO users
        (fullname,email,phone,dob,gender,country,state,district,city,address,password)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [
            fullname,
            email,
            phone,
            dob,
            gender,
            country,
            state,
            district,
            city,
            address,
            password
        ],
        function (err) {

            if (err) {
                return res.send("❌ " + err.message);
            }

            res.render("result", {
                fullname,
                email,
                countryCode,
                phone,
                dob,
                gender,
                country,
                state,
                district,
                city,
                address,
                pincode
            });

        }
    );

});

// =============================
// Login
// =============================
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, user) => {

            if (err) {
                return res.send("Database Error");
            }

            if (!user) {
                return res.send("❌ Email not found.");
            }

            if (user.password !== password) {
                return res.send("❌ Incorrect Password.");
            }
               req.session.user = user;
                    console.log("User Found:", user);

                req.session.user = user;

                console.log("Session Saved:", req.session.user);

                res.redirect("/dashboard");
                        

        }
    );

});

// =============================
// Dashboard
// =============================
// app.get("/dashboard", (req, res) => {

//     if (!req.session.user) {
//         return res.redirect("/login");
//     }

//     res.render("dashboard", {
//         user: req.session.user
//     });

// });

app.get("/dashboard", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("dashboard", {
        user: req.session.user
    });

});

// =============================
// Logout
// =============================
app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

});

// =============================
// Server
// =============================
const PORT = 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running at http://localhost:${PORT}`);

});