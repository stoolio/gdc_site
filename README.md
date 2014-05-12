# Gale Diamonds Simplified with Sinatra & Foundation

Grunt handles assets, Sinatra handles everything else.

We will call this version 0.5. Some corners will possibly be cut in the interest of getting this out the door, so the first live version will not be 1.0.

Then, everything will be mercilessly re-factored and version 1.0 will be something we can more confidently build upon in the future.

## Uses:

Simple is as simple does. Sort of.

  * # Development
    * [Node.js](http://nodejs.org)
    * [Grunt](http://gruntjs.com/)
    * [Bower](http://bower.io)
  * # Production
    * [Sinatra](sinatrarb.com/)
    * [HAML](http://haml.info/)


## Quickstart

`foundation update` will update foundation (using bower)
`grunt build` or `grunt` will compile sass, uglify and copy js, and copy everything into the public folder
`grunt watch` will do all of the above, but stick around and watch for changes afterwards

`grunt dist` will compile everything for production (concat, copy, etc).

If you want to set up the dev environment:

    cd gdc_site
    bundle install
    bundle exec rackup
    # new terminal
    cd gdc_site/frontend
    grunt

Any changes to styles will reload the page, and sinatra is set up to reload most files. Views and routes will accept changes, helpers will not. For now, those change very little, so I'm not bothering to try and get reloading working on them. Plus, sinatra boots up in no time.

## Directory Strucutre

 * `app`: Similar to Rails app folder:
   * `decorators`: presenters might be a better name. Add functionality to models specifically for views
   * `helpers`: Extra functionalit for routes and/or views that doesn't go with a model
   * `models`: It's a bit small at this point, we have Ring for rings and Form for any form requests. The filesystem if the current DB, so this is really just to ease the transition to another db in the future.
   * `routes`: Again, very simplified. All static pages are in the static.rb, even forms. the forms.rb only contains post routes, etc.
   * `view`: haml views, organized by route, with partials in the base folder
   * `other files`: these files set up autoloading of their respective classes
 * `frontend`: contains all raw scss and js files

## What it is

Borrows heavily from the structure of [Alex MacCaw's Monocle][1]. All app class folders contain a base class in base.rb which they inherit from to provide helpers and other functionality common to all.


  [1]: https://github.com/maccman/monocle/
