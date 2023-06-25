// place your const, vars, functions or classes here

// Create the file in append mode
const file = require("Storage").open("habitbuilder.json", "a");

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
