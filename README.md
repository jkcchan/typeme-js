# Typeme.js
## Javascript Library to simulate typing.

## Syntax

`var foo = new Typeme('String here! Lets set a delay for 33 cycles %%33%%. And add a new line. %%n%%. The next parameter is how long (in milliseconds) one cycle will be.', 50);`

## What can you do with this?
### Double percent (%%) syntax:
- %%n%% : New line
- %%t%% : Tab
- %%f%% : Set flag
- %%NUMBER%% : Delay for x amount of iterations (NUMBER is any number > 0)
- %%i_______%% : Italics (text between %%'s that isn't the 'i')
- %%b_______%% : Bold (text between %%'s that isn't the 'b')
- %%u_______%% : Underline (text between %%'s that isn't the 'u')
- %%a(link)_______%% : Link (where link is the actual link, and the text is the text)

## What features are planned?
- %%d%% : Delete until flag (In progress)
- Nested commands
- Flashing cursor

## Why?
Wanted a one-line, simple library that will do this. Not much jQuery dependance either, might remove the dependance completely in the future.

NOTE: The double % symbols must have a space in between them. (i.e. %%n%% %%n%%, not %%n%%%%n%%)