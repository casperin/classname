/* global describe, it, expect, classname */

describe('basic argument handling', function () {
    it('can handle strings', function () {
        expect(classname('one two', 'three')).toBe('one two three');
    });

    it('can handle arrays', function () {
        expect(classname(['one', 'two'])).toBe('one two');
    });

    it('can handle nested arrays', function () {
        expect(classname(['one', ['two', 'three']])).toBe('one two three');
    });

    it('can handle objects', function () {
        expect(classname({one: true, two: false})).toBe('one');
    });

    it('objects always overwrite other types', function () {
        var str = classname('one', {one: false, two: false, three: true}, 'two');

        expect(str).toBe('three');
    });

    it('handles a mix of strings, arrays, and objects', function () {
        var str = classname(['one', ['two'], {three: true, four: 0}], 'five six', {two: false});

        expect(str).toBe('one three five six');
    });
});


describe('handle different types of elements', function () {
    it('can handle a normal dom element', function () {
        var el = document.createElement('span');

        el.className = 'one two';

        expect(classname(el)).toBe('one two');

        expect(classname({one: 0}, el)).toBe('two');
    });

    it('can handle nodelists', function () {
        var el1 = document.createElement('span'),
            el2 = document.createElement('span'),
            nodelist;

        el1.className = 'one foo';
        el2.className = 'two foo';

        document.body.appendChild(el1);
        document.body.appendChild(el2);

        nodelist = document.querySelectorAll('.foo');

        expect(classname(nodelist)).toBe('one foo two');
    });
});


describe('Extra functionality: `.setTo()`', function () {
    it('can set the new className to an element', function () {
        var el = document.createElement('span');

        el.className = 'one';

        classname.setTo(el)('two');

        expect(el.className).toBe('two');
    });
});
