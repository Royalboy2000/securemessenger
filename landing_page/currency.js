document.addEventListener('DOMContentLoaded', () => {
    const exchangeRate = 130; // 1 USD = 130 KES

    // Function to format number with commas
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US').format(amount);
    };

    // Function to convert prices
    const convertPrices = () => {
        const priceElements = document.querySelectorAll('.product-price');
        priceElements.forEach(el => {
            const text = el.textContent.trim();
            if (text.includes('USD')) {
                const usdPrice = parseFloat(text.replace(/[^0-9.-]+/g, ""));
                if (!isNaN(usdPrice)) {
                    const kshPrice = Math.round(usdPrice * exchangeRate);
                    el.textContent = `KSH ${formatCurrency(kshPrice)}`;
                }
            }
        });
    };

    // Fetch user's location and convert currency if in Kenya
    const geolocateAndConvert = async () => {
        try {
            // Use a free Geo-IP API to get location info
            const response = await fetch('http://ip-api.com/json/?fields=status,countryCode');
            if (!response.ok) {
                // If the API fails, do nothing and show default prices
                console.error('Geo-IP API request failed.');
                return;
            }
            const data = await response.json();

            // Check if the user is in Kenya (KE)
            if (data.status === 'success' && data.countryCode === 'KE') {
                convertPrices();
            }
        } catch (error) {
            console.error('Error fetching geolocation data:', error);
            // In case of an error (e.g., ad-blocker), do not convert prices
        }
    };

    geolocateAndConvert();
});