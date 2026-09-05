// ==========================================
// REVGROW AI - SCRIPT.JS
// ==========================================


// ==========================================
// 1. REGA AI ANALYSIS
// ==========================================

const opportunities = analyzeProducts(products);

console.log("Rega Opportunities:", opportunities);

const regaOpportunity =
    document.getElementById("regaOpportunity");

if (regaOpportunity && opportunities.length > 0) {

    const opportunity = opportunities[0];

    const productName =
        regaOpportunity.querySelector(
            ".product-highlight strong"
        );

    const soldValue =
        regaOpportunity.querySelector(
            ".sales-comparison div:nth-child(1) strong"
        );

    const expectedValue =
        regaOpportunity.querySelector(
            ".sales-comparison div:nth-child(2) strong"
        );

    const message =
        regaOpportunity.querySelector(".rega-message p");

    if (productName) {
        productName.textContent = opportunity.product;
    }

    if (soldValue) {
        soldValue.textContent = opportunity.sold;
    }

    if (expectedValue) {
        expectedValue.textContent = opportunity.expected;
    }

    if (message) {
        message.innerHTML =
            `<b>${opportunity.recommendation}</b>`;
    }
}


// ==========================================
// 2. SPLASH SCREEN
// ==========================================

window.addEventListener("load", function () {

    const splash =
        document.getElementById("splashScreen");

    setTimeout(function () {

        if (splash) {
            splash.style.display = "none";
        }

    }, 3000);

});


// ==========================================
// 3. SALES DATA
// ==========================================

const salesData = {

    all: [12, 18, 15, 25, 21, 30, 27],

    buds: [8, 10, 7, 9, 6, 8, 7],

    watch: [15, 18, 20, 17, 22, 25, 24],

    shoes: [10, 8, 7, 9, 6, 5, 5],

    backpack: [5, 8, 6, 10, 9, 12, 11]

};


// ==========================================
// 4. SALES CHART
// ==========================================

const chart =
    document.getElementById("salesChart");

const productFilter =
    document.getElementById("productFilter");


function createChart(product) {

    if (!chart) return;

    const values = salesData[product];

    if (!values) return;

    const maxValue =
        Math.max(...values);

    chart.innerHTML = "";


    const graph =
        document.createElement("div");

    graph.style.width = "90%";
    graph.style.height = "230px";
    graph.style.display = "flex";
    graph.style.alignItems = "flex-end";
    graph.style.justifyContent = "space-around";
    graph.style.gap = "12px";


    const dates = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];


    values.forEach(function (value, index) {

        const column =
            document.createElement("div");

        column.style.height = "100%";
        column.style.flex = "1";
        column.style.display = "flex";
        column.style.flexDirection = "column";
        column.style.justifyContent = "flex-end";
        column.style.alignItems = "center";


        // Number

        const number =
            document.createElement("span");

        number.textContent = value;

        number.style.fontSize = "11px";
        number.style.color = "#718096";
        number.style.marginBottom = "5px";


        // Bar

        const bar =
            document.createElement("div");

        const height =
            (value / maxValue) * 180;

        bar.style.height = `${height}px`;
        bar.style.width = "70%";
        bar.style.maxWidth = "45px";
        bar.style.background = "#2697e8";
        bar.style.borderRadius = "6px 6px 0 0";
        bar.style.transition = "0.3s";


        // Day

        const date =
            document.createElement("small");

        date.textContent = dates[index];

        date.style.marginTop = "8px";
        date.style.color = "#9aabba";
        date.style.fontSize = "10px";


        column.appendChild(number);
        column.appendChild(bar);
        column.appendChild(date);

        graph.appendChild(column);

    });


    chart.appendChild(graph);

}


// Initial chart

createChart("all");


// Product filter

if (productFilter) {

    productFilter.addEventListener(
        "change",
        function () {

            createChart(this.value);

        }
    );

}


// ==========================================
// 5. PAGE NAVIGATION
// ==========================================

const navItems =
    document.querySelectorAll(".nav-item");

const pages =
    document.querySelectorAll(".page-section");


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const targetPage =
                this.getAttribute("data-page");


            if (!targetPage) {
                return;
            }


            // Remove active navigation

            navItems.forEach(function (nav) {

                nav.classList.remove("active");

            });


            this.classList.add("active");


            // Hide all pages

            pages.forEach(function (page) {

                page.classList.remove("active-page");

            });


            // Show selected page

            const selectedPage =
                document.getElementById(targetPage);


            if (selectedPage) {

                selectedPage.classList.add(
                    "active-page"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );

});


// ==========================================
// 6. VIEW ALL PRODUCTS BUTTON
// ==========================================

const viewAllButton =
    document.querySelector(".view-button");


if (viewAllButton) {

    viewAllButton.addEventListener(
        "click",
        function () {

            const productsNav =
                document.querySelector(
                    '[data-page="products-page"]'
                );


            if (productsNav) {
                productsNav.click();
            }

        }
    );

}


// ==========================================
// 7. REGA RECOMMENDATION
// ==========================================

// IMPORTANT:
// We use specific IDs instead of ".primary-button"
// so the Payment button does NOT trigger Rega.

const recommendationButtons = [

    document.getElementById(
        "recommendationButton"
    ),

    document.getElementById(
        "aiRecommendationButton"
    )

].filter(Boolean);


recommendationButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            showRecommendation();

        }
    );

});


function showRecommendation() {

    const opportunity =
        opportunities.length > 0
            ? opportunities[0]
            : null;

    if (!opportunity) {
        alert(
            "Rega could not find a growth opportunity."
        );
        return;
    }

    const message =
        "🤖 REGA AI — GROWTH OPPORTUNITY\n\n" +

        "🔍 WHY?\n" +
        opportunity.product +
        " sold only " +
        opportunity.sold +
        " units, while the expected sales were " +
        opportunity.expected +
        " units.\n\n" +

        "💡 RECOMMENDATION\n" +
        opportunity.recommendation + ".\n\n" +

        "🛡️ SAFETY GATE\n" +
        "No money-related action will happen automatically.\n" +
        "Merchant approval is required.\n\n" +

        "📝 AUDIT TRAIL\n" +
        "The decision will be recorded in Activity Log.\n\n" +

        "Do you want to approve Rega's recommendation?";

    const approved = confirm(message);

    if (approved) {

        alert(
            "✓ REGA ACTION APPROVED\n\n" +

            "Product: " +
            opportunity.product +
            "\n\n" +

            "Action: 10% discount\n" +
            "Duration: 24 hours\n\n" +

            "Campaign will now be created.\n" +
            "Decision recorded in Activity Log."
        );

        console.log(
            "Rega recommendation approved by merchant."
        );

        addActivity(
            opportunity.product +
            " — 10% discount for 24 hours",
            "Approved"
        );

        createCampaign();

    } else {

        alert(
            "✕ REGA ACTION REJECTED\n\n" +

            "No action was taken.\n\n" +

            "The rejection has been recorded in Activity Log."
        );

        console.log(
            "Rega recommendation rejected by merchant."
        );

        addActivity(
            opportunity.product +
            " — 10% discount recommendation",
            "Rejected"
        );
    }
}

// ==========================================
// 8. REGA SIDEBAR CARD
// ==========================================

const regaCard =
    document.querySelector(".agent-mini-card");


if (regaCard) {

    regaCard.style.cursor = "pointer";


    regaCard.addEventListener(
        "click",
        function () {

            const aiNav =
                document.querySelector(
                    '[data-page="ai-page"]'
                );


            if (aiNav) {
                aiNav.click();
            }

        }
    );

}


// ==========================================
// 9. ACTIVITY LOG
// ==========================================

function addActivity(action, status) {

    const activityPage =
        document.getElementById(
            "activity-page"
        );


    if (!activityPage) return;


    const activityContainer =
        activityPage.querySelector(
            ".page-card"
        );


    if (!activityContainer) return;


    const activityItem =
        document.createElement("div");


    activityItem.className =
        "activity";


    activityItem.innerHTML = `

        <div class="activity-dot success-dot"></div>

        <div>

            <strong>
                ${action}
            </strong>

            <small>
                Just now • ${status}
            </small>

        </div>

    `;


    activityContainer.appendChild(
        activityItem
    );

}


// ==========================================
// 10. CREATE CAMPAIGN
// ==========================================

function createCampaign() {

    const campaignContainer =
        document.getElementById(
            "campaignContainer"
        );


    if (!campaignContainer) return;


    const campaign =
        document.createElement("div");


    campaign.className =
        "campaign";


    campaign.innerHTML = `

        <div class="campaign-icon">
            %
        </div>

        <div>

            <strong>
                Wireless Buds — 10% OFF
            </strong>

            <p>
                24 hour campaign • Created by Rega
            </p>

        </div>

        <span class="status active">
            Active
        </span>

    `;


    campaignContainer.appendChild(
        campaign
    );

}


// ==========================================
// 11. TEST PAYMENT
// ==========================================

const testPaymentButton =
    document.getElementById(
        "testPaymentButton"
    );


const paymentMessage =
    document.getElementById(
        "paymentMessage"
    );


if (testPaymentButton) {

    testPaymentButton.addEventListener(
        "click",
        async function () {

            paymentMessage.textContent =
                "Creating test payment...";


            try {

                const response =
                    await fetch(
                        "/api/test-payment",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                product:
                                    "Wireless Buds",

                                amount:
                                    1800

                            })

                        }
                    );


                const data =
                    await response.json();


                if (data.success) {

                    paymentMessage.textContent =
                        "✓ " +
                        data.message +
                        " Payment ID: " +
                        data.payment.id;


                    console.log(
                        "Test Payment:",
                        data.payment
                    );
                    addActivity(
    "Test payment created — Wireless Buds — ₹1,800",
    "Test Mode"
);

                }

                else {

                    paymentMessage.textContent =
                        "Payment creation failed.";

                }

            }

            catch (error) {

                console.error(
                    "Payment Error:",
                    error
                );


                paymentMessage.textContent =
                    "Unable to connect to RevGrow backend.";

            }

        }
    );

}


// ==========================================
// 12. KEYBOARD ACCESSIBILITY
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            const dashboardNav =
                document.querySelector(
                    '[data-page="dashboard-page"]'
                );


            if (dashboardNav) {
                dashboardNav.click();
            }

        }

    }
);
// ==================================================
// CUSTOMER CHECKOUT PAYMENT
// ==================================================

const checkoutPaymentButton =
    document.getElementById("checkoutPaymentButton");

const checkoutMessage =
    document.getElementById("checkoutMessage");

if (checkoutPaymentButton) {

    checkoutPaymentButton.addEventListener(
        "click",
        async function () {

            checkoutMessage.textContent =
                "Processing test payment...";

            try {

                const response =
                    await fetch("/api/test-payment", {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            product:
                                "Wireless Buds",

                            amount:
                                1800

                        })

                    });

                const data =
                    await response.json();

                if (data.success) {

                    checkoutMessage.textContent =
                        "✓ Test payment created successfully. Payment ID: " +
                        data.payment.id;

                    addActivity(
                        "Customer payment created — Wireless Buds — ₹1,800",
                        "Test Mode"
                    );

                } else {

                    checkoutMessage.textContent =
                        "Payment creation failed.";

                }

            } catch (error) {

                console.error(
                    "Checkout Error:",
                    error
                );

                checkoutMessage.textContent =
                    "Unable to connect to RevGrow backend.";

            }

        }
    );

}

// ==========================================
// REVGROW AI READY
// ==========================================

console.log(
    "RevGrow AI loaded successfully."
);

console.log(
    "Rega AI Growth Agent is ready."
);