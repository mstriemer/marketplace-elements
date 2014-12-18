(function () {
    var elements = [];

    // Currently I'm just passing the config in but in a perfect world it would
    // be nice to have this be auto-generated from documentation in the
    // element's own file.

    elements.push({
        name: "mkt-banner",
        template: getTemplate("mkt-banner-template"),
        attributes: {
            success: {
                description: "Make it successful.",
            },
            dismiss: {
                options: ["on", "off", "remember"],
                description: "Handle the dismiss button."
            },
        },
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
})();
