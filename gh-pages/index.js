(function () {
    var elements = [];

    // Currently I'm just passing the config in but in a perfect world it would
    // be nice to have this be auto-generated from documentation in the
    // element's own file.

    elements.push({
        name: "mkt-banner",
        template: getTemplate("mkt-banner-template"),
        attributes: [
            {
                name: "success",
                description: "Make it look successful.",
            },
            {
                name: "compat",
                description: "Make it look firefox-y.",
            },
            {
                name: "dismiss",
                description: "Handle the dismiss button.",
                options: ["on", "off", "remember"],
            },
        ],
    });

    elements.push({
        name: "mkt-segmented",
        template: getTemplate("mkt-segmented-template"),
        events: {
            change: "Fired when the selection changes",
        },
        properties: {
            value: "The value of the currently selected option.",
        },
    });

    elements.push({
        name: "mkt-tab-control",
        template: getTemplate("mkt-tab-control-template"),
        events: {
            change: "Fired when the selection changes.",
        },
        properties: {
            value: "The value of the currently selected option.",
        },
    });

    function getTemplate(templateId) {
        return document.getElementById(templateId).innerHTML;
    }

    function renderTemplate(templateId, context) {
        return Mustache.render(getTemplate(templateId), context);
    }

    document.body.innerHTML = [
        renderTemplate('element-listing', {elements: elements}),
        "<hr>",
        renderTemplate('element-detail-tabs', {
            elements: elements,
            elementDetail: getTemplate('element-detail'),
        }),
    ].join("\n");

    document
        .getElementById('element-tabs')
        .addEventListener('change', function (e) {
            var input = e.target;
            var attributeOptions = input.closest('.attribute-options');
            if (attributeOptions) {
                var elementSection = input.closest('section');
                var element = elementSection.querySelector(elementSection.getAttribute('name'));
                if (input.type == 'checkbox') {
                    if (input.checked) {
                        element.setAttribute(input.name, '');
                    } else {
                        element.removeAttribute(input.name);
                    }
                } else {
                    element.setAttribute(input.name, input.value);
                }
            }
        });
})();
