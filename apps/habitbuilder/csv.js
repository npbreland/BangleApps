const CSV_HEADER = "date,question,response\n";

// Cleans the CSV data by removing duplicate entries
document.addEventListener('click', function (event) {
  if (event.target.id === 'download-csv') {
    Util.saveCSV("habitbuilder.data.csv", csvData);
    return;
    // String representation of the CSV post-cleaning
    let cleanCsvStr = CSV_HEADER;
    Util.readStorage("habitbuilder.data.csv", data=>{
      let lines = data.split("\n");

      // Don't bother with the first line, which is a header
      lines = lines.slice(1, lines.length-1);

      const memory = {
        date: null,
        questions: {}
      };

      let line, parts;
      while (lines.length > 0) {
        line = shift(lines);
        parts = line.split(",");

        if (parts[0] !== memory.date && memory.date !== null) {
          // New date, so write out the memory

          for (let [question, response] of Object.entries(memory.questions)) {
            cleanCsvStr += memory.date + "," + question + "," + response + "\n";
          }

          memory.date = parts[0];
          memory.questions = {};
        }

        // Overwrite the memory with the new value (we only care about the last)
        memory.questions[parts[1]] = parts[2];
      }
    });
  } else if (e.target.id === 'clear-csv') {
    if (confirm("Are you sure you want to clear the CSV data?")) {
      // Reset the CSV data to just the header
      Util.writeStorage("habitbuilder.data.csv", CSV_HEADER);
    }
  }
});
