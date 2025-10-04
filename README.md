# SecureMessenger Website

This is the official website for SecureMessenger, a conceptual project for a private and secure communication platform. The website is designed to be a modern, visually appealing static page that showcases the key features of the application.

## Features

*   **Responsive Design**: The website is fully responsive and works on all devices, from desktops to mobile phones.
*   **3D Globe**: The hero section features an interactive 3D globe, created with the three.js library, to symbolize the global and secure nature of the messenger.
*   **Typing Effect**: A dynamic typing effect in the hero section introduces the core values of the application: "Private. Secure. Untraceable."
*   **Modern UI/UX**: The design is clean, modern, and user-friendly, with smooth animations and transitions to enhance the user experience.

## Technologies Used

*   **HTML5**
*   **CSS3**
*   **JavaScript (ES6)**
*   **three.js**: For the 3D globe visualization.
*   **Font Awesome**: For icons.

## How to Run

1.  Clone the repository: `git clone https://github.com/your-username/secure-messenger-website.git`
2.  Navigate to the project directory: `cd secure-messenger-website`
3.  Since the 3D globe requires loading a texture, you need to run a local web server to avoid CORS errors. A simple way to do this is with Python:

    ```bash
    python3 -m http.server
    ```

4.  Open your browser and go to `http://localhost:8000` to view the website.