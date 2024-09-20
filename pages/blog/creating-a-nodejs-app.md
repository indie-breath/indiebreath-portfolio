---
title: Creating a NodeJS App
date: 2024-09-06
author: indiebreath
---

[Back home](/)

# Creating a Simple NodeJS + Express App

NodeJS is one of the most popular pieces of software used in the web development scene. It is a core component of many tech stacks, including the one I use for this website. This is likely due to it working with JavaScript, one of the most commonly used languages out there, and the one that gives the internet its interactivity.

Because of all of this, alongside a variety of wants to avoid overcomplicating things and to use the simplist tools available, I chose to write my website using NodeJS and Express as the main "backend" components. This blog post will both explain a lot of my thought processes regarding my choice to use these tools and not a framework such as React or VueJS (which I used for an early prototype for this website).

For me, I am doing all of this in an Arch Linux install, but all of the commands should work on whatever operating system you are using. I will also assume that you have Node and npm already installed on your device. If you don't, installation instructions can easily be found on their respective websites.

## Making a New Project

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

![A blank page showing "Hello World!" in the corner.](/public/images/nodejs-blog/nodejs-image-1.jpg)

Additionally, because we are using nodemon, we can simply type "rs" in our terminal to reload the web server instead of having to type Ctrl+c then rerun the start command.

## Creating an Actual Web Page

Now that we have made the obligatory "Hello World!", we can move on to creating a proper web page. We'll start by making a few changes to our index.js file, adding a couple of static files and changing our index router to point to a web page.

```
const express = require("express");
const app = express();
const router = express.Router();

const port = 8080;

app.use("/", express.static(__dirname + "/pages"));
app.use("/public", express.static(__dirname = "/public"));

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
});

app.use("/", router);

app.listen(port, () => {
    console.log("App is running and listening on port " + port);
});
```

These changes have added a new component to our index.js file, the Express Router, which we replace the app.get() function with. Prior to that, we use two instances of express.static() in order to add pages and public folders to our app, allowing them to be accessible by the html files we're about to create.

Finally, we add an "app.use("/", router);" to just before our listen function, which will tell our app to use our Express Router instance for routing instead of the app instance's regular routing.

Now we need to make these static folders, alongside our index.html and css files. These can be done in the command line like so, or through your text editor/file explorer's file tree.

```
mkdir -p ./public/css
mkdir -p ./public/images
mkdir -p ./pages
```

We'll also create an index.html file in the pages folder, which is what will be referenced by the router.get() function in our index.js.

In our index.html file we'll add some basic HTML, another simple Hello World implementation.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylehseet" href="/public/css/index.css" />
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>Welcome to my web page running on NodeJS!</p>
  </body>
</html>
```

Now if we reload our web server by typing "rs" in the terminal that is running our nodemon, then reload our web page, we should see something similar to this:

![A blank web page except for a Hello World! header and a small welcome paragraph](/public/images/nodejs-blog/nodejs-image-2.jpg)

But this still needs some styling, we can do by adding a css file to our /public/css folder, making sure to use index.css as the name as we have already referenced that name in our html file. We'll just do some simple styling, but you can do whatever you want in your index.css file.

```
html {
  font-family: sans-serif;
}

h1 {
  margin: 25px;
}

p {
  text-align: center;
}
```

Which produces the following page:

![A web page with sans-serif font, text in the middle of the screen, and indented header](/public/images/nodejs-blog/nodejs-image-3.jpg)

And with that, we have created a simple, example web page using NodeJS and Express. Of course, you can change the index.html and index.css files to be whatever you want them to be and produce whatever page you want, but these basics are enough to get started with a single page.


## Final Thoughts and Some Info

So, you might have noticed throughout this tutorial that we have not created something that actually requires NodeJS, we have simply created a static website. This will not change, as even now, my website (which you are currently on), does not actually require a web server.

But there is a very interesting reason as to why we are still using NodeJS, and that will become relevant when we get to the hosting section of this series. This is because later in this series, we'll be using Docker to self-host this, and the easiest way have have found to do this is by involving a tool like NodeJS (or a build tool) to provide a point of reference for the reverse proxy we will end up doing.

This may not be the only way, but it is the way I have been using, and it works for me, but we'll cross that bridge when we get to it.

Finally, what's the point of this whole blog and series? There are so many other blogs and tutorials online that will tell you these exact things, and probably do it better than me. I am simply doing this because in addition to wanting to put my own information out on the internet, I also want to talk about my journey in developing this website and the things and technologies that I have learned. Maybe by providing this information, someone wanting to do the same things that I have will more easily overcome the roadblocks I've encountered.

But with that, I hope that this was informative for you, and I hope to see you in the next post, detailing the next part of my development journey.
