({
	validateItem: function(component, event, helper) {

        // Simplistic error checking
        var validItem = true;

        // Name must not be blank
        var 
            nameField = component.find("name"),
            name = nameField.get("v.value");
        if ($A.util.isEmpty(name)){
            validItem = false;
            nameField.set("v.errors", [{message:"Name can't be blank."}]);
        }
        else {
            nameField.set("v.errors", null);
        }

        //Quantity must not be 0
        var 
            quantityField = component.find("quantity"),
            quantity = quantityField.get("v.value");
        
        if(quantity === 0) {
            validItem = false;
            quantityField.set("v.errors", [{message:"Quantity can't be zero."}]);
        } else {
            quantityField.set("v.errors", null);       
        }
        
        //Price can't be 0.00
        var 
            priceField = component.find("price"),
            price = priceField.get("v.value");
        
        if(price <= 0) {
            validItem = false;
            priceField.set("v.errors", [{message:"Price can't be zero."}]);
        } else {
            priceField.set("v.errors", null);
        }
        
        return validItem;
        
    },
    createItem: function(component, item) {
        var action = component.get("c.saveItem");
        action.setParams({
            "item": item
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var items = component.get("v.items");
               items.push(response.getReturnValue());
                component.set("v.items", items);
            }
        });
        $A.enqueueAction(action);
    }
})