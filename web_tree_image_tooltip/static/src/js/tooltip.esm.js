/**@odoo-module*/
import { Component } from "@odoo/owl";


export class TreeHoverAction extends Component {
    async showTooltip(ev) {
        ev.stopPropagation();
        // Retrieve the src attribute of the hovered over image
        const src = $(ev.currentTarget).attr("src");

        // Create a tooltip element to display the zoomed image
        const $tooltip = $("<div>").addClass("tooltip").appendTo("html");
        const $zoomedImage = $("<img>").attr("src", src).appendTo($tooltip);

        //We are getting the image width and length and we are dividing them by half so the tooltip does not cover up the image
        const imageWidth = $(ev.currentTarget).width();
        const imageHeight = $(ev.currentTarget).height();
        const tooltipLeft = ev.clientX + imageWidth / 2;
        const tooltipTop = ev.clientY + imageHeight / 2;

    	// Position the tooltip relative to the mouse pointer
        $tooltip.css({
            top: tooltipTop + 10,
            left: tooltipLeft + 10,
            position: "absolute",
            zIndex: 999999,
            border: "1px solid #ccc", 
            backgroundColor: "#fff", 
            padding: "5px", 
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", 
            visibility: "visible",
            display: "block",
            opacity: 1,
            maxWidth: "300px" 
        });
            
        $zoomedImage.css({
            maxWidth: "100%", 
            maxHeight: "100%" 
        });
        // Remove the tooltip when mouse leaves the image
        $(ev.currentTarget).on("mouseleave", function() {
            $tooltip.remove();
        });
    }
}


// We are finding in the document the image in the tree view that has this class
$(document).on("mouseenter", ".o_image_cell .o_field_image img", async function(ev) {
    ev.stopPropagation();
    //Call the function that shows the toolrip class
    await new TreeHoverAction().showTooltip(ev);

});

