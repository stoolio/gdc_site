# Gale Diamonds Chicago Next

Grunt handles assets, Sinatra handles everything else.

We basically have feature lock for version 1.0. A feature roadmap will be created after 1.0 is live.

However, first and foremost, a merciless refactoring is required. As there are currently no tests, some broad integration tests shall be created to increase confidence during the refactor.

**1.1 Roadmap:**

  * Integration Tests
  * Refactor

## Use:

Simple is as simple does. Sort of.

  * # Development
    * [Node.js](http://nodejs.org)
    * [Grunt](http://gruntjs.com/)
    * [Bower](http://bower.io)
  * # Production
    * [Sinatra](sinatrarb.com/)
    * [HAML](http://haml.info/)


## Quickstart

### Frontend

All frontend commands should be run from the frontend folder. For organizations sake, all frontend dev assets are in this folder.

`foundation update` will update foundation (using bower)

`grunt` will build dev assets and watch for changes

`grunt dist` will compile everything for production (concat, copy, etc). However, there are a few other bits and bobs, so you should just run the deploy script in the `frontend` folder.

There is an issue with grunt on our host (Webfaction), and in lieu of figuring that out, I've been compiling the assets locally and copying them to the server. This can probably be automated (deploy uploads to server, git push has a hook to run deploy script on server), or, I can stop being lazy and fix grunt on the server.

If you want to set up the dev environment:

    cd gdc_site
    bundle install
    bundle exec rackup
    # new terminal
    cd gdc_site/frontend
    grunt

Any changes to styles will reload the page, and sinatra is set up to reload most files. Views and routes will accept changes, helpers will not. For now, those change very little, so I'm not bothering to try and get reloading working on them. Plus, sinatra boots up in no time.

I've found it is helpful to work on helpers by including them in the Routes themselves:

    helpers do
      # insert helpers here
    end

and then copying them over once they are working. This saves having to lots of restarting of Sinatra.

## Directory Strucutre

 * `app`: Similar to Rails app folder:
   * `decorators`: presenters might be a better name. Add functionality to models specifically for views
   * `helpers`: Extra functionality for routes and/or views that doesn't go with a model
   * `models`: It's a bit small at this point, we have Ring for rings and Form for any form requests. The filesystem (and the ruby JSON lib) is the current DB, so this is really just to ease the transition to another db in the future.
   * `routes`: This is the meat of the Sinatra code. It's all pretty simple. Have a look.
   * `view`: haml views, organized by route, with partials in the base folder
   * `other files`: these files set up autoloading of their respective classes
 * `frontend`: contains all raw scss and js files

## What it is

Borrows heavily from the structure of [Alex MacCaw's Monocle][1]. All app class folders contain a base class in base.rb which they inherit from to provide helpers and other functionality common to all.

  [1]: https://github.com/maccman/monocle/
