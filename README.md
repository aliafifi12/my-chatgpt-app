# ChatGPT Pro

This is a custom ChatGPT-like application built with Next.js, Genkit for AI, ShadCN for UI components, and Firebase for hosting.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Firebase and PayPal API keys. You can use the `.env.example` file as a template.
    ```
    # Firebase configuration (if needed)
    # NEXT_PUBLIC_FIREBASE_...

    # PayPal configuration
    NEXT_PUBLIC_PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
    NEXT_PUBLIC_PAYPAL_PLAN_ID=YOUR_PAYPAL_PLAN_ID

    # Admin credentials
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=password
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for easy deployment with **Firebase App Hosting**.

### Prerequisites

- A Firebase account and a new Firebase project.
- Firebase CLI installed globally: `npm install -g firebase-tools`

### Deployment Steps

1.  **Log in to Firebase:**
    ```bash
    firebase login
    ```

2.  **Initialize App Hosting in your project:**
    (You only need to do this once.)
    ```bash
    firebase init apphosting
    ```
    Follow the prompts, select your Firebase project, and choose a backend name (e.g., `chatgpt-pro-backend`).

3.  **Deploy your application:**
    ```bash
    firebase deploy
    ```

After the deployment is complete, the Firebase CLI will provide you with the URL to your live site (e.g., `https://your-project-id.web.app`).
