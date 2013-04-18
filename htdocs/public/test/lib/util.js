function in_array(needle, haystack) {
    for (var k = 0, len = haystack.length; k < len; ++k) {
        if (haystack[k] === needle) {
            return true;
        }
    }

    return false;
}
