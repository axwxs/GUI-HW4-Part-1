$(document).ready(function() {

    // Using the on change method so the values are updated dynamically
    $("#numberInputForm").on("change", function() {

        // Sets the validation rules for the input fields
        $("#numberInputForm").validate({
            rules: {
                colMin: {
                    required: true,
                    number: true,
                    range: [-50, 50],
                },
                colMax: {
                    required: true,
                    number: true,
                    min: () => parseInt($("#colMin").val()), // Arrow function makes sure the min value is current
                    max: 50,
                },
                rowMin: {
                    required: true,
                    number: true,
                    range: [-50, 50],
                },
                rowMax: {
                    required: true,
                    number: true,
                    min: () => parseInt($("#rowMin").val()), // Arrow function makes sure the min value is current
                    max: 50,
                },
            },
            messages: {
                colMin: {
                    required: "Please enter a value",
                    number: "Please enter a valid number",
                    range: "Please enter a value between -50 and 50",
                },
                colMax: {
                    required: "Please enter a value",
                    number: "Please enter a valid number",
                    min: "Please enter a value greater than or equal to the minimum column value",
                    max: "Please enter a value less than or equal to 50",
                },
                rowMin: {
                    required: "Please enter a value",
                    number: "Please enter a valid number",
                    range: "Please enter a value between -50 and 50",
                },
                rowMax: {
                    required: "Please enter a value",
                    number: "Please enter a valid number",
                    min: "Please enter a value greater than or equal to the minimum row value",
                    max: "Please enter a value less than or equal to 50",
                },
            },
            // If the form is valid, the create_table function is called
            submitHandler: function() {
                create_table();
            }
        })


    })
})

// Main function. Takes two valid inputs and creates a multiplication table. Throws an error if the inputs are invalid.
create_table = function() {

    // Resets the table to prevent more than one table from being created
    var mainTable = document.querySelector(".main-table-container");
    mainTable.innerHTML = "";

    // Gets the input from the user
    var cStartValue = parseInt(document.getElementById("colMin").value)
    var cEndValue = parseInt(document.getElementById("colMax").value)
    var rStartValue = parseInt(document.getElementById("rowMin").value)
    var rEndValue = parseInt(document.getElementById("rowMax").value)


    // Puts them in array so I can use one variable
    var vals = [cStartValue, cEndValue, rStartValue, rEndValue]

    // Gets the minimum and maximum values for the columns and rows
    var minColValue = Math.min(vals[0], vals[1])
    var maxColValue = Math.max(vals[0], vals[1])
    var minRowValue = Math.min(vals[2], vals[3])
    var maxRowValue = Math.max(vals[2], vals[3])


    /*

    // Error checking
    try {
        if(cStartValue === "" || cEndValue === "" || rStartValue === "" || rEndValue === "")  throw "One or more of the input values are empty";
        if(isNaN(minColValue) || isNaN(maxColValue) || isNaN(minRowValue) || isNaN(maxRowValue)) throw "One or more of the input values is not a number";
        if(minColValue < -50 || minRowValue < -50)  throw "One or more of the input values is less than -50";
        if(maxColValue > 50 || maxRowValue > 50)  throw "One or more of the input values is greater than 50";
        if ((!isInt(minColValue) || !isInt(maxColValue) || !isInt(minRowValue) || !isInt(maxRowValue))) throw "One or more of the input values is not an integer";

        if(parseInt(cEndValue) < parseInt(cStartValue)) throw "The maximum column value is less than the minimum column value";
        if(parseInt(rEndValue) < parseInt(rStartValue)) throw "The maximum row value is less than the minimum row value";
    }
    catch(err) {
        mainTable.innerHTML = `<h3 class="error-message">Error: ${err}<br>Please try again</h3>`;
        return;
    }

     */


    // Creates the actual result table w/o the headers
    var newTable = document.createElement("table")
    newTable.setAttribute("id", "newTable")
    var newTbody = document.createElement("tbody")
    for (var i = minRowValue; i <= maxRowValue; i++) {
        var tr = document.createElement("tr");
        for (var j = minColValue; j <= maxColValue; j++) {
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(parseInt(i) * parseInt(j)));
            tr.appendChild(td);
        }
        newTbody.appendChild(tr);
    }

    // Creates the top header row and appends it to the table in proper place
    var hRow = document.createElement("tr");
    hRow.appendChild(document.createElement("td"))
    for (var i = minColValue; i <= maxColValue; i++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(i));
        hRow.appendChild(th);
    }
    newTbody.insertBefore(hRow, newTbody.firstChild)
    newTable.appendChild(newTbody);
    mainTable.appendChild(newTable)

    // Creates the left header column and appends it to the table in proper place
    var rowsToAppend = document.querySelectorAll("tr")
    var rowValueToAdd = rStartValue
    for (var i = 1; i < rowsToAppend.length; i++) {
        rowsToAppend[i].innerHTML = `<th>${rowValueToAdd}</th>` + rowsToAppend[i].innerHTML
        rowValueToAdd++
    }

    console.log('table created');
    return false;
}