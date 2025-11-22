# 🏠 Your Project Structure Explained (Simple Version)

Imagine your website is like a big **House**. Here is how we organized the rooms and furniture so it doesn't get messy!

## 📂 `src/app` (The Doors 🚪)
This is where people enter your website.
- Each folder here is a "URL" or a "Page" (like `/about` or `/login`).
- **`page.tsx`**: This is the actual page people see.
- **`layout.tsx`**: This is the "frame" of the house that stays the same (like the roof and walls), usually holding the Header and Footer.

## 📂 `src/features` (The Rooms 🛋️)
This is where the *real* stuff lives. We group things by what they "do".
- **`landing`**: Everything for the Landing Page (Hero section, Features, etc.).
- **`auth`**: Everything for Logging in and Signing up.
- **Why?** So if you want to fix the "Login" page, you just go to the `auth` room. You don't have to search the whole house!

## 📂 `src/components` (The Furniture 🪑)
These are small pieces you use *everywhere*.
- **`ui`**: Small things like **Buttons**, **Inputs**, **Cards**. (Like Lego bricks).
- **`layout`**: Big pieces like the **Header** (Top menu) and **Footer** (Bottom menu).
- **Why?** If you change a Button here, it changes *everywhere* in the house.

## 📂 `src/lib` (The Toolbox 🧰)
This holds your tools and helpers.
- **`api`**: The phone you use to call the backend (Server).
- **`security`**: The locks and alarms to keep the house safe.
- **`utils.ts`**: Small handy tools (like a tape measure).

## 📂 `src/hooks` (The Superpowers ⚡)
These are special abilities your components can use.
- Example: "Check if user is scrolling", "Check if screen is mobile".

---

### 🚀 Summary
- **Want to change the text on the homepage?** 👉 Go to `src/features/landing/components`.
- **Want to change the color of ALL buttons?** 👉 Go to `src/components/ui/button.tsx`.
- **Want to add a new page?** 👉 Create a folder in `src/app`.
