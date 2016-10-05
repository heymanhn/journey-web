# journey-web
Web app for Journey, built with React, Redux, React Router, and more. Track your trip plans and share links to the trips with friends and collaborate on your plans together!

## Setup
1. Install node
2. Install node modules: `npm install`. This will also install webpack.
3. Run webpack: `webpack -p` to create the `bundle.js` file
5. Launch the frontend web server: `npm start`
6. Visit https://localhost:3010/ on your browser

## NOTE
We set up a symlink that maps all modules to the 'app/' relative path for cleaner module loading syntax. However, this symlinking only works on Linux/OSX. Please follow the instructions on this article to set up the symlinking on Windows:
http://griever989.github.io/programming/2015/07/26/require-hell/
