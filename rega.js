function analyzeProducts(products) {

    const opportunities = [];

    products.forEach(product => {

        if (product.sold < product.expected) {

            const gap = product.expected - product.sold;

            opportunities.push({
                product: product.name,
                sold: product.sold,
                expected: product.expected,
                gap: gap,
                recommendation: "Offer 10% discount for 24 hours"
            });
        }
    });

    return opportunities;
}