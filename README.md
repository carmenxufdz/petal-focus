# Petal Focus

Petal Focus is a Sakura-themed Pomodoro desktop app designed in Figma and built with HTML, CSS, JavaScript, and Electron.
It helps you stay focused using the Pomodoro technique in a calm, minimal interface inspired by cherry blossoms.

## Design File

Figma design file for this project: https://www.figma.com/design/P26cUwlGGPQZfmGIHUKYc7/Petal-Focus?node-id=16-270&t=4Q8xb4pKLrF8puV7-1

## What's in this repo

| File / Folder | Purpose |
| --- | --- |
| `index.html` | The main HTML layout for the pomodoro UI |
| `styles.css` | All styles for the calendar interface |
| `script.js` | Frontend JavaScript controlling pomodoro logic |
| `main.js` | Electron main process — creates the desktop window and loads your UI |
| `package.json` | Project metadata & dependencies |
| `.gitignore` | Files and folders ignored by Git |
| `assets/` | Images, icons, and other static assets |
| `package-lock.json` | Auto-generated lock file for dependencies |

## How to use

### 1. Clone This Repo

```
git clone https://github.com/carmenxufdz/petal-focus.git
cd petal-focus
```

### 2. Install Node.js

Make sure you have Node.js installed, then run:

```
npm install
```

This installs Electron and any other modules required to run the app.

### 3. Run the App Locally

```
npm run start
```

This will open your Pomodoro App as a desktop application powered by Electron.

## Feedback & Contributions

If you find something confusing or want to suggest improvements, feel free to open an issue or submit a pull request!
