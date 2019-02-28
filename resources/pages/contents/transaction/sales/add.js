var products_id = [];
var products_name = [];
var products_price = [];

$(document).ready(function () {
    _loadData();

    _loadProduct();

    $('#input_nominal').keyup(function () {
        $('#input_nominal').val(_moneySeparator($('#input_nominal').val()));
    });

    _calcTableHeight();
});

function _loadData() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "distributor",
        id: "all"
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].name+"</td>" +
                        "<td id='"+responseJson.message[i].id+"@!#"+responseJson.message[i].name+"' onclick=\"_table_1_click(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Choose</td>" +
                        // "<td id='contents-transaction-haid-info-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _loadProduct() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "product",
        id: "all"
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    products_id.push(responseJson.message[i].id);
                    products_name.push(responseJson.message[i].name);
                    products_price.push(responseJson.message[i].price);
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _table_1_click(element) {
    var _id = element.id;
    var distributor_id = _id.split("@!#")[0];
    var distributor_name = _id.split("@!#")[1];

    $('#distributor_id').val(distributor_id);
    $('#distributor_name').val(distributor_name);

    $('.step-1').addClass('display-none');
    $('.step-2').removeClass('display-none');

    _calcTableHeight(380);
}

function _changeDistributor() {
    $('.step-2').addClass('display-none');
    $('.step-1').removeClass('display-none');
    _calcTableHeight();
}

function _btn_save() {
    $("#btn-save").addClass("display-none");
    $("#btn-process").removeClass("display-none");
    _save_header();
}

function _save_header() {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "sales",
        id_distributor: $('#distributor_id').val(),
        nota_number: $('#nota_number').val(),
        total: $('#total_price').val(),
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }
            //
            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                // alert(responseJson.message);
                _save_detail(responseJson.message);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _save_detail(ID_SALES_HEADER) {
    var table = document.getElementById("table-body-product");
    var rows = table.getElementsByTagName("tr");
    for(var i = 0; i < rows.length; i++)
    {
        var cells = table.getElementsByTagName("td");
        __save_detail(i, ID_SALES_HEADER, rows[i].cells[0].innerHTML, rows[i].cells[2].innerHTML, rows[i].cells[3].innerHTML, rows[i].cells[4].innerHTML);
    }

    alert("Sales Inserted Successfully");

    _clear_input();
    _clear_table();

    $("#btn-save").removeClass("display-none");
    $("#btn-process").addClass("display-none");
}

function __save_detail(COUNTER, ID_SALES_HEADER, ID_PRODUCT, QUANTITY, PRICE, TOTAL) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "sales_detail",
        id_helper: COUNTER,
        id_sales: ID_SALES_HEADER,
        id_product: ID_PRODUCT,
        quantity: QUANTITY,
        price: PRICE,
        total: TOTAL,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }
            //
            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                // alert(responseJson.message);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _clear_input() {
    $('#distributor_id').val('');
    $('#distributor_name').val('');
    $('#nota_number').val('');
    $('#input_name').val('');
    $('#input_nominal').val('');
    $('#input_description').val('');
    $('#total_price').val('');
    _changeDistributor();
}

function _clear_table() {
    $("#table-body-product tr").remove();
}

function _changeProduct() {
    const global_var = remote.getGlobal('globalVariable');
    // var window = remote.getCurrentWindow();
    main.openPopUpWindow('resources/pages/contents/transaction/sales/modal');
    // window.close();
}

function _btn_add() {
    var prod_price = _removeMoneySeparator($('#product_price').val());
    var subtotal = prod_price * $('#input_carton').val();
    $("#table-body-product").append(
        "<tr>" +
        "<td class=\"display-none\">"+$('#product_id').val()+"</td>" +
        "<td>"+$('#input_name').val()+"</td>" +
        "<td class='text-right'>"+$('#input_carton').val()+"</td>" +
        "<td class='text-right'>"+$('#product_price').val()+"</td>" +
        "<td class='text-right'>"+_moneySeparatorNoKeyCode(subtotal)+"</td>" +
        "<td onclick=\"_deleteProduct(this)\" class=\"text-center width width-80 color-red1 cursor-pointer\">Delete</td>" +
        "</tr>"
    );

    _calcTotal('plus', subtotal);

    _removeInputField();
}

function _removeInputField() {
    $('#product_id').val('');
    $('#product_price').val('');
    $('#input_name').val('');
    $('#input_carton').val('');
}

function _deleteProduct(elem) {
    var subtotal = $(elem).closest('tr').find('td:nth-child(5)').text();
    _calcTotal('minus', _removeMoneySeparator(subtotal));
    $(elem).closest('tr').remove();
}

function _calcTotal(STATUS, SUBTOTAL) {
    var total_temp = _removeMoneySeparator($('#total_price').val());
    $('#total_price').val('');
    // var subtotal = _removeMoneySeparator(SUBTOTAL);
    if (STATUS.toLowerCase() === 'plus'){
        var total = parseInt(total_temp) + parseInt(SUBTOTAL);
        $('#total_price').val(_moneySeparatorNoKeyCode(total));
    }

    if (STATUS.toLowerCase() === 'minus'){
        var total = parseInt(total_temp) - parseInt(SUBTOTAL);
        $('#total_price').val(_moneySeparatorNoKeyCode(total));
    }
}

function _filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("table-search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var product_index = products_name.indexOf(inp.value);
                    $('#product_id').val(products_id[product_index]);
                    $('#product_price').val(products_price[product_index]);
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("input_name"), products_name);