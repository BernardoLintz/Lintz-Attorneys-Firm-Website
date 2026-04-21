⚖️ Lintz Attorneys Firm Website

A high-standard institutional website developed for Lintz Advogados, an international law firm. This project was built with a focus on minimalist aesthetics (Apple-style), optimized performance, and a hardened security architecture.

🚀 Live Demo: https://lintzadv.com.br/

🛠️ Technologies & Tools

    Frontend: HTML5, Tailwind CSS (Mobile First approach).

    Interactivity: Vanilla JavaScript (ES6+).

    Backend/Bridge: PHP 8.x for secure API routing and server-side logic.

    Animations: AOS.js (Animate On Scroll) and custom dynamic Mouse-track Parallax.

    Communication: Integrated with EmailJS REST API via a secure server-side proxy.

💎 Project Highlights

🖥️ Desktop Experience (UX/UI)

    Dynamic Parallax: Implementation of visual depth in the Hero section, where the background reacts smoothly to mouse movement.

    Minimalist Design: Clean interface, strategic use of white space, and modern typography (Plus Jakarta Sans).

📱 Mobile & Tablet Optimization

    Performance Tuning: Disabled heavy animations and mouse interactions on touch devices to ensure fluidity and battery saving.

    Smart Framing: Dynamic zoom adjustment for the Rio de Janeiro background image, ensuring key landmarks remain visible on vertical screens.

🛡️ Security Considerations (Cybersecurity Mindset)

As a Cybersecurity analyst, I evolved the project from a standard client-side integration to a robust multi-layer security architecture to protect sensitive data and service integrity:

1. Backend Proxy & Credential Masking

Instead of exposing API configurations in the frontend, I implemented a PHP Proxy Layer.

    Private Key Protection: The EmailJS Private Key is stored strictly on the server-side, making it invisible to end-users and malicious actors.

    Sensitive Data Isolation: All critical logic and API keys are decoupled from the client-side code, preventing credential harvesting.

2. Advanced Bot Defense (Honeypot & Rate Limiting)

    Invisible Honeypot: Implemented a silent trap for bots that identifies automated submissions without impacting user experience or accessibility.

    Server-Side Rate Limiting: Integrated a PHP session-based limiter to prevent inbox flooding and DoS attempts (restricted to 3 requests per 10 minutes).

3. Multi-Stage Input Sanitization

To mitigate Cross-Site Scripting (XSS) and Injection attacks:

    Frontend Defense: Regex validation and HTML5 sanitization for immediate feedback.

    Backend Defense: The PHP layer utilizes filter_var() with strict sanitization filters to neutralize payloads that might bypass frontend checks.

4. Server-Hardening & Security Headers

    Content Security Policy (CSP): Implemented a strict CSP header to whitelist only trusted scripts and styles (Google Fonts, EmailJS, AOS), effectively killing unauthorized script injections.

    CORS Policy: Strict Access-Control-Allow-Origin headers to ensure the backend only accepts requests from the official domain.

    Header Hardening: Configured X-Content-Type-Options: nosniff and X-Frame-Options: DENY (with CSP frame-ancestors) to prevent clickjacking and MIME-sniffing.

📂 How to run this project locally

    Clone the repository:
    Bash

    git clone https://github.com/BernardoLintz/Lintz-Attorneys-Firm-Website.git

    Server Environment: Since the contact form now uses PHP for security, you will need a local server environment (like Live Server with PHP, XAMPP, or WAMP) to test the email functionality.

    Open index.html in your browser. (or use VS Code Live Server).

👤 Author

Developed by 0xBlkswn – https://www.linkedin.com/in/bernardolintz | bernardolintz@hotmail.com
