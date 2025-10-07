from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to a product page. The server is running in the 'landing_page' directory.
    page.goto("http://localhost:8000/services/products/android-boxes/mxq-pro-basic.html")

    # Wait for the product details section to ensure the page has loaded
    product_details = page.locator(".product-details")
    expect(product_details).to_be_visible()

    # Take a screenshot to verify the text is now visible
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)