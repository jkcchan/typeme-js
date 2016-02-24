# Typeme.js
## Simplest Javascript Library to simulate typing.
![Typeme.js in action](http://i.imgur.com/j8BK1fF.gif)
## Syntax

```javascript
var foo = new Typeme('String here! Lets set a delay for 33 cycles %%33%%. And add a new line. %%n%% The end.', 50 $("body"));
```

## Parameters

Parameter | Type | Value
------------ | ------------- | -------------
string | string | The string to be typed. NOTE: The double % symbols must have a space in between them. (i.e. %%n%% %%n%%, not %%n%%%%n%%)
speed | number | Represents the time for each cycle in milliseconds. Default to `100`.
target | jquery selector | Parameter to select where the Typeme will start typing. Default to `$("body")`.
isWrapped (optional) | bool | Typeme uses this to handle wrapped tags. set to `true` to not use the cursor.

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
- %%s(id)_______%% : Span with given id (currently broken)

## What features are planned?
- %%d%% : Delete until flag (In progress)
- Nested commands
- Flashing cursor

## Why?
Wanted a one-line, simple library that will do this. Not much jQuery dependance either, might remove the dependance completely in the future.

# Contribute!
Check out the open [issues](https://github.com/jkcchan/typeme-js/issues). For any questions, please contact me at [jacob.chan5@gmail.com](mailto:jacob.chan5@gmail.com).
