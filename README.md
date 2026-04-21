⚖️ Lintz Attorneys Firm Website

A high-standard institutional website developed for Lintz Advogados, an international law firm. This project was built with a focus on minimalist aesthetics (Apple-style), optimized performance, and full responsiveness for mobile and tablet devices.

🚀 Live Demo
Check out the live project here: https://lintzadv.com.br/

🛠️ Technologies & Tools

    Frontend: HTML5, Tailwind CSS (Mobile First approach).

    Interactivity: Vanilla JavaScript (ES6+).

    Backend/Bridge: PHP 8.x for secure API routing.

    Animations: AOS.js (Animate On Scroll) and custom dynamic Mouse-track Parallax.

    Communication: Integrated with EmailJS REST API via a secure server-side proxy.

💎 Project Highlights

🖥️ Desktop Experience (UX/UI)

    Dynamic Parallax: Implementation of visual depth in the Hero section, where the background reacts smoothly to mouse movement.

    Minimalist Design: Clean interface, strategic use of white space, and modern typography (Plus Jakarta Sans).

📱 Mobile & Tablet Optimization

    Performance: Disabled heavy animations and mouse interactions on touch devices to ensure fluidity and battery saving.

    Smart Framing: Dynamic zoom adjustment for the Rio de Janeiro background image, ensuring key landmarks remain visible on vertical screens.

    Custom Navigation: Tailored hamburger menu system designed for accessibility.

🛡️ Security Considerations (Cybersecurity Mindset)

As a Cybersecurity analyst, I evolved the project from a standard client-side integration to a robust multi-layer security architecture to protect sensitive data and service integrity:

1. Backend Proxy & Credential Masking

Instead of exposing API configurations in the frontend, I implemented a PHP Proxy Layer.

    Private Key Protection: The EmailJS Private Key is stored strictly on the server-side, making it invisible to end-users and malicious actors.

    Sensitive Data Isolation: All critical logic and API keys are decoupled from the client-side code, preventing credential harvesting.

2. Multi-Stage Input Sanitization

To mitigate Cross-Site Scripting (XSS) and Injection attacks, the project implements:

    Frontend Defense: Regex patterns (pattern) and maxlength attributes in HTML5, plus JavaScript-based sanitization to strip HTML tags before transmission.

    Backend Defense: The PHP layer uses strip_tags(), htmlspecialchars(), and filter_var() to neutralize payloads that might bypass frontend checks.

3. Server-Hardening & CORS

    CORS Policy: Implemented Access-Control-Allow-Origin headers to ensure the backend only accepts requests originating from the official domain.

    Security Headers: Configured headers like X-Content-Type-Options: nosniff and X-Frame-Options to prevent clickjacking and MIME-sniffing.

    HTTPS Enforcement: Structured to be served over secure layers, ensuring end-to-end data integrity.

📂 How to run this project locally

    Clone the repository:
    Bash

    git clone https://github.com/BernardoLintz/Lintz-Attorneys-Firm-Website.git

    Server Environment: Since the contact form now uses PHP for security, you will need a local server environment (like Live Server with PHP, XAMPP, or WAMP) to test the email functionality.

    Open index.html in your browser. (or use VS Code Live Server).

👤 Author

Developed by 0xBlkswn – https://www.linkedin.com/in/bernardolintz | bernardolintz@hotmail.com
