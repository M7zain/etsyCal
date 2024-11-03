function Calculate() { 
    // Get listing price from input and parse it as a number
    let listing_price = document.getElementById("listing_price").value;
    
    // Check if listing_price is a valid number
    if (isNaN(listing_price)) {
        document.getElementById("answer").innerHTML = "Please enter a valid listing price.";
        return;
    }
    
    let listing_fee = 7;
    let transaction_fee_rate = 0.065; 
    let processing_fee = 14 ; 
    let processing_fee_rate = 0.065; 
    let regulatory_fee_rate = 0.0227 ; 
    let vat_fee = 55 ;
    let state_fee_rate = 0.078; 

    // Calculate individual fees
    let transaction_fee = listing_price * transaction_fee_rate;
    let processing_fee_total = (listing_price * processing_fee_rate) + processing_fee;
    let regulatory_fee = listing_price * regulatory_fee_rate;
    let state_fee = listing_price * state_fee_rate;

    // Calculate total fees
    let total_fees = transaction_fee + listing_fee + processing_fee_total + regulatory_fee + vat_fee + state_fee;
    
    // Display the result
    document.getElementById("answer").innerHTML = total_fees.toFixed(2) + "$"; // Format to 2 decimal places
}