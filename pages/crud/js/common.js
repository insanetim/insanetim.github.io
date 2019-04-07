$(document).ready(function() {
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tbody tr").each(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  var order = "fname", reverse = false;
  $("#fnameSort").click(function() {
    if (order == "fname" && reverse == false) {
      clearHead();
      $(this).addClass("up");
      reverse = true;
      refreshList(order, reverse);
    } else if (order == "fname" && reverse == true) {
      clearHead();
      $(this).addClass("down");
      reverse = false;
      refreshList(order, reverse);
    } else {
      order = "fname";
      clearHead();
      $(this).addClass("down");
      refreshList(order, reverse);
    }
  });
  $("#lnameSort").click(function() {
    if (order == "lname" && reverse == false) {
      clearHead();
      $(this).addClass("up");
      reverse = true;
      refreshList(order, reverse);
    } else if (order == "lname" && reverse == true) {
      clearHead();
      $(this).addClass("down");
      reverse = false;
      refreshList(order, reverse);
    } else {
      order = "lname";
      clearHead();
      $(this).addClass("down");
      refreshList(order, reverse);
    }
  });
  $("#mailSort").click(function() {
    if (order == "mail" && reverse == false) {
      clearHead();
      $(this).addClass("up");
      reverse = true;
      refreshList(order, reverse);
    } else if (order == "mail" && reverse == true) {
      clearHead();
      $(this).addClass("down");
      reverse = false;
      refreshList(order, reverse);
    } else {
      order = "mail";
      clearHead();
      $(this).addClass("down");
      refreshList(order, reverse);
    }
  });
  $("#myInput").blur(function() {
    $(this).val("");
    $("#myTable tbody tr").toggle(true);
  });
  refreshList(order);
  $("#addCust").click(function(event) {
    event.preventDefault();
    addCustomer();
  });
  function refreshList(order, reverse) {
    var customers = getCustomers();
    customers.sort(function(a, b) {
      var x = a[order].toLowerCase();
      var y = b[order].toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
    if (reverse) {
      customers.reverse();
    }
    var txt = "";
    for (i in customers) {
      txt += "<tr id='" + customers[i].id + "'><td class='fname'>";
      txt += customers[i].fname + "</td><td class='lname'>" + customers[i].lname
      + "</td><td class='mail'>" + customers[i].mail
      + "<span class='delBtn fa fa-trash'></span>";
      txt += "</td></tr>";
    }
    $("#myTable tbody").html(txt);
    $(".delBtn").click(function() {
      var id = $(this).parents("tr").attr("id");
      removeCustomer(id);
    });
    $("#myTable tbody tr td").dblclick(function(event) {
      var oldText = $(this).text();
      $("#editText").val(oldText);
      var id = $(this).parents("tr").attr("id");
      var key = $(this).attr("class");
      var customers = getCustomers();
      $("#modal").fadeIn();
      $("#saveBtn").click(function() {
        var newText = $("#editText").val();
        if (newText !== "") {
          for (i in customers) {
            if (customers[i].id == id) {
              customers[i][key] = newText;
            }
          }
          localStorage.setItem("customers", JSON.stringify(customers));
          refreshList(order, reverse);
          $("#modal").fadeOut();
        }
      });
      $("#cancelBtn").click(function() {
        $("#modal").fadeOut();
      });
    });
  }
  function getCustomers() {
    var custJSON = localStorage.getItem("customers");
    if (custJSON) {
      return JSON.parse(custJSON)
    } else {
      return []
    }
  }
  function addCustomer() {
    var customers = getCustomers();
    $(".alert").fadeOut("fast");
    var fnameVal = $("#fname").val();
    if (fnameVal === "") {
      $("#fname + span.alert").fadeIn()
      .delay(3000)
      .fadeOut();
    }
    var lnameVal = $("#lname").val();
    if (lnameVal === "") {
      $("#lname + span.alert").fadeIn()
      .delay(3000)
      .fadeOut();
    }
    var mailVal = $("#mail").val();
    if (mailVal === "") {
      $("#mail + span.alert").fadeIn()
      .delay(3000)
      .fadeOut();
    }
    if (fnameVal !== "" && lnameVal !== "" && mailVal !== "") {
      var newCust = {
        id: new Date().getTime(),
        fname: fnameVal,
        lname: lnameVal,
        mail: mailVal
      }
      customers.push(newCust);
      localStorage.setItem("customers", JSON.stringify(customers));
      clearInputs();
      refreshList(order, reverse);
    }
  }

  function removeCustomer(cust) {
    var customers = getCustomers();
    for (i in customers) {
      if (customers[i].id == cust) {
        customers.splice(i, 1);
      }
    }
    localStorage.setItem("customers", JSON.stringify(customers));
    refreshList(order, reverse);
  }
  function clearInputs() {
    $("#fname").val("");
    $("#lname").val("");
    $("#mail").val("");
  }
  function clearHead() {
    $(".caret").removeClass("down");
    $(".caret").removeClass("up");
  }
  $("#rldBtn").click(function() {
    location.reload();
  });
});
