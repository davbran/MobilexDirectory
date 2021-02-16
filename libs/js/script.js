//Initiate table with datatables
let table = $('#dataTable').DataTable();

let tableOptions = {
     "paging": true,
     "lengthChange": true,
     "searching": true,
     "processing": true,
     "ordering": true,
     "info": false,
     "pageLength": 25,
     "dom": '<"top"f>rtip'
};

//Reset search dropdowns
function reset() {
     document.getElementById(
          'departments',
          'departmentSelect',
          'addEmpDepSelect',
          'editEmpDep',
          'editDepSelect',
          'locations',
          'locationSelect',
          'editLocSelect',
          'addDepLocSelect')
          .selectedIndex = 0;
};

$('.btn-cancel').click(reset);

//View all
const getAll = () => {
     //reset search bar
     reset();
     //reset table
     table.destroy();

     table = $('#dataTable').DataTable({

          "pageLength": 25,

          "ajax": {
               "url": "libs/php/getAll.php",
               "type": "POST",
               "datatype": "json"
          },
          error: function (result, textStatus, errorThrown) {
               swal.fire("Error retrieving data",
                    result.status.description,
                    "error");
          },

          columns: [
               { 'data': 'id', 'visible': false },
               { 'data': 'lastName' },
               { 'data': 'firstName' },
               { 'data': 'jobTitle' },
               { 'data': 'email' },
               { 'data': 'department' },
               { 'data': 'departmentID', 'visible': false },
               { 'data': 'location' },
               {
                    "data": null, render: function (data, type, row) {
                         return "<button title='Edit' class='btn btn-edit alert-success btn-xs'><i class='far fa-edit'></i></button>&nbsp&nbsp<button title='Delete' class='btn btn-delete alert-danger btn-xs'><i class='far fa-trash-alt'></i></button>";
                    }
               }
          ]
     });
};

$('#showAll').click(getAll);

//Get all departments
const getAllDepartments = () => {
     reset();
     $('#departments, #departmentSelect, #addEmpDepSelect, #editEmpDep, #editDepSelect')
          .empty();

     $('#departments, #departmentSelect, #addEmpDepSelect, #editEmpDep, #editDepSelect')
          .append('<option selected disabled=true>Department</option>');

     $.ajax({
          url: 'libs/php/getAllDepartments.php',
          type: 'GET',
          dataType: "json",

          success: function (result) {
               const data = result.data;
               $.each(data, function (i, value) {

                    $('#departments, #departmentSelect, #addEmpDepSelect, #editEmpDep, #editDepSelect')
                         .append(`<option value="${value.id}" data-locationID="${value.locationID}"/>${value.name}</option>`);
               })


          },
          error: function (result, textStatus, errorThrown) {
               swal.fire("Error retrieving data",
                    result.status.description,
                    "error");
          },

     })
};

// View by Department
$('#departments').change(function () {

     const depID = $('#departments').val();

     document.getElementById("locations").selectedIndex = 0;

     table.destroy();

     table = $('#dataTable').DataTable({
          "pageLength": 25,
          "ajax": {
               "url": "libs/php/getAllByDepartment.php",
               "type": "POST",
               "datatype": "json",
               "data": {
                    "depID": depID
               },
          },
          error: function (result, textStatus, errorThrown) {
               swal.fire("Error retrieving departments",
                    result.status.description,
                    "error");
          },

          columns: [
               { 'data': 'id', 'visible': false },
               { 'data': 'lastName' },
               { 'data': 'firstName' },
               { 'data': 'jobTitle' },
               { 'data': 'email' },
               { 'data': 'department' },
               { 'data': 'departmentID', 'visible': false },
               { 'data': 'location' },
               {
                    "data": null, render: function (data, type, row) {
                         return "<button title='Edit' class='btn btn-edit alert-success btn-xs'><i class='far fa-edit'></i></button>&nbsp&nbsp<button title='Delete' class='btn btn-delete alert-danger btn-xs'><i class='far fa-trash-alt'></i></button>";
                    }
               }
          ]
     });
});

// get Locations
const getAllLocations = () => {
     reset();
     $('#locations, #locationSelect, #editLocSelect, #addDepLocSelect, #editDepLocSelect')
          .empty();

     $('#locations, #locationSelect, #editLocSelect, #addDepLocSelect, #editDepLocSelect')
          .append('<option selected disabled=true>Location</option>');

     $.ajax({
          url: 'libs/php/getAllLocations.php',
          type: 'GET',
          dataType: "json",

          success: function (result) {
               const data = result.data;

               $.each(data, function (i, value) {
                    $('#locations, #editLocSelect, #locationSelect, #addDepLocSelect, #editDepLocSelect')
                         .append(`<option value="${value.id}"/>${value.name}</option>`);
               })
          },
          error: function (result, textStatus, errorThrown) {
               swal.fire("Error retrieving locations",
                    result.status.description,
                    "error");
          }
     })
};

// View by location
$('#locations').change(function () {

     const locID = $('#locations').val();

     document.getElementById("departments").selectedIndex = 0;

     table.destroy();

     table = $('#dataTable').DataTable({
          "pageLength": 25,
          "ajax": {
               "url": "libs/php/getAllByLocation.php",
               "type": "POST",
               "datatype": "json",
               "data": {
                    "locId": locID
               },
          },
          error: function (request, textStatus, errorThrown) {
               swal.fire("Error",
                    request.status.description,
                    "error");
          },

          columns: [
               { 'data': 'id', 'visible': false },
               { 'data': 'lastName' },
               { 'data': 'firstName' },
               { 'data': 'jobTitle' },
               { 'data': 'email' },
               { 'data': 'department' },
               { 'data': 'departmentID', 'visible': false },
               { 'data': 'location' },
               {
                    "data": null, render: function (data, type, row) {
                         return "<button title='Edit' class='btn btn-edit alert-success btn-xs'><i class='far fa-edit'></i></button>&nbsp&nbsp<button title='Delete' class='btn btn-delete alert-danger btn-xs'><i class='far fa-trash-alt'></i></button>";
                    }
               }
          ]
     });
});

//Add Employee
$("#addEmpBtn").click(function () {
     if ($("#addFirstName").val() == '') {
          swal.fire({
               text: "Please enter First Name",
               icon: 'error'
          });
          return;
     }
     if ($("#addSurname").val() == '') {
          swal.fire({
               text: "Please enter Surname",
               icon: 'error'
          });
          return;
     }
     if ($("#addEmail").val() == '') {
          swal.fire({
               text: "Please enter Email address",
               icon: 'error'
          });
          return;
     }

     swal.fire({
          title: "New Personnel",
          text: `Confirm new employee:
          ${$("#addFirstName").val()} ${$("#addSurname").val()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willAdd) => {
          if (willAdd.isConfirmed) {

               $.ajax({
                    url: "libs/php/insertEmployee.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                         firstName: $("#addFirstName").val(),
                         lastName: $("#addSurname").val(),
                         jobTitle: $("#addJobTitle").val(),
                         email: $("#addEmail").val(),
                         departmentID: $("#addEmpDepSelect").val(),
                    },
                    success: function (result) {

                         if (result.status.code == 200) {
                              swal.fire("Success",
                                   "New employee added",
                                   "success");
                              getAll();

                         } else {
                              swal.fire("Error trying to add employee",
                                   result.status.description,
                                   "error");
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ", result.status.description, "error");
                    },
               })
          } else {
               swal.fire("Employee not added");
          }
     })
     $('#addEmployeeModal').modal('hide');

});

// Add Department
$("#addDepBtn").click(function () {
     if ($("#addDepartmentSelect").val() == '') {
          swal.fire({
               text: "Please enter Department Name",
               icon: 'error'
          });
          return;
     }
     if ($("#addDepLocSelect :selected").val() == '') {
          swal.fire({
               text: "Please choose Location",
               icon: 'error'
          });
          return;
     }

     swal.fire({
          title: "New Department",
          text: `Confirm new department:
          ${$("#addDepartmentSelect").val()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willAdd) => {
          if (willAdd.isConfirmed) {

               $.ajax({
                    url: "libs/php/insertDepartment.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                         name: $("#addDepartmentSelect").val(),
                         locationID: $("#addDepLocSelect").val(),
                    },
                    success: function (result) {
                         if (result.status.code == 200) {
                              swal.fire("Success",
                                   "New Department added",
                                   "info");
                              getAllDepartments();

                         } else {
                              swal.fire("Error ",
                                   result.status.description,
                                   "error")
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ",
                              result.status.description,
                              "error");
                    },

               })

          } else {
               swal.fire({
                    icon: 'info',
                    text: "Department not added"
               });

          }
     })

     $('#addDepartmentModal').modal('hide');
     reset();
});

// Add Location
$("#addLocBtn").click(function () {
     if ($("#addLocationSelect").val() == '') {
          swal.fire({
               text: "Please enter Location Name",
               icon: 'error'
          });
          return;
     }


     swal.fire({
          title: "New Location",
          text: `Confirm new Location:
          ${$("#addLocationSelect").val()}`,
          icon: "warning",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'


     }).then((willAdd) => {
          if (willAdd.isConfirmed) {

               $.ajax({
                    url: "libs/php/insertLocation.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                         name: $("#addLocationSelect").val(),

                    },

                    success: function (result) {


                         if (result.status.code == 200) {
                              swal.fire(
                                   "Success",
                                   "New Location added",
                                   "success");
                              getAllLocations();

                         } else {
                              swal.fire("Error ",
                                   result.status.description,
                                   "error")
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ",
                              result.status.description,
                              "error");
                    },

               })

          } else {
               swal.fire({
                    icon: 'info',
                    text: "Location not added"
               });

          }
     })

     $('#addLocationModal').modal('hide');
     reset();
});

//Edit Employee
$(document).on("click", ".btn-edit", function () {
     let current_row = $(this).parents('tr');
     if (current_row.hasClass('child')) {
          current_row = current_row.prev();
     }
     let employee = table.row(current_row).data();

     $('#editEmployeeModal').modal('toggle');

     $('#editFirstName').val(employee.firstName);
     $('#editSurname').val(employee.lastName);
     $('#editJobTitle').val(employee.jobTitle);
     $('#editEmail').val(employee.email);
     $('#editEmpDep').val(employee.departmentID);


     $("#editEmpBtn").click(function () {
          if ($("#editFirstName").val() == '') {
               swal.fire({
                    text: "Please enter First Name",
                    icon: 'error'
               });
               return;
          }
          if ($("#editSurname").val() == '') {
               swal.fire({
                    text: "Please enter Surname",
                    icon: 'error'
               });
               return;
          }
          if ($("#editEmail").val() == '') {
               swal.fire({
                    text: "Please enter Email address",
                    icon: 'error'
               });
               return;
          }

          swal.fire({
               title: "Edit Personnel",
               text: `Confirm new employee information for:
               ${$("#editFirstName").val()} ${$("#editSurname").val()}`,
               icon: "info",
               showCloseButton: true,
               showCancelButton: true,
               focusConfirm: false,
               confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i>',
               confirmButtonAriaLabel: 'Thumbs up',
               cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i>',
               cancelButtonAriaLabel: 'Thumbs down'

          }).then((willEdit) => {
               if (willEdit.isConfirmed) {

                    $.ajax({
                         url: "libs/php/updateEmployee.php",
                         type: "POST",
                         dataType: "json",
                         data: {
                              employeeID: employee.id,
                              firstName: $("#editFirstName").val(),
                              lastName: $("#editSurname").val(),
                              jobTitle: $("#editJobTitle").val(),
                              email: $("#editEmail").val(),
                              departmentID: $("#editEmpDep").val(),

                         },

                         success: function (result) {
                              console.log(result);

                              if (result.status.code == 200) {
                                   swal.fire("Success",
                                        "Employee edited",
                                        "success");
                                   getAll();



                              } else {
                                   swal.fire("Error trying to edit employee",
                                        result.status.description,
                                        "error");
                              }
                         },
                         error: function (result, textStatus, errorThrown) {
                              swal.fire("Error ",
                                   result.status.description,
                                   "error");
                         },

                    })


               } else {
                    swal.fire({
                         icon: 'info',
                         text: "edit Employee Cancelled"
                    });

               }
          })


          $('#editEmployeeModal').modal('hide');
          reset();
     });


});

$("#editDepSelect").change(function () {
     console.log($("#editDepSelect :selected").data('locationid'));

     $('#editDepName').val($('#editDepSelect :selected').text());
     $('#editDepLocSelect').val($("#editDepSelect :selected").data('locationid'));
})

$("#editDepBtn").click(function () {

     swal.fire({
          title: "Edit Department",
          text: `Confirm new Department information for:
          ${$("#editDepName").val()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willEdit) => {
          if (willEdit.isConfirmed) {

               $.ajax({
                    url: "libs/php/updateDepartment.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                         departmentName: $("#editDepName").val(),
                         locationID: $("#editDepLocSelect").val(),
                         departmentID: $("#editDepSelect").val(),


                    },

                    success: function (result) {
                         console.log(result);

                         if (result.status.code == 200) {
                              swal.fire("Success",
                                   "Department edited",
                                   "success");
                              getAllDepartments();



                         } else {
                              swal.fire("Error trying to edit Department",
                                   result.status.description,
                                   "error");
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ",
                              result.status.description,
                              "error");
                    },
               })
          } else {
               swal.fire({
                    icon: 'info',
                    text: "Edit Department Cancelled"
               });
          }
     })

     $('#editDepartmentModal').modal('hide');
     reset();
});


$("#editLocBtn").click(function () {

     swal.fire({
          title: "Edit Location",
          text: `Confirm new Location information for:
          ${$("#editLocName").val()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willEdit) => {
          if (willEdit.isConfirmed) {

               $.ajax({
                    url: "libs/php/updateLocation.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                         locationName: $("#editLocName").val(),
                         locationID: $("#editLocSelect").val(),
                    },
                    success: function (result) {

                         if (result.status.code == 200) {
                              swal.fire("Success",
                                   "Location edited",
                                   "success");
                         } else {
                              swal.fire("Error trying to edit Location",
                                   result.status.description,
                                   "error");
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ", result.status.description, "error");
                    },
               })
          } else {
               swal.fire({
                    icon: 'info',
                    text: "Edit Location Cancelled"
               });
          }
     })
     getAllLocations();
     $('#editLocationModal').modal('hide');
     reset();
});



// Delete employee

$(document).on("click", ".btn-delete", function () {
     let current_row = $(this).parents('tr');
     if (current_row.hasClass('child')) {
          current_row = current_row.prev();
     }
     let employee = table.row(current_row).data();


     swal.fire({
          title: "Delete Employee?",
          text: "This cannot be undone",
          icon: "warning",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willDelete) => {
          if (willDelete.isConfirmed) {

               $.ajax({
                    url: "libs/php/deleteEmployeeById.php",
                    type: "POST",
                    data: {
                         empID: employee.id,
                    },
                    success: function (result) {

                         if (result.status['code'] == 200) {
                              swal.fire("Success",
                                   "Employee file deleted",
                                   "success");
                              getAll();


                         } else {
                              swal.fire("Error deleting employee : ",
                                   result.status.description,
                                   "error")
                         }

                    },
                    error: function (result, request, textStatus, errorThrown) {
                         swal.fire("Error" + result.code, result.description);

                    }
               })

          } else {
               swal.fire({
                    icon: 'info',
                    text: "Delete Employee Cancelled"
               });
          }
     })
     reset();

});

$("#delDepBtn").click(function () {

     swal.fire({
          title: "Delete department?",
          text: 'Confirm Delete Department, this cannot be undone?',
          icon: "warning",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willDelete) => {
          if (willDelete.isConfirmed) {

               $.ajax({
                    url: "libs/php/deleteDepartment.php",
                    type: "POST",
                    dataType: "json",
                    data: {

                         departmentID: $("#editDepSelect").val(),

                    },

                    success: function (result) {


                         if (result.status.code == 200) {
                              swal.fire('Success!',
                                   'Department Deleted',
                                   'success');
                              getAllDepartments();



                         } else {
                              swal.fire('Error',
                                   result.status.description,
                                   'error');
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ",
                              result.status.description,
                              "error");
                    },

               })


          } else {
               swal.fire({
                    icon: 'info',
                    text: "Delete Department Cancelled"
               });

          }
     })

     $('#editDepartmentModal').modal('hide');
     reset();
});



$("#delLocBtn").click(function () {

     swal.fire({
          title: "Delete Location?",
          text: 'Confirm Delete Location, this cannot be undone?',
          icon: "warning",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText:
               '<i class="fa fa-thumbs-up"></i>',
          confirmButtonAriaLabel: 'Thumbs up',
          cancelButtonText:
               '<i class="fa fa-thumbs-down"></i>',
          cancelButtonAriaLabel: 'Thumbs down'

     }).then((willDelete) => {
          if (willDelete.isConfirmed) {

               $.ajax({
                    url: "libs/php/deleteLocation.php",
                    type: "POST",
                    dataType: "json",
                    data: {

                         locationID: $("#editLocSelect").val(),

                    },

                    success: function (result) {


                         if (result.status.code == 200) {
                              swal.fire('Success!',
                                   'Location Deleted',
                                   'success');
                              getAllLocations();


                         } else {
                              swal.fire('Error',
                                   `${result.status.description}`,
                                   'error');
                         }
                    },
                    error: function (result, textStatus, errorThrown) {
                         swal.fire("Error ", result.status.description, "error");
                    },

               })


          } else {
               swal.fire({
                    icon: 'info',
                    text: "Delete Location Cancelled"
               });

          }
     })
     $('#editLocationModal').modal('hide');
     reset();
});

function resetEditDepartment() {
     document.getElementById('editDepSelect').selectedIndex = 0;
     document.getElementById('editDepName').value = "";
     document.getElementById('editDepLocSelect').selectedIndex = 0;
}

$('#editDepModalBtn').click(resetEditDepartment);


$(document).ready(function () {

     //login alert

     Swal.fire({
          title: 'Mobilex Admin Login',
          allowOutsideClick: false,
          position: 'center',
          grow: 'fullscreen',
          backdrop:true,
          heightAuto: false,
          
          background: '#212529',
          html: `<input type="text" id="login" class="form-control" placeholder="Username">
          <input type="password" id="password" class="form-control" placeholder="Password">`,
          confirmButtonText: 'Sign in',
          focusConfirm: false,
          
          preConfirm: () => {
               const login = Swal.getPopup().querySelector('#login').value
               const password = Swal.getPopup().querySelector('#password').value
               if (!login || !password) {
                    Swal.showValidationMessage(`Please enter login and password`)
               }
               else if (login !== "admin" || password !== "password") {
                    Swal.showValidationMessage(`Login or password not found on system`)
               }
               else if (login == "admin" && password == "password") {
                    return { login: login, password: password }
               }
          }

     }).then((result) => {
          Swal.fire(`
            Logged in as ${result.value.login}
          `.trim())
     })



     getAll();

     getAllDepartments();

     getAllLocations();

     window.setMobileTable = function (selector) {
          // if (window.innerWidth > 600) return false;
          const tableEl = document.querySelector(selector);
          const thEls = tableEl.querySelectorAll('thead th');
          const tdLabels = Array.from(thEls).map(el => el.innerText);
          tableEl.querySelectorAll('tbody tr').forEach(tr => {
               Array.from(tr.children).forEach(
                    (td, ndx) => td.setAttribute('label', tdLabels[ndx])
               );
          });
     }

     $(window).scroll(function () {
          if ($(document).scrollTop() > 150) {
               // Navigation Bar
               $('.navbar').removeClass('fadeIn');
               $('body').addClass('shrink');
               $('.navbar').addClass('animated fadeInDown');
          } else {
               $('.navbar').removeClass('fadeInDown');
               $('body').removeClass('shrink');
               $('.navbar').addClass('animated fadeIn');
          }
     });

});

