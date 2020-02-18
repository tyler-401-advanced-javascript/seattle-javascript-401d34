# Notesy

Notesy is a simple note-taking app you can use from your command line.

## Installation
```
npm install -g @emilyaviva/notesy
```

## Usage
```
notesy -a|--add "<note text>" [-c|--category <name>]
  Adds a note to the specified category
  N.B.: the note text must be enclosed in quotation marks
notesy -l|--list [category]
  Lists all notes and their IDs (optional: in the specified category)
notesy -d|--delete <id>
  Delete the specified note by ID
```

## Contributing
This is a student project, but contributions are welcome!

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
