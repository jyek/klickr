# Table of Contents  
[What is Klickr.io?](#klickrio)  
[Is Klickr.io live?](#link)  
[Screenshots](#screenshots)  
[Description of Tech Stack](#techstack)  
[Technical Challenges](#challenges)  
[Roadmap for Codebase](#roadmap)   

# <a name="klickrio"/> What is Klickr.io?
By following the age-old mantra of "a picture speaks a thousand words," Klickr.io 
allows users to create short tutorial-style snippets of web content (or "Klickrs")
that they can share with their friends and family. An example of where Klickr.io 
fits in is if you've ever tried teaching someone how to complete a task online.
The problem Klickr.io is trying to solve centers on the difficulty that exists when
trying to verbally explain even the simplest online tasks. Instead, Klickr.io believes
that allowing people to "show" what they mean will make the web an easier place to navigate.

Klickr.io offers an effortless way to record your explanation and share that snippet with
your friend so that they can replay it on any Chrome browser. Instead of a video, our Klickr's
are personalized in-site playbacks on another user's browser.


# <a name="link"/> Is Klickr.io live?
Yes we are! Please visit our site at [Klickr.io](https://www.klickr.io)

# <a name="screenshots"/> Screenshots
## Home page
- screenshot of homepage

## Gallery page
- gallery page

## Download page
- download page
(Wait till after refactor)

# <a name="techstack"/> Description of Tech Stack
Klickr.io uses a MEAN stack for its front- and back-end. In addition, the chrome browser
plugin is another front-end component built in Angular and it represents the primary
mechanism in which users will interact with the product.

# <a name="challenges"/> Technical Challenges
One of the initial hurdles was learning the Chrome Extension API to build a browser plugin.
Outside of simply being a new technology we haven't dealt with previously, the Chrome API
is unique in that it provides a completely different execution context for our JavaScript code.
This is an advantage because we know that scripts that run on the DOM for any website will not
be able to interact with our plugin's code. However, the challenging aspect is that we still
needed a mechanism for our plugin's code to communicate with the DOM, and the mechanism
provided is message passing between the contexts. 

A related challenge was when our team tackled solving multi-page recording. The reason this proved
challenging was because our approach to solving multi-page was to "stitch" together several
single page Klickr's. However, with every page click, a new DOM environment was created which
meant that any recorded information up until the new page would be lost unless we sent it
to our Chrome extension. Coupled with sending information to the Chrome extension was the
difficulty in accurately detecting when the new page has fully loaded before beginning a new 
page's recording.

Outside of challenges related to message passing, we also had to deal with the reality that
a user's Klickr is specific to the dimensions of their monitor. Therefore, for someone
viewing another person's Klickr, we had to capture information about screen sizes so that
we could scale the dimensions of the playback for any viewer.

[INSERT CHALLENGE FOR RECORDING]

[INSERT CHALLENGE FOR PLAYER]


# <a name="roadmap"/> Codebase Roadmap
Our codebase has two separate components: one representing the front- and back-end interface
for running our web application and another for the chrome browser plugin.

## Web Application
Key files for backend:
1. server.js and server-config.js
2. server/models/klicks.js

We used Yeoman to scaffold our front- and back-end web application so it should follow a
familiar layout. Starting with the backend experience, the server.js and server-config.js
are standard setups for Express servers. We set up our Mongo connection in server/config.js
and maintain one schema for collecting all our Klickr data in server/models/klicks.js. 
The CRUD aspect of our application logic can be found in the route-handlers within
lib/request-handler.js. 

Key files for frontend:
1. landing.html and gallery.html
2. scripts/

The frontend component consists of Angular. Our landing view consists of some added 
features where we add custom directives for handling how certain elements scroll into 
place. Our gallery view is currently a listing of all saved Klickr's from all users. 
We added functionality to filter by Klickr description and included the initial concept
of building "hype" around each Klickr, in addition to being able to  see basic statistics 
such as the duration and total number of views for each Klickr.

## Chrome Extension
Key files:
1. manifest.json
2. popups/popup.html and popups/app.js
3. bg/
  * background.js
  * bg-editor.js
  * bg-player.js
  * bg-recorder.js
4. content-scripts/
  * message.js
  * player.js
  * recorder.js

The manifest.json file represents the configuration file for our chrome browser pluging.
There are two main sections within the manifest.json that have significant ramifications
for how we developed our application: 1) background, and 2) content_scripts.
The scripts within the background section describe the JavaScript files that consist of
the background process that stays persistent while the chrome browser is open. Therefore,
these files are particular useful for holding data that needs to be kept around
across multiple DOM sessions (such as multi-page recordings). The content script section
describes the JavaScript files that will be injected into each DOM page whenever a user
loads a new one. Of particular note is that the files within these two sections do not
have direct communication with each other because they exist in different JavaScript
execution contexts. This is where the PubSub paradigm is prevalent and message passing 
occurs between the two sets of files.

The popup.html file represents the primary front end interface for our end users. This is
where all our buttons exist - play, stop, replay, pause, annotate, delete, and save.
This file combined with the app.js file represent the entire Angular frontend. The 
functions defined within the PopupCtrl control when the buttons should appear for users 
based on the status of the different parts of our application.

[INSERT INFO FOR MESSAGE.JS]

[INSERT INFO FOR PLAYER.JS]

The message.js file represents our Message class.  You can think of a message instance as 
any of annotations that appear on screen. Each message object has the ability to fade out
from the screen when appropriate.

[INSERT INFO FOR BACKGROUND.JS]

[INSERT INFO FOR BACKGROUND.JS]

[INSERT INFO FOR BACKGROUND.JS]

The bg-editor.js file represents our Editor class. You can think of an editor instance 
as the controller between a particular player and recorder instance. It dictates when
a player instance can pause and resume playback, and when a user can add annotations
to a Klickr recording.
