# classname v.0.0.1

Simple tool to build (and apply) classes. This is very much inspired by Jed Watson's [classnames](https://github.com/JedWatson/classnames), but with added functionality and slight differences in interface.

## Install

Npm: `npm install classname`

Or just load `classname.js` in your browser, and call it directly.

## Documentation

```javascript
classname(1, 'one', false, 'two'); // '1 one two'

classname({
    one: true,
    two: false,
    three: true
});
// 'one three'

classname(['one', 'two'], {one: false, three: true});
// 'two three'
```

Objects always overwrite other types of parameters

```javascript
classname({one: false}, ['one', 'two']);
// 'two'
```

`classname` handles more than string, numbers, arrays, and objects though. You can give it elements, nodelists, or jQuery elements too.

```javascript
classname(document.querySelectorAll('.foo'), 'bar');
// 'foo bar' (assuming that the found elements do not have other class names as well)
```

`classname` can also set the class to the element for you. Use `.setTo()`:

```javascript
var el = document.getElementById('foo');

classname.setTo(el)('one', 'two');

el.className; // 'one two'
```
