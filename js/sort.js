$(function(){

    let compare = { 
        alphabetical: function (a, b) { 
            if (a < b) { 
                return -1; 
            } else { 
                return a > b ? 1 : 0;
            }
        }, 
        number: function (a, b) {
            return a - b;
        },
        date: function (a, b) { 
            a = new Date(a); 
            b = new Date(b); 
            return a - b; 
        }
    }

    $('th').on('click', function(e) {
        let $tbody = $('table').find('tbody'); // Table body
        let rows = $tbody.find('tr').toArray(); // don't move this out of this function
       
        var $table = $(this); // This table
        // var $controls = $table.find('th'); // Table headers 
        // $controls.on('click', function () { // Event handler
            console.log("testing");
            var $header = $(this); // Get header
            var order = $header.data('alphabetical'); // Get data type
            var column;
            if ($header.is('.ascending')) { // second click
                // Toggle to other class
                $header.toggleClass('ascending descending');
                // Reverse the array
                $tbody.append(rows.reverse());
            } else if ($header.is('.descending')) //third click
            {
                $header.removeClass('ascending descending');

                rows.sort(function (a, b) {

                    // sort based on that hidden column with the number in it
                    // a = $(a).find('td').eq(4).text();
                    // b = $(b).find('td').eq(4).text();

                    // if we were using the class name to do the sort
                    a = $(a).attr('class').split('-')[1]; // first time it runs, this is 2
                    b = $(b).attr('class').split('-')[1]; // first time it runs, this is 5

                    return compare.number(Number(a), Number(b));
                });
                $tbody.append(rows); //need to put the rows on the page after sorting them

                /* alternatively, instead of sorting the rows based on values in the table, we can juse use a cloned copy of the rows in defaultState */
                // $tbody.empty();
                // $tbody.append(defaultState);
                // OR you can use
                // $tbody.append($defaultRowsFromJSON);


            } else { // on first click
                $header.addClass('ascending'); // Add class to header
                // Remove asc or desc from all other headers
                $header.siblings().removeClass('ascending descending');
                // If compare object has method of that name
                if (compare.hasOwnProperty(order)) {
                    column = $controls.index(this); // Column’s index no
                    rows.sort(function (a, b) { // Call sort() on rows
                        a = $(a).find('td').eq(column).text();// Text of column row a
                        b = $(b).find('td').eq(column).text();// Text of column row b
                        return compare[order](a, b); // Call compare method
                    });
                    $tbody.append(rows);
                }
            }
        // });

    });

});