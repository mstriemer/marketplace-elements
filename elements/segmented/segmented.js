// Pretending to use ES6 modules for now.

// FIXME: This should get imported.
var u = {
    forEach: function (arr, fn) {
        // For NodeList.
        return Array.prototype.forEach.call(arr, fn);
    },

    find: function (arr, predicate) {
        // For NodeList.
        for (var i = 0, n = arr.length; i < n; i++) {
            if (predicate(arr[i])) {
                return arr[i];
            }
        }
    },

    map: function (arr, fn) {
        // For NodeList.
        return Array.prototype.map.call(arr, fn);
    },

    filter: function (arr, fn) {
        // For NodeList.
        return Array.prototype.filter.call(arr, fn);
    },

    serialize: function (form) {
        var data = {};
        utils.forEach(form.elements, function(ele) {
            if (!ele.disabled && ele.name) {
                data[ele.name] = ele.value;
            }
        });
        return data;
    },
};

export class MktSegmented extends HTMLElement {
    createdCallback() {
        var root = this;
        this.select = this.querySelector('select');
        this.select.classList.add('mkt-segmented-select');
        this.classList.add('mkt-segmented');

        this.buttons = u.map(this.select.options, function (option, i) {
            var button = document.createElement('button');
            button.index = i;
            button.classList.add('mkt-segmented-button');
            button.textContent = option.textContent;
            button.addEventListener('click', function() {
                root.selectButton(this);
                root.dispatchEvent(new Event('change', {bubbles: true}));
            });
            return button;
        });
        this.selectButton(this.buttons[this.select.selectedIndex]);
        this.buttons.forEach(function(button) {
            root.appendChild(button);
        });
    }

    selectButton(button) {
        if (this.selected == button) {
            return;
        } else if (this.selected) {
            this.selected.removeAttribute('selected');
        }
        button.setAttribute('selected', '');
        this.selected = button;
        this.select.selectedIndex = button.index;
    }
    get value() {
        return this.select.value;
    }

    set value(value) {
        if (this.select.value !== value) {
            this.select.value = value;
            this.selectButton(this.buttons[this.select.selectedIndex]);
        }
    }
}

document.registerElement('mkt-segmented', MktSegmented);
