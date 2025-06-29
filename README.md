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

---

## Deployment to Firebase App Hosting

This project is configured for easy, one-command deployment with **Firebase App Hosting**, which provides a generous free tier. Follow these steps to get your app live on the internet.

### Prerequisites for Deployment

1.  **A Firebase Project:** You've already created one!
2.  **Firebase CLI:** You need to have the Firebase command-line tools installed. If you haven't installed them, open your terminal and run this command:
    ```bash
    npm install -g firebase-tools
    ```

### Step-by-Step Deployment Guide

**Step 1: Log in to Firebase**

First, you need to log into your Firebase account from the terminal. Run this command, and it will open a browser window for you to sign in.

```bash
firebase login
```

**Step 2: Initialize App Hosting**

Now, you need to link your local project code to the Firebase project you created online. You only need to do this **once** for your project.

In your project's root directory, run:

```bash
firebase init apphosting
```

The command will guide you through a few questions:
*   It will ask you to **select the Firebase project** you want to use. Choose the one you just created from the list.
*   It will ask you to **create a backend**. This is the server environment where your app will run. Give it a name (e.g., `chatgpt-pro-backend`). The name is just for your reference.

This process creates `firebase.json` and `.firebaserc` files, which tell Firebase how to deploy your app.

**Step 3: Deploy Your App!**

This is the final step. To build your app and send it to Firebase to be published, run this single command:

```bash
firebase deploy
```

This process might take a few minutes. The terminal will show you the progress.

### You're Live!

Once the deployment is complete, the Firebase CLI will print the URL to your live site, which will look something like this: `https://your-project-id.web.app`.

You can visit this URL to see your ChatGPT Pro application live on the internet! You can also find this URL in your Firebase Console under the "App Hosting" section.
