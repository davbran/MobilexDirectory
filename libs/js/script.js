//Initiate table with datatables
let table = $('#dataTable').DataTable();

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
          "paging": false,
          "searching": true,

          "order": [[1, "asc"]],
          "info": false,
          "scrollY": "73vh",
          "dom": '<"top">ft',
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
          .append('<option selected disabled=true value="0">Department</option>');

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
          "paging": false,
          "searching": true,
          "order": [[1, "asc"]],
          "info": false,
          "dom": '<"top"f>rtip',
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
          .append('<option selected disabled=true value="0">Location</option>');

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
          "paging": false,
          "searching": true,
          "order": [[1, "asc"]],
          "info": false,
          "dom": '<"top"f>rtip',
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
               icon: 'error',
               toast: true,
          });
          return;
     }
     if ($("#addSurname").val() == '') {
          swal.fire({
               text: "Please enter Surname",
               icon: 'error',
               toast: true,
          });
          return;
     }
     if ($("#addEmail").val() == '') {
          swal.fire({
               text: "Please enter Email address",
               icon: 'error',
               toast: true,
          });
          return;
     }

     swal.fire({
          title: "New Personnel",
          text: `Confirm new employee ${$("#addFirstName").val()} ${$("#addSurname").val()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
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
          }
     })
     $('#addEmployeeModal').modal('hide');

});

// Add Department
$("#addDepBtn").click(function () {
     if ($("#addDepartmentSelect").val() == '') {
          swal.fire({
               text: "Please enter Department Name",
               icon: 'error',
               toast: true,
          });
          return;
     }
     if ($("#addDepLocSelect :selected").val() == '0') {
          swal.fire({
               text: "Please choose Location",
               icon: 'error',
               toast: true,
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
               icon: 'error',
               toast: true,
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
                    icon: 'error',
                    toast: true,
               });
               return;
          }
          if ($("#editSurname").val() == '') {
               swal.fire({
                    text: "Please enter Surname",
                    icon: 'error',
                    toast: true,
               });
               return;
          }
          if ($("#editEmail").val() == '') {
               swal.fire({
                    text: "Please enter Email address",
                    icon: 'error',
                    toast: true,
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


               }
          })

          $('#editEmployeeModal').modal('hide');
          reset();
     });

});

$("#editDepSelect").change(function () {
     $('#editDepName').val($('#editDepSelect :selected').text());
     $('#editDepLocSelect').val($("#editDepSelect :selected").data('locationid'));
})


$("#editDepBtn").click(function () {

     if ($("#editDepSelect :selected").val() == "0") {
          swal.fire({
               text: "Please select department to edit",
               icon: 'error',
               toast: true,
          });
          return;
     }

     swal.fire({
          title: "Edit Department",
          text: `Confirm new department information for
          ${$("#editDepName").val()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
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
          }
     })
     $('#editDepartmentModal').modal('hide');
     reset();
});


$("#editLocBtn").click(function () {

     if ($("#editLocSelect :selected").val() == "0") {
          swal.fire({
               text: "Please select location to edit",
               icon: 'error',
               toast: true,
          });
          return;
     }

     swal.fire({
          title: "Edit Location",
          text: `Confirm new location information for ${$("#editLocSelect :selected").text()}`,
          icon: "info",
          showCloseButton: true,
          showCancelButton: true,
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
                              getAllLocations();

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
          }
     })

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
          title: `Delete ${employee.firstName} ${employee.lastName}?`,
          text: "This cannot be undone",
          icon: "warning",
          showCloseButton: true,
          showCancelButton: true,
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

          }
     })
     reset();
});

$("#delDepBtn").click(function () {

     if ($("#editDepSelect :selected").val() == "0") {
          swal.fire({
               text: "Please select department to delete",
               icon: 'error',
               toast: true,
          });
          return;
     }

     $.ajax({
          url: 'libs/php/getDepartmentCount.php',
          type: 'GET',
          dataType: "json",
          data: {
               departmentID: $("#editDepSelect").val(),
          },
          success: function (result) {
               console.log(result.data[0]["COUNT(id)"]);
               if (result.data[0]["COUNT(id)"] !== '0') {
                    swal.fire('Can not delete!',
                         `Department has ${result.data[0]["COUNT(id)"]} employees`,
                         'error');

               } else


                    swal.fire({
                         title: `Delete Department?`,
                         text: `Confirm Delete ${$("#editDepName").val()}, this cannot be undone?`,
                         icon: "warning",
                         showCloseButton: true,
                         showCancelButton: true,
                         confirmButtonText:
                              '<i class="fa fa-thumbs-up"></i>',
                         confirmButtonAriaLabel: 'Thumbs up',
                         cancelButtonText:
                              '<i class="fa fa-thumbs-down"></i>',
                         cancelButtonAriaLabel: 'Thumbs down'

                    }).then((willDelete) => {
                         if (willDelete.isConfirmed) {

                              $.ajax({
                                   url: "libs/php/deleteDepartmentById.php",
                                   type: "POST",
                                   dataType: "json",
                                   data: {

                                        departmentID: $("#editDepSelect").val(),
                                   },
                                   success: function (result) {
                                        if ((result.status.code == 400)) {
                                             swal.fire('Error',
                                                  result.status.description,
                                                  'error');

                                        } else if (result.status.code == 200) {
                                             getAllDepartments();
                                        }
                                   },
                                   error: function (result, textStatus, errorThrown) {
                                        swal.fire("Error ",
                                             result.status.description,
                                             "error");
                                   },
                              })
                         }
                    })
               $('#editDepartmentModal').modal('hide');
               reset();
          }
     })
});

$("#delLocBtn").click(function () {

     if ($("#editLocSelect :selected").val() == "0") {
          swal.fire({
               text: "Please select location to delete",
               icon: 'error',
               toast: true,
          });
          return;
     }

     $.ajax({
          url: 'libs/php/getLocationCount.php',
          type: 'GET',
          dataType: "json",
          data: {
               locationID: $("#editLocSelect").val(),
          },
          success: function (result) {
               console.log(result.data[0]["COUNT(id)"]);
               if (result.data[0]["COUNT(id)"] !== '0') {
                    swal.fire('Cannot delete!',
                         `Location has ${result.data[0]["COUNT(id)"]} departments`,
                         'error');

               } else


                    swal.fire({
                         title: `Delete ${$("#editLocSelect :selected").text()}?`,
                         text: `Confirm delete, this cannot be undone?`,
                         icon: "warning",
                         showCloseButton: true,
                         showCancelButton: true,
                         confirmButtonText:
                              '<i class="fa fa-thumbs-up"></i>',
                         confirmButtonAriaLabel: 'Thumbs up',
                         cancelButtonText:
                              '<i class="fa fa-thumbs-down"></i>',
                         cancelButtonAriaLabel: 'Thumbs down'

                    }).then((willDelete) => {
                         if (willDelete.isConfirmed) {

                              $.ajax({
                                   url: "libs/php/deleteLocationById.php",
                                   type: "POST",
                                   dataType: "json",
                                   data: {

                                        locationID: $("#editLocSelect").val(),
                                   },
                                   success: function (result) {
                                        if ((result.status.code == 400)) {
                                             swal.fire('Error',
                                                  result.status.description,
                                                  'error');

                                        } else if (result.status.code == 200) {
                                             getAllLocations();
                                        }
                                   },
                                   error: function (result, textStatus, errorThrown) {
                                        swal.fire("Error ",
                                             result.status.description,
                                             "error");
                                   },
                              })
                         }
                    })
               $('#editLocationModal').modal('hide');
               reset();
          }
     })
});

function resetEditDepartment() {
     document.getElementById('editDepSelect').selectedIndex = 0;
     document.getElementById('editDepName').value = "";
     document.getElementById('editDepLocSelect').selectedIndex = 0;
}

$('#editDepModalBtn').on('click', resetEditDepartment);


$("#navbar-toggle").click(function() {
     $("#dataTable_wrapper").toggleClass("expanded");
}); 


$(document).ready(function () {

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

