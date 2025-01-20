Object.defineProperty(Array.prototype, "AddRange", {
    value: function(items) {
        this.push.apply(this, items);
    },
    writable: true,
    configurable: true
});

Object.defineProperty(Array.prototype, "FirstOrDefault", {
    value: function () {
        try {
            return this[0];
        } catch (e) {
            return null;
        }
    },
    writable: true,
    configurable: true
});

Object.defineProperty(Array.prototype, "GroupBy", {
    value: function (propertie) {
        try {
            return this.reduce((previousValue, currentValue) => {
                previousValue[currentValue[propertie]] = [...previousValue[currentValue[propertie]] || [], currentValue];

                return previousValue;
            }, {});
        } catch (e) {
            return null;
        }
    },
    writable: true,
    configurable: true
});

Object.defineProperty(Object.prototype, "ToArray", {
    value: function () {
        try {
            return Object.keys(this).map((key) => this[key]);
        } catch (e) {
            return null;
        }
    },
    writable: true,
    configurable: true
});

Object.defineProperty(String.prototype, "isDate", {
    value: function () {
        try {
            return isNotEmpty(Date.parse(this))
        } catch (e) {
            return false;
        }
    },
    writable: true,
    configurable: true
});


Object.defineProperty(String.prototype, "removeAccent", {
    value: function () {
        try {
            return this.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        } catch (e) {
            return "";
        }
    },
    writable: true,
    configurable: true
});

Object.defineProperty(String.prototype, "Replace", {
    value: function (init, end, replaceAllOptions = false) {
        try {
            if (replaceAllOptions) {
                var strRegExp = new RegExp(init, 'g');

                return this.replace(strRegExp, end);

            } else {
                return this.replace(init, end);
            }
        } catch (e) {
            return "";
        }
    },
    writable: true,
    configurable: true
});