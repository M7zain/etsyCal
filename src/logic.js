var etsy_fees; 
var printify_cost = 0; // Default to 0 if not using Printify
var listing_price; 
var total_cost; 
var profit;

async function fetchUSDtoTRY() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD"); 
    const data = await res.json(); 
    return data.rates.TRY;
}

async function getPrintifyPrice(){ 
    let exchangeRate;
    try {
        exchangeRate = await fetchUSDtoTRY(); 
    } catch(error) { 
        document.getElementById("answer").innerHTML = "Couldn't fetch exchange rate!";
        console.error("Failed to fetch exchange rate:", error);
        return;
    }

    const printify_price = parseFloat(document.getElementById("printify_price").value);
    if (isNaN(printify_price)) {
        document.getElementById("answer").innerHTML = "Please enter a valid Printify price.";
        return;
    }

    const extra_printify_fees = 0.4 + 0.15; 
    let total_printify_price = printify_price + extra_printify_fees;
    printify_cost = total_printify_price * exchangeRate;
    
    return printify_cost;
}

async function CalculateFees() { 
    // Check if Printify is checked and calculate the printify cost if so
    const printifyCheckbox = document.getElementById("printify");
    if (printifyCheckbox.checked) {
        await getPrintifyPrice(); // Wait for printify_cost to be set
    } else {
        printify_cost = 0; // Set to 0 if Printify is not used
    }

    // Get listing price from input and parse it as a number
    listing_price = parseFloat(document.getElementById("listing_price").value);
    
    // Check if listing_price is a valid number
    if (isNaN(listing_price)) {
        document.getElementById("answer").innerHTML = "Please enter a valid listing price.";
        return;
    }
    
    let listing_fee = 7;
    let transaction_fee_rate = 0.065; 
    let processing_fee = 14; 
    let processing_fee_rate = 0.065; 
    let regulatory_fee_rate = 0.0227; 
    let vat_fee = 55;
    let state_fee_rate = 0.078; 

    // Calculate individual fees
    let transaction_fee = listing_price * transaction_fee_rate;
    let processing_fee_total = (listing_price * processing_fee_rate) + processing_fee;
    let regulatory_fee = listing_price * regulatory_fee_rate;
    let state_fee = listing_price * state_fee_rate;

    // Calculate total fees
    etsy_fees = transaction_fee + listing_fee + processing_fee_total + regulatory_fee + vat_fee + state_fee;

    // Calculate total cost and profit
    total_cost = etsy_fees + printify_cost; 
    profit = listing_price - total_cost;

    // Display the result
    document.getElementById("answer").innerHTML = "Your Total fees are: " + etsy_fees.toFixed(2) + " TL"; 
    document.getElementById("profit").innerHTML = "Your Profit: " + profit.toFixed(2) + " TL";
}

function toggleInput() { 
    const checkbox = document.getElementById("printify"); 
    const printify_price = document.getElementById("printify_price"); 

    // Toggle visibility of printify_price based on checkbox status
    printify_price.style.display = checkbox.checked ? "block" : "none";
}
