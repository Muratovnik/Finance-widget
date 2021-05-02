import tippy from "tippy.js";
{
    let tooltips = document.querySelectorAll(".js-tooltip");
    for (let tooltip of tooltips) {
        tippy(tooltip, {
            arrow: true,
            placement: "top", // top, right, bottom, left
            interactive: true,
            allowHTML: true,
            hideOnClick: false,
            theme: "red",
            maxWidth: 299,
            appendTo: () => document.body,
            content: tooltip.querySelector(".js-tooltip__content"),
        });
    }
}