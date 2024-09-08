---
title: Creating a NodeJS App
date: 2024-09-06
author: indiebreath
---

# Creating a Simple NodeJS + Express App

NodeJS is one of the most popular pieces of software used in the web development scene. It is a core component of many tech stacks, including the one I use for this website. This is likely due to it working with JavaScript, one of the most commonly used languages out there, and the one that gives the internet its interactivity.

Because of all of this, alongside a variety of wants to avoid overcomplicating things and to use the simplist tools available, I chose to write my website using NodeJS and Express as the main "backend" components. This blog post will both explain a lot of my thought processes regarding my choice to use these tools and not a framework such as React or VueJS (which I used for an early prototype for this website).

For me, I am doing all of this in an Arch Linux install, but all of the commands should work on whatever operating system you are using. I will also assume that you have Node and npm already installed on your device. If you don't, installation instructions can easily be found on their respective websites.

### Making a New Project

Let's start by creating a new folder for this project. Either open a terminal, or your file explorer, and create a new folder in your location of choice. For me, it's in a dedicated Software folder within my Documents folder.

```
mkdir -p ~/Documents/Software/nodejs-app
cd ~/Documents/Software/nodejs-app
```

Now open the folder in your text editor of choice, in my case, Neovim. You should have a blank folder with no files or sub-folders.

In this folder, run the following command to initialise a project.

```
npm init -y
```

The -y flag is optional, but I am using it here to automatically reply "yes" to all of the questions that it will ask. This mostly involves things like names, entrypoint, and version, which are not things that are particularly relevant to this tutorial/blog post.

This command creates a package.json file that look something like this:

```
{
  "name": "nodejs-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

There aren't any necessary changes we need to make to this file, but for help with things that will be described in future blog posts, we'll add two knew scripts to to the scripts section.

```
{
  "name": "nodejs-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

This adds a pair of commands that we can run in the terminal, "npm run dev", which will run the web server using nodemon (which we will install in a minute), and "npm run start", which will run the web server with the regular node command, a small seperation that will be important for later.

Now we need to install our two depencies, ExpressJS, which is a hard dependency for this project, and nodemon, which is a tool I'll be using for easy testing, but don't plan on using in the actual production environment. We'll do this by running the following command in our terminal that is in our project's folder.

```
npm install express nodemon
```

Now we can create our index.js file, which will be the entry point for our website. In this index.js file, we will add the following code:

```
const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("App is running and listening on port " + port);
});
```

This is a simple "Hello World" program using Express. With this code in place, we can open our terminal and run "npm run dev" to start this app using nodemon. Then, if we go to "localhost:8080" in our web browser, we should see a simple page like this:

![A blank page showing "Hello World!" in the corner.](/public/images/nodejs-image-1.jpg)

Additionally, because we are using nodemon, we can simply type "rs" in our terminal to reload the web server instead of having to type Ctrl+c then rerun the start command.
