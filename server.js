const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve RevGrow frontend
app.use(express.static(__dirname));


// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// Test payment
app.post("/api/test-payment", (req, res) => {

    console.log("Test payment request received");

    const payment = {
        id: "pay_test_" + Date.now(),
        amount: req.body.amount || 1800,
        currency: "INR",
        status: "created",
        product: req.body.product || "Wireless Buds",
        mode: "TEST"
    };

    res.json({
        success: true,
        message: "Test payment created successfully",
        payment: payment
    });

});


app.listen(PORT, () => {

    console.log(
        `RevGrow backend running on http://localhost:${PORT}`
    );

});