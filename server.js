const path = require("path");

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const supabase = require("./supabase");

const app = express();

// =============================
// View Engine
// =============================
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// =============================
// Middleware
// =============================
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "cognifyz_secret_key",
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

// =============================
// Register
// =============================
app.post("/submit", async (req, res) => {

     console.log("🔥 /submit route hit");

    console.log(req.body);

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
        postoffice,
        address,
        pincode,
        password,
        confirmpassword
    } = req.body;


    if (
        !fullname || !email || !countryCode || !phone ||
        !dob || !gender || !country || !state ||
        !district || ! postoffice || !address || !pincode ||
        !password || !confirmpassword
    ) {
        return res.send("Please fill all fields.");
    }

    if (password !== confirmpassword) {
        return res.send("Passwords do not match.");
    }


    const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

if (existingUser) {
    return res.send("Email already registered.");
}

    const { error } = await supabase
    .from("users")
    .insert([
        {
            fullname,
            email,
            phone,
            dob,
            gender,
            country,
            state,
            district,
            postoffice,
            address,
            pincode,
            password
        }
    ]);

if (error) {
    return res.send(error.message);
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
    postoffice,
    address,
    pincode
});
});

    

// =============================
// Login
// =============================
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
        return res.send("Email not found.");
    }

    if (user.password !== password) {
        return res.send("Incorrect Password.");
    }

    req.session.user = user;

    res.redirect("/dashboard");

});

// =============================
// Dashboard
// =============================
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
// Local Server (Only for localhost)
// =============================
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`🚀 Server Running at http://localhost:${PORT}`);
    });
}

// =============================
// Export for Vercel
// =============================
module.exports = app;
