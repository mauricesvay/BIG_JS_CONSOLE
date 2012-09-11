// inspired by https://gist.github.com/913112
// and https://github.com/scottrabin/prettyprint

var prettyprint = (function() {

    var MAX_DEPTH = 10;

    function getType(obj){
        return Object.prototype.toString.call( obj );
    }
    function spacer(depth) {
        return (new Array(depth + 1)).join("  ");
    }

    function pp(object, depth, embedded) {
        depth = (getType(depth) === "[object Number]") ? depth : 0;
        embedded = (getType(embedded) === "[object Boolean]") ? embedded : false;
        var newline = false;
        var type = getType(object);
        var pretty = "";
        var content;

        if (depth > MAX_DEPTH) {
            return ((newline ? "\n" + spacer(depth) : "") + "...");
        }

        switch (type) {
            case '[object Undefined]':
                pretty += "undefined";
                break;
            case '[object Null]':
                pretty += "null";
                break;
            case '[object Boolean]':
                pretty += object.toString();
                break;
            case '[object Number]':
                pretty += object.toString();
                break;
            case '[object String]':
                pretty += "\"" + object + "\"";
                break;
            case '[object Array]':
                if (object.length === 0) {
                    pretty += "[]";
                } else {
                    if (embedded) {
                        newline = true;
                    }
                    content = "";
                    for (var item in object) {
                        content += pp(object[item], depth + 1) + ",\n" + spacer(depth + 1);
                    }
                    content = content.replace(/,\n\s*$/, "").replace(/^\s*/, "");
                    pretty += "[\n" + spacer(depth + 1) + content + "\n" + spacer(depth) + "]";
                }
                break;
            case '[object Object]':
                if (Object.keys(object).length === 0) {
                    pretty += "{}";
                } else {
                    if (embedded) {
                        newline = true;
                    }
                    content = "";
                    for (var key in object) {
                        content += spacer(depth + 1) + "\"" + key.toString() + "\": " + pp(object[key], depth + 1, true) + ",\n";
                    }
                    content = content.replace(/,\n\s*$/, "").replace(/^\s*/, "");
                    pretty += "{\n" + spacer(depth + 1) + content + "\n" + spacer(depth) + "}";
                }
                break;
            default:
                pretty += object.toString();
        }

        return ((newline ? "\n" + spacer(depth) : "") + pretty);
    }

    return pp;
})();