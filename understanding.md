# The Plain English Guide to Your Portfolio Website 🚀

Hey! If you ever wanted a 100% normal, human explanation of **how your website works**, **what tools were used**, and **what each section is doing** without all the confusing computer science jargon, this guide is for you.

Think of this as the "behind-the-scenes tour" of your own website!

---

## 🧭 Quick Table of Contents

1. [The Big Picture: What is this site?](#-the-big-picture-what-is-this-site)
2. [The Tech Stack (Explained like we're chatting over coffee)](#-the-tech-stack-explained-in-plain-english)
   - [The Building Blocks (Frontend)](#1-the-building-blocks-frontend)
   - [The Looks & Colors (Styling)](#2-the-looks--colors-styling)
   - [The Movement & Magic (Animations)](#3-the-movement--magic-animations)
   - [The Postman (Backend & Email)](#4-the-postman-backend--email)
3. [Section-by-Section: What's on the screen & why it's cool](#-section-by-section-whats-on-the-screen)
   - [0. The Quick Intro Loader](#0-the-quick-intro-loader)
   - [1. The Reading Progress Bar](#1-the-reading-progress-bar-at-the-very-top)
   - [2. The Navigation Bar & Theme Switch](#2-the-top-nav-bar--darklight-mode)
   - [3. The Custom Mouse Cursor](#3-the-custom-mouse-cursor)
   - [4. The Hero Section (The Big Opening)](#4-the-hero-section-the-big-opening)
   - [5. The Rolling Tech Ticker](#5-the-rolling-tech-ticker)
   - [6. Featured Projects Showcase](#6-featured-projects-showcase)
   - [7. The Interactive Skill Orbit (The Solar System)](#7-the-interactive-skill-orbit-the-solar-system)
   - [8. The Learning Roadmap (The Flowchart)](#8-the-learning-roadmap-the-flowchart)
   - [9. About Me & Speedometer Numbers](#9-about-me--speedometer-numbers)
   - [10. Current Milestones & Goals](#10-current-milestones--goals)
   - [11. The Journey Timeline](#11-the-journey-timeline)
   - [12. The Contact Form & Footer](#12-the-contact-form--footer)
4. [How Someone's Message Actually Reaches Your Inbox](#-how-messages-reach-your-email)
5. [The "Where Do I Change Stuff?" Cheat Sheet](#-where-do-i-change-stuff-cheat-sheet)
6. [How to Run Your Website on Your Laptop](#-how-to-run-your-website-on-your-laptop)

---

## 🌟 The Big Picture: What is this site?

This is your **personal software engineering portfolio**. 

Its main job is to introduce you (**Nawanshu**), show people that you know your stuff (from low-level languages like C and C++ to modern web dev like React), showcase your best projects, and give recruiters or clients an easy way to message you.

Instead of looking like a generic template, it's designed with an **editorial, dark, premium aesthetic** (inspired by sleek modern tech companies like ElevenLabs). It feels snappy, interactive, and high-end.

---

## ☕ The Tech Stack (Explained in Plain English)

Here is every main technology used, explained with real-world analogies:

### 1. The Building Blocks (Frontend)

* **React 19 (The LEGO Bricks):**
  Instead of writing one giant 2,000-line messy HTML file, React lets us build the website like LEGO sets. We have a brick for the `Navbar`, a brick for the `Projects`, and a brick for the `Contact` form. If you want to change the contact form, you only touch that one piece.

* **TypeScript (The Spell-Checker for Code):**
  Regular JavaScript lets you make silly mistakes (like forgetting a project description or misspelling a word), and it only crashes when a user visits the site. TypeScript is like a strict spell-checker that highlights errors in red before you even run the code.

* **Vite (The Turbocharged Engine):**
  This is the tool that runs your website on your computer while you work. Older tools took 15 to 30 seconds to reload every time you changed a line of code. Vite does it in less than a blink of an eye (under 50 milliseconds).

---

### 2. The Looks & Colors (Styling)

* **Tailwind CSS (The Paintbox):**
  Instead of writing old-school CSS stylesheets with complicated rules, Tailwind gives us simple pre-made styling tags. Want rounded corners? Add `rounded-xl`. Want 20px padding? Add `p-5`. It keeps everything neat and consistent.

* **The Color Palette:**
  * **Deep Charcoal / Black:** The main background canvas that gives it that cool, hacker-lab vibe.
  * **Ember Orange (`#d9663d`):** The signature warm accent color used for glow effects, buttons, and highlights.
  * **Pastel Glow Blooms:** Soft mint, peach, lavender, and sky-blue glowing orbs in the background that make the page feel rich instead of flat.

* **The 3 Fonts:**
  1. **EB Garamond (Editorial Serif):** Used for large titles. It looks like a high-end print magazine or luxury book.
  2. **Inter (Clean Sans-Serif):** Used for normal paragraphs and buttons so everything is super easy to read.
  3. **JetBrains Mono (Hacker Font):** Used for code snippets, tech tags, and the mini terminal.

---

### 3. The Movement & Magic (Animations)

* **Framer Motion (The Animator):**
  This is the powerhouse behind all the animations. It makes cards gently fade in when you scroll down, makes the 3D card tilt with your mouse, and makes the buttons spring back when you let go.

* **Lenis (The Butter Scroll):**
  Have you ever scrolled on a website where it feels like you're jumping line-by-line? Lenis fixes that. It intercepts your mouse wheel and turns it into a silky, gliding glide—like sliding on smooth ice.

---

### 4. The Postman (Backend & Email)

* **Node.js + Express (The Secret Helper):**
  This is a small background program that runs quietly. While the frontend is what people *see*, Express is what receives form submissions and talks to the email system.

* **Nodemailer (The Digital Mailman):**
  When someone types their name and message on your website and clicks "Send", Nodemailer logs into a secure Gmail service behind the scenes, wraps their message into an email, and sends it directly to your personal inbox (`nawanshusharma05@gmail.com`).

---

## 🔍 Section-by-Section: What's on the screen?

Let's walk down the page from the very top to the bottom!

---

### 0. The Quick Intro Loader
* **What you see:** When you first load the page, a clean screen appears for less than a second with your name **"Nawanshu"** and a smooth moving bar.
* **Why it's there:** It prevents any ugly "flickering" while your custom fonts and pictures are loading into the browser, then fades away gracefully.

---

### 1. The Reading Progress Bar (At the very top)
* **What you see:** A super-thin 2-pixel orange line stuck to the very top edge of your browser window.
* **What it does:** As you scroll down the page, this line stretches from left to right. When you reach the bottom, it's 100% full. It's a quick visual clue showing how much of the page is left.

---

### 2. The Top Nav Bar & Dark/Light Mode
* **What you see:**
  * Your name on the left with a little green pulsing dot (meaning *"Hey, I'm active and open for opportunities!"*).
  * Quick jump links (*Projects, Stack, Skills, About, Goals, Journey*).
  * A **Sun / Moon button** on the right.
* **What's cool about it:**
  * As you scroll, it automatically figures out which section you're currently reading and highlights that link.
  * Clicking the Sun/Moon button flips between the default **Sleek Black theme** and an **Editorial Paper-White theme**. It even saves your choice in your browser so it remembers next time!
  * On a smartphone, it transforms into an animated slide-out menu.

---

### 3. The Custom Mouse Cursor
* **What you see:** On computers, instead of the default boring Windows arrow cursor, you see a small glowing orange dot with a circular ring floating behind it.
* **What's cool about it:**
  * When you move your mouse, the circle lags slightly behind with realistic physics.
  * When you hover over a button or project card, the ring expands like a bullseye target!
  * When you click down, it pinches tight.
  * If someone visits on an iPhone, Android, or touchscreen tablet, it automatically turns off so it doesn't get in the way.

---

### 4. The Hero Section (The Big Opening)
* **Left Side (Your Elevator Pitch):**
  * A badge saying you're open to software roles & internships.
  * The main headline: *"I engineer software from low-level systems to the interface."*
  * A clear paragraph explaining that you don't just build surface-level web pages—you understand code from the metal up (C, C++, Python, DSA).
  * Direct buttons to see your work, jump to the contact form, or open your GitHub and LinkedIn.
  * **The Mini Terminal Box:** Below the buttons, there's a dark terminal box that automatically runs developer commands every few seconds (like booting the system and checking your tech stack) with a pulsing cursor.
* **Right Side (The 3D Interactive Card):**
  * A box that looks like a high-tech computer chip or synthesizer chassis.
  * **Move your mouse over it:** The card tilts in 3D following your hand, just like tilting a shiny sports card in the light!
  * Inside the card are live audio equalizer bars that bounce up and down like soundwaves.

---

### 5. The Rolling Tech Ticker
* **What you see:** An infinite moving banner rolling from right to left with pills for all the languages and tools you use (Python, C++, C, DSA, JavaScript, React, Git, SQL, etc.).
* **What's cool about it:** The edges fade out softly into the background. If you hover your mouse over any pill, the ticker pauses so you can take a look!

---

### 6. Featured Projects Showcase
* **What you see:** 3 polished project cards:
  1. **Virtual Voice Assistant:** Your desktop voice command tool written in Python.
  2. **Python Music Player:** Your terminal audio player built with Pygame.
  3. **Netflix Clone:** Your responsive web clone recreating the Netflix interface.
* **What's cool about it:**
  * Each card has a crisp preview image that gently zooms in when you hover over it.
  * Clear tags showing what tech was used.
  * Direct clickable buttons to view the **Live Website** (for the Netflix clone) and the **GitHub Source Code** so anyone can see your code.

---

### 7. The Interactive Skill Orbit (The Solar System)
* **What you see:** An interactive orbital ring system!
  * In the center is a glowing badge: **"Core Engineer · BCA Student"**.
  * Orbiting around it in an oval are 8 circular planets representing your skills: **Python, C++, DSA, C, JavaScript, React, Git, and DBMS**.
* **What's cool about it:**
  * They actually rotate around you in real time!
  * Hover over any planet to pause the movement.
  * Click on any planet, and a detail card pops up underneath telling you how experienced you are in that tool and what you use it for.
  * There's also a pause/play button if someone prefers the planets to stay still.

---

### 8. The Learning Roadmap (The Flowchart)
* **What you see:** A visual family tree / flowchart of your entire computer science education.
  * **The Main Trunk:** Computer Applications Core.
  * **4 Main Branches:** Languages, Web Development, Core Computer Science, and Tools.
  * **Individual Skills:** C, C++, Python, JavaScript, HTML, CSS, DSA, OOP, Problem Solving, DBMS, Git, GitHub, VS Code.
* **What's cool about it:**
  * **Real Connected Lines:** There are actual curved lines drawn between the boxes.
  * **Path Lighting:** Hover your mouse over any skill, and the line connecting all the way back to the root lights up!
  * **Status Tags:** Shows whether a skill is already **Learned** (green checkmark) or currently **In-Progress** (orange clock).
  * **Click to Inspect:** Click any skill box to pop open a list of every specific topic you know inside that subject (like *Pointers & Memory*, *Time Complexity*, or *Async/Await*).

---

### 9. About Me & Speedometer Numbers
* **What you see:** A clean story about who you are, what you're studying in college, and your mindset.
* **The Cool Numbers:**
  * **3** Projects featured
  * **5** Current goals
  * **4** Skill areas
* **What's cool about it:** The numbers don't just sit there. When you scroll to this section, they rapidly count up from 0 to their final number like a car's digital speedometer!

---

### 10. Current Milestones & Goals
* **What you see:** Cards showing what you are actively working on next (like mastering Data Structures & Algorithms, building larger projects, and getting ready for internships).
* **What's cool about it:** The most important goal (*"Strengthen DSA Skills"*) is styled in dark mode with a special "Active Focus" badge to catch the eye first.

---

### 11. The Journey Timeline
* **What you see:** A clean vertical timeline showing where you started and where you're heading (Starting BCA -> Mastering C/C++/Python/DSA -> Building Real Projects -> Getting Internship Ready).
* **What's cool about it:** As you scroll your mouse down, the vertical line physically draws itself downward, lighting up the checkpoint circles one by one as you reach them.

---

### 12. The Contact Form & Footer
* **Left Column:** Direct cards with your real email (`nawanshusharma05@gmail.com`), phone number (`+91 9315024765`), location (`India`), and a button to view your resume.
* **Right Column (The Working Form):**
  * Inputs for Name, Email, Phone, and Message.
  * When you click "Send Message", a spinner spins while sending.
  * Once sent, the form disappears and shows a friendly green checkmark: *"Message Sent! Thank you for reaching out."*
  * **Safety Net:** If your backend server happens to be asleep (common on free hosting platforms), it immediately shows a friendly message with a one-click button to open your visitor's email app so their message never gets lost!
* **Footer:** Closing note with copyright, local time, and quick links to jump back to any section.

---

## 📬 How Messages Reach Your Email

Ever wonder what happens the second a visitor hits "Send"? Here is the journey:

1. **Visitor clicks "Send Message"** on your website.
2. The form checks: *Did they write a name? Is the email real? Did they type a message?*
3. The website sends the data to your backend server (`/api/contact`).
4. **Nodemailer** takes the info, connects securely to your Gmail using an encrypted key, and crafts a formatted email.
5. **Boom!** A notification pops up on your phone from Gmail:
   > *"New Portfolio Message from [Visitor Name]: [Their message]"*
6. The website screen switches to a green checkmark saying "Message Sent!".

---

## 📝 Where Do I Change Stuff? (Cheat Sheet)

If you ever want to update your portfolio, you don't have to go hunting through 20 different code files. Almost everything is in one single file!

### 1. Change Projects, Skills, Goals, or Numbers:
Open this file:
👉 **`src/data/portfolio.ts`**
* To add a project: Add it to the `projects` list (title, image link, GitHub link, description).
* To add a new skill: Add it to the `skillCategories` list.
* To update your goals: Edit the `goals` list.
* To change the stats: Edit the `stats` list (e.g. change 3 projects to 5 projects).

### 2. Change Your Email, Phone, or Resume:
Open this file:
👉 **`src/components/Contact.tsx`**
* Search for `nawanshusharma05@gmail.com` or your phone number and change it right there.

---

## 💻 How to Run Your Website on Your Laptop

Whenever you want to start up your website on your computer to see it live:

1. Open your terminal in this folder (`a:\Portfolio`).
2. Run this single command:
   ```bash
   npm run dev
   ```
3. Open your browser and go to:
   👉 `http://localhost:5173`

Any time you change a word in the code and press Save (`Ctrl + S`), your browser will update instantly without you even having to refresh!

---

*That's the entire website! Simple, powerful, beautiful, and completely built to help you stand out as a software engineer.*
