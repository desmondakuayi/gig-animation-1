# Motion Canvas Animation Project

This repository contains the source code for our animations using [Motion Canvas](https://motioncanvas.io/).

## Prerequisites

* **Node.js:** Ensure you have Node.js (version 16 or later) installed.
* **Editor:** VS Code is recommended with the Motion Canvas extension.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/desmondakuayi/gig-animation-1.git
    cd <gig-animation-1>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Editor:**
    This will start the local server and open the preview in your browser.
    ```bash
    npm run serve
    ```

## Workflow

* **Edit:** Open `src/scenes/` to modify the animation code.
* **Preview:** Changes are reflected instantly in the browser at `http://localhost:9000`.
* **Scrub:** Use the browser timeline to debug specific frames.

## Exporting

To render the final video/frames:

```bash
npm run render
```

or render in the Motion Canvas online editor.
