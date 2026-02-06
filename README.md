# Identity & User Management Dashboard

A powerful, centralized **Identity Provider (IdP)** hub built with **React + Vite**. This application is designed to be the administrative core of a microservices architecture, managing everything from user identities to API inventories and security credentials.



## 🌐 Ecosystem Integration

This dashboard is the frontend layer of a robust security ecosystem. It works in conjunction with:

* **[Auth Service (Backend)](https://github.com/JAreyes98/auth-service.git):** The core logic for authentication, JWT generation, and RabbitMQ auditing.
* **[API Gateway](https://github.com/JAreyes98/api-gateway.git):** The entry point that uses this dashboard for centralized login and route protection.

## 🌟 Overview

This dashboard is not just a user manager; it is an **Authentication Gateway**. It provides a centralized UI to handle security configurations that can be consumed by the Gateway or individual microservices.

### Key Modules
* **User Management:** Full control over user lifecycles.
* **App Credentials:** Manage Client IDs and Secrets for internal/external application access.
* **APIs Inventory:** A centralized registry of your backend services (In development).
* **Roles Manager (RBAC):** Define granular Role-Based Access Control to secure your ecosystem.

---

## 🛡️ API Gateway Flow

This project is built to act as the "Security Brain" for your infrastructure. 

**The Redirect Mechanism:**
You can integrate this dashboard into your [API Gateway](https://github.com/JAreyes98/api-gateway.git) using a redirection flow:
1.  **Intercept:** The Gateway detects an unauthenticated request to any microservice.
2.  **Redirect:** The user is sent to this Dashboard's login page.
3.  **Authenticate:** After successful login via the [Auth Service](https://github.com/JAreyes98/auth-service.git), the session is processed.
4.  **Callback:** The dashboard redirects the user back to their original `HOME_URL` with a valid session token.



---

## ⚙️ Configuration

The application uses environment variables for easy deployment across different environments.

### Local Development
1. Create a `.env` file in the root directory.
2. Define the following parameter:
   ```env
   VITE_API_BASE_URL=http://localhost:8083/api/v1