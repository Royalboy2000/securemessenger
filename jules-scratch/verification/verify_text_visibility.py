from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to a product page
    page.goto("http://localhost:8000/services/products/android-boxes/mxq-pro-basic.html")

    # Locate the product details section
    product_details_section = page.locator(".product-details")

    # Scroll down to the product details section to make it visible
    product_details_section.scroll_into_view_if_needed()

    # Wait for the "Product Description" h2 to be visible
    expect(product_details_section.locator("h2", has_text="Product Description")).to_be_visible()

    # Take a screenshot of the product details section
    product_details_section.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)