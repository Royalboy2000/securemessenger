import re

exchange_rate = 130  # 1 USD = 130 KES
profit_margin = 0.50

# Process Mxq Pro 4K
with open('mxq_pro_4k_info.txt', 'r') as f:
    lines = f.readlines()

# Get average price for Mxq Pro 4K
prices = []
for line in lines:
    match = re.search(r'KSh (\d{1,3}(?:,\d{3})*)', line)
    if match:
        price_str = match.group(1).replace(',', '')
        prices.append(float(price_str))

avg_price_ksh = sum(prices) / len(prices) if prices else 2500
avg_price_usd = avg_price_ksh / exchange_rate
final_price_usd = avg_price_usd * (1 + profit_margin)

print(f"Mxq Pro 4K Average Price: KSh {avg_price_ksh:.2f} => USD ${final_price_usd:.2f} (with 50% profit)")

# Process Vitron TVs
with open('vitron_tv_info.txt', 'r') as f:
    lines = f.readlines()

# Get sample prices for Vitron TVs
vitron_prices = {}
for line in lines[:5]:  # Get first 5 models
    match = re.search(r'KSh (\d{1,3}(?:,\d{3})*)', line)
    if match:
        price_str = match.group(1).replace(',', '')
        price_ksh = float(price_str)
        price_usd = price_ksh / exchange_rate
        final_price = price_usd * (1 + profit_margin)
        model_name = line.split(':')[0].strip()
        vitron_prices[model_name] = final_price
        print(f"{model_name}: KSh {price_ksh:.2f} => USD ${final_price:.2f} (with 50% profit)")

# Process Syinix TVs
with open('syinix_tv_info.txt', 'r') as f:
    lines = f.readlines()

# Get sample prices for Syinix TVs
syinix_prices = {}
for line in lines[:5]:  # Get first 5 models
    match = re.search(r'KSh (\d{1,3}(?:,\d{3})*)', line)
    if match:
        price_str = match.group(1).replace(',', '')
        price_ksh = float(price_str)
        price_usd = price_ksh / exchange_rate
        final_price = price_usd * (1 + profit_margin)
        model_name = line.split(':')[0].strip()
        syinix_prices[model_name] = final_price
        print(f"{model_name}: KSh {price_ksh:.2f} => USD ${final_price:.2f} (with 50% profit)")

# Process Samsung TVs
with open('samsung_tv_info.txt', 'r') as f:
    lines = f.readlines()

# Get sample prices for Samsung TVs
samsung_prices = {}
for line in lines[:5]:  # Get first 5 models
    match = re.search(r'KSh (\d{1,3}(?:,\d{3})*)', line)
    if match:
        price_str = match.group(1).replace(',', '')
        price_ksh = float(price_str)
        price_usd = price_ksh / exchange_rate
        final_price = price_usd * (1 + profit_margin)
        model_name = line.split(':')[0].strip()
        samsung_prices[model_name] = final_price
        print(f"{model_name}: KSh {price_ksh:.2f} => USD ${final_price:.2f} (with 50% profit)")
