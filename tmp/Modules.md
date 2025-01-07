Chapter III - Mandatory Part

## 1. Overview

Thanks to your website, users will play Pong with others. You have to provide a nice user interface and real-time multiplayer online games!

- Your project needs to adhere to the following guidelines as a minimum requirement, contributing only a small portion to the final grade.
- The second part of this subject will offer additional modules that can replace or complete the following rules.

In this Subject, certain words are highlighted in green. These represent technology choices that will evolve over time. Pay close attention to the version of the subject.

---

## III.2. Minimal Technical Requirement

Your project has to comply with the following rules:

**INFORMATION:** Again, some of these constraints could be overridden by the choice of specific modules.

- You are free to develop the site, with or without a backend.
  - If you choose to include a backend, it must be written in pure Ruby. However, this requirement can be overridden by the Framework module.
  - If your backend or framework uses a database, you must follow the constraints of the Database module.
- The frontend should be developed using pure vanilla JavaScript. However, this requirement can be altered through the FrontEnd module.
- Your website must be a single-page application. The user should be able to use the Back and Forward buttons of the browser.
- Your website must be compatible with the latest stable up-to-date version of Google Chrome.
- The user should encounter no unhandled errors and no warnings when browsing the website.
- Everything must be launched with a single command line to run an autonomous container provided by Docker. Example: `docker-compose up --build`.

**WARNING:** If your container solution is Docker:

- When your computers in clusters run under Linux, you will use Docker in rootless mode for security reasons. This comes with two sideways:
  - Your Docker runtime files must be located in `/goinfre` or `/sgoinfre`.
  - You can’t use so-called "bind-mount volumes" between the host and the container if non-root UIDs are used in the container.
  
Several fallbacks exist depending on the project, your situation, and the context: Docker in a VM, rebuild your container after changes, or craft your own Docker image with root as the unique UID.

---

## III.3. Game

The main purpose of this website is to play Pong versus other players.

- Users must have the ability to participate in a live Pong game against another player directly on the website. Both players will use the same keyboard. The Remote players module can enhance this functionality with remote players.
- A player must be able to play against another player, but it should also be possible to propose a tournament. This tournament will consist of multiple players who can take turns playing against each other. You have flexibility in how you implement the tournament, but it must clearly display who is playing against whom and the order of the players.
- A registration system is required: at the start of a tournament, each player must input their alias name. The aliases will be reset when a new tournament begins. However, this requirement can be modified using the Standard User Management module.
- There must be a matchmaking system: the tournament system organizes the matchmaking of the participants and announces the next fight.
- All players must adhere to the same rules, which include having identical paddle speed. This requirement also applies when using AI; the AI must exhibit the same speed as a regular player.
- The game itself must be developed in accordance with the default frontend constraints (as outlined above), or you may choose to utilize the FrontEnd module, or you have the option to override it with the Graphics module. While the visual aesthetics can vary, it must still capture the essence of the original Pong (1972).

**WARNING:**

- The use of libraries or tools that provide an immediate and complete solution for a global feature or a module is prohibited.
- Any direct instruction about the usage (can, must, can’t) of a third-party library or tool must be followed.
- The use of a small library or tool that solves a simple and unique task, representing a subcomponent of a global feature or module, is allowed.
- During the evaluation, the team will justify any usage of a library or tool that is not explicitly approved by the subject and that is not in contradiction with the constraints of the subject.
- During the evaluation, the evaluator will define if the usage of a specific library or tool is legitimate (and allowed) or almost solving an entire feature or module (and prohibited).

---

## III.4. Security Concerns

To create a basic functional website, here are a few security concerns that you have to tackle:

- Any password stored in your database, if applicable, must be hashed.
- Your website must be protected against SQL injections/XSS.
- If you have a backend or any other features, it is mandatory to enable an HTTPS connection for all aspects (Utilize `wss` instead of `ws`).
- You must implement some form of validation for forms and any user input, either within the base page if no backend is used or on the server side if a backend is employed.
- Regardless of whether you choose to implement the JWT Security module with 2FA, it’s crucial to prioritize the security of your website. For instance, if you opt to create an API, ensure your routes are protected. Remember, even if you decide not to use JWT tokens, securing the site remains essential.

**WARNING:**

- Use a strong password hashing algorithm.
- For security reasons, any credentials, API keys, and environment variables must be saved locally in a `.env` file and ignored by Git. Publicly stored credentials will result in project failure.

---

## Chapter IV - Modules

With 25% of the project completed, you’re encouraged to implement additional modules to achieve 100%. A minimum of seven major modules is required for full completion.

### IV.1. Web

- **Major Module:** Use a Framework to build the backend (e.g., Django).
- **Minor Module:** Use a framework or toolkit (e.g., Bootstrap) for the frontend.
- **Minor Module:** Use PostgreSQL as the backend database.
- **Major Module:** Store tournament scores on the Ethereum blockchain using Solidity smart contracts.

### IV.2. User Management

- **Major Module:** Standard user management with secure authentication, profiles, avatars, stats, and matchmaking.
- **Major Module:** OAuth 2.0 authentication with 42 integration.

### IV.3. Gameplay and User Experience

- **Major Module:** Enable remote multiplayer functionality.
- **Major Module:** Introduce multiplayer mode with more than two players.
- **Major Module:** Add another game to the platform with user history tracking and matchmaking.
- **Minor Module:** Provide customization options for gameplay.
- **Major Module:** Develop a live chat feature with messaging, blocking, and game invites.

### IV.4. AI and Statistics

- **Major Module:** Create an AI opponent without using A* algorithms.
- **Minor Module:** Introduce user and game statistics dashboards.

### IV.5. Cybersecurity

- **Major Module:** Implement WAF/ModSecurity with hardened configuration and integrate HashiCorp Vault for secrets management.
- **Minor Module:** Achieve GDPR compliance through user anonymization and data deletion features.
- **Major Module:** Add two-factor authentication (2FA) with JWT security.

### IV.6. DevOps

- **Major Module:** Set up ELK stack (Elasticsearch, Logstash, Kibana) for log management.
- **Minor Module:** Integrate Prometheus and Grafana for monitoring.
- **Major Module:** Design backend architecture using microservices.

### IV.7. Graphics and Accessibility

- **Major Module:** Implement advanced 3D graphics using Three.js/WebGL.
- **Minor Modules:** Ensure support for all devices, expand browser compatibility, add multi-language support, improve accessibility for visually impaired users, and integrate server-side rendering (SSR).

### IV.8. Server-Side Pong

- **Major Module:** Replace basic Pong with a server-side version and implement an API.
- **Major Module:** Enable CLI-based gameplay for web interaction through API integration.

Refer to the project documentation for additional details and constraints for each module.
