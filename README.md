# ChatGPT Pro

This is a custom ChatGPT-like application built with Next.js, Genkit for AI, ShadCN for UI components, and configured for easy deployment.

## Getting Started (Local Development)

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn
- A GitHub account

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
    Create a `.env` file in the root of your project and add your API keys. You can use the `.env.example` file as a template if one exists.
    ```
    # PayPal configuration (Optional)
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

## Deployment

You can deploy this application to the internet for free. We recommend using Vercel for a seamless experience without requiring a credit card.

### Option 1: Vercel (Recommended Free Method)

Vercel is from the creators of Next.js and offers a fantastic free tier.

**Step 1: Push Your Code to GitHub**
- Create a new repository on your GitHub account.
- Follow the instructions on GitHub to push your local project code to the new repository.

**Step 2: Deploy with Vercel**
1.  Go to [Vercel.com](https://vercel.com) and sign up using your GitHub account.
2.  On your Vercel dashboard, click **"Add New... > Project"**.
3.  Find your GitHub repository in the list and click **"Import"**.
4.  Vercel will automatically detect that it's a Next.js project. You don't need to change any build settings.
5.  Before deploying, expand the **"Environment Variables"** section.
6.  Copy the variables from your local `.env` file (like `ADMIN_EMAIL` and `ADMIN_PASSWORD`) and add them to Vercel.
7.  Click the **"Deploy"** button.

That's it! Vercel will build and deploy your site, giving you a live URL.

### Option 2: Firebase App Hosting (Requires Billing Account)

This project is also configured for Firebase App Hosting. Note that this method **requires you to enable billing** on your Firebase project (although it has a free tier for usage).

**Step 1: Log in to Firebase**
```bash
firebase login
```

**Step 2: Initialize App Hosting**
This links your local code to your Firebase project. You only do this once.
```bash
firebase init apphosting
```
Follow the prompts to select your Firebase project and create a backend service.

**Step 3: Deploy Your App**
```bash
firebase deploy
```
This command will build and deploy your app. The CLI will provide the live URL when finished.
