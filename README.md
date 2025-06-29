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
    # Google AI API Key (Required for AI features)
    GOOGLE_API_KEY=YOUR_GEMINI_API_KEY

    # PayPal configuration (Optional)
    NEXT_PUBLIC_PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
    NEXT_PUBLIC_PAYPAL_PLAN_ID=YOUR_PAYPAL_PLAN_ID

    # Admin credentials
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=password
    ```

#### Getting a Google AI API Key
The AI features of this application are powered by Google's Gemini models. You will need a free API key to enable them.
1.  Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Sign in with your Google account.
3.  Click **"Create API key in new project"**.
4.  Copy the generated API key.
5.  Paste this key into your `.env` file as the value for `GOOGLE_API_KEY`.

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
5.  Before deploying, expand the **"Environment Variables"** section. This is a critical step.
6.  You must add all the variables from your `.env` file here.
    - `GOOGLE_API_KEY` (Required)
    - `ADMIN_EMAIL`
    - `ADMIN_PASSWORD`
    - `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (If using PayPal)
    - `NEXT_PUBLIC_PAYPAL_PLAN_ID` (If using PayPal)
7.  Click the **"Deploy"** button.

That's it! Vercel will start building and deploying your site. This process can take a few minutes. You can watch the progress on your Vercel dashboard. Once it's finished, you'll get a live URL to your new ChatGPT Pro application. If you push new changes to your GitHub repository in the future, Vercel will automatically redeploy the site with the updates.

**Troubleshooting Vercel Deployments**

If your deployment fails on Vercel, don't worry. Here's what to do:
1.  **Check the Logs:** On your Vercel project dashboard, go to the "Deployments" tab and click on the failed deployment. You'll see logs that can help identify the issue.
2.  **Communicate with the AI:** If you're working with an AI assistant like Firebase Studio's App Prototyper, paste the error logs into the chat. The AI can analyze them and provide a fix.
3.  **Push the Fix:** Once the AI provides a code change, you'll need to push it to GitHub. Open your terminal in the project folder and run:
    ```bash
    git add .
    git commit -m "Applying AI fix for deployment"
    git push
    ```
4.  **Automatic Redeploy:** Vercel will automatically detect the `push` and start a new deployment with the fix.

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
