var distributor_id = [];
var distributor_name = [];

$(document).ready(function () {
    _loadData();
    //
    // _loadProduct();

    $('#pay_nominal').keyup(function () {
        $('#pay_nominal').val(_moneySeparator($('#pay_nominal').val()));
    });

    _calcTableHeight(360);
});

function _chooseByDistributor() {
    $('.step-1').removeClass('display-none');
    $('.step-2').addClass('display-none');
}

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
                    distributor_id.push(responseJson.message[i].id);
                    distributor_name.push(responseJson.message[i].name);
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _searchByDistributor(){
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "sales_by_distributor",
        id: $('#distributor_id').val()
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
            $("#table-body").text("");
            if(responseJson.status.toString() === global_var.STATUS_ERROR.toString()){
                alert(responseJson.message);
            }

            if(responseJson.status.toString() === global_var.STATUS_SUCCESS.toString()){
                for(var i=0; i<responseJson.message.length; i++){
                    $("#table-body").append(
                        "<tr>" +
                        "<td>"+responseJson.message[i].nota_number+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].date+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].total+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].paid+"</td>" +
                        "<td id='"+responseJson.message[i].nota_number+"' onclick=\"_setActiveNotaNumber(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Choose</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _setActiveNotaNumber(element){
    var nota_number = element.id;
    $('#nota_number').val(nota_number);

    $('.step-1').addClass('display-none');
    $('.step-2').removeClass('display-none');

    _searchByNotaNumber();

}

async function _searchByNotaNumber() {
    await _load_header($('#nota_number').val());
}

function _load_header(NOTA_NUMBER) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "sales",
        id: NOTA_NUMBER,
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
                    // $('#distributor_id').val(responseJson.message[i].sales_id_distributor);
                    $('#distributor_name_2').val(responseJson.message[i].distributor_name);
                    $('#sales_date').val(responseJson.message[i].date);
                    $('#total_price').val(responseJson.message[i].total);
                    $('#total_paid').val(responseJson.message[i].paid);
                    $('#total_debt').val(_moneySeparatorNoKeyCode(parseInt(_removeMoneySeparator(responseJson.message[i].total)) - parseInt(_removeMoneySeparator(responseJson.message[i].paid))));
                    $('#sales_id').val(responseJson.message[i].sales_id);
                }
                _load_detail($('#sales_id').val());
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _load_detail(ID_SALES) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'load_data';

    const data = {
        table: "sales_detail",
        id: ID_SALES,
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
                $("#table-body-product").text("");
                for(var i=0; i<responseJson.message.length; i++){
                    $("#table-body-product").append(
                        "<tr>" +
                        "<td class='display-none'>"+responseJson.message[i].sd_id+"</td>" +
                        "<td class='display-none'>"+responseJson.message[i].sd_id_product+"</td>" +
                        "<td>"+responseJson.message[i].product_name+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].sd_quantity+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].sd_price+"</td>" +
                        "<td class='text-right'>"+responseJson.message[i].sd_total+"</td>" +
                        // "<td id='contents-transaction-purchase-detail-"+responseJson.message[i].id+"' onclick=\"_setActiveSidebar(this)\" class=\"text-center width width-80 color-green1 cursor-pointer\">Info</td>" +
                        "</tr>"
                    )
                }
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _btn_pay() {
    var debt = _removeMoneySeparator($('#total_debt').val());
    var payment = _removeMoneySeparator($('#pay_nominal').val());

    if (parseInt(payment) > parseInt(debt)){
        alert('Total payment cannot exceed debt.');
    } else {
        _pay($('#sales_id').val(), _moneySeparatorNoKeyCode(payment));
    }
}

function _pay(ID_SALES, NOMINAL) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'add_data';

    const data = {
        table: "payment",
        id_sales: ID_SALES,
        nominal: NOMINAL,
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
                _updateSalesPaid(responseJson.message, ID_SALES, NOMINAL);
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
}

function _updateSalesPaid(ID_PAYMENT, ID_SALES, NOMINAL) {
    const global_var = remote.getGlobal('globalVariable');

    const api = global_var.local_api_ip;
    const url = api + 'update_data';

    var temp_paid = _removeMoneySeparator($('#total_paid').val());
    temp_paid = parseInt(temp_paid) + parseInt(_removeMoneySeparator(NOMINAL));

    const data = {
        table: "sales_paid",
        id: ID_SALES,
        id_payment: ID_PAYMENT,
        paid: _moneySeparatorNoKeyCode(temp_paid),
        new_paid: NOMINAL
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
                alert(responseJson.message);
                $('#pay_nominal').val('');
                $('#btn_search_by_nota_number').click();
            }
        })
        .catch((error) => {
            alert('Error : ' + error);
        });
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
                    var distributor_index = distributor_name.indexOf(inp.value);
                    $('#distributor_id').val(distributor_id[distributor_index]);
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

autocomplete(document.getElementById("distributor_name"), distributor_name);