# EE Calculator tech test

Version: 5b8d0fd276b6d288905ed2f63a934e057e8feca2

This app is an implementation of a classic physical 
calculator. It attempts to reproduce as many features as possible, including : 

* Repeating an operation by hitting the enter key more than once
* Compound operations (e.g. 1+2+3+4)


## Getting started

Run `npm ci` to install packages, then run `npm start` to view the calculator. 
It should open a browser window on port 1234.


## Technology

Written in React. Uses Parcel for bundling and dev server to reduce project setup time 
and avoid using create-react-app (I normally use Webpack on client projects).


## Known issues

There is no keyboard support. I wanted physical key presses to invoke a click of the onscreen buttons (to trigger the active colour change), but ran out of time. 
Tried a quick solution with a document keydown listener that called the handleDigit function 
but ran into a stale closure issue. Given more time I'd probably break the button component 
out and have it register it's own listener (instead of maintaining a ref for every button).

There should be a mechanism to stop repeated presses of operator keys when no new values has 
been entered.

There is an AC button, but no C button.


## Improvements

The clear function sets a lot of separate state variables, so rewriting the state as a reducer would be better

Investigate use of BigDecimal in the calculator to improve floating point precision

