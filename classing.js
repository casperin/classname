function classing () {
    var result = {},
        objects = {},
        resultString = "";

    function add (strings) {
        classing.each(strings.split(" "), function (string) {
            result[string] = !!string;
        });
    }

    classing.each([].slice.call(arguments), function (x) {
        switch (classing.getType(x)) {
        case "string":
        case "number":
            add(x);
            break;

        case "array":
            add(classing.apply(null, x));
            break;

        case "element":
            add(classing(x.className));
            break;

        case "nodelist":
            add(classing.apply(null, [].slice.call(x)));
            break;

        case "jquery":
            add(classing.apply(null, x.get()));
            break;

        case "object":
            objects = classing.extend(objects, x);
            break;
        }
    });

    result = classing.extend(result, objects);

    classing.each(result, function (val, key) {
        if (val) resultString += " " + key;
    });

    return resultString.substr(1);
}

classing.setTo = function (elements) {
    var type = classing.getType(elements);

    if (type === "element") {
        elements = [elements];
    }

    if (type === "jquery") {
        elements = elements.get();
    }

    if (type === "nodelist") {
        elements = [].slice.call(elements);
    }

    return function () {
        var classNames = classing.apply(null, arguments);

        classing.each(elements, function (element) {
            element.className = classNames;
        });
    };
};

classing.each = function (arr, fn) {
    var type = classing.getType(arr);

    if (type === "array") {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
    }

    if (type === "object") {
        for (var key in arr) {
            fn(arr[key], key);
        }
    }
};

classing.getType = function (x) {
    var type = Object.prototype.toString.call(x).slice(8, -1).toLowerCase();

    if (type === "object" && x.jquery) {
        return "jquery";
    }

    if (type.indexOf("element") > 1) {
        return "element";
    }

    return type;
};

classing.extend = function (obj1, obj2) {
    var result = {},
        objs = [obj1, obj2];

    classing.each(objs, function (obj) {
        classing.each(obj, function (val, key) {
            if (obj.hasOwnProperty(key)) result[key] = val;
        });
    });

    return result;
};

if (typeof module !== "undefined" && module.exports) {
    module.exports = classing;
}
