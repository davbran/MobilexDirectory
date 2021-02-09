
/* const departments = [], locations=[], firstName = [], lastName = [], jobTitle=[], 
email=[], department = [],  tableRow = []; */
let table = $('#dataTable').DataTable( {
 } );

 function reset(){
     document.getElementById("departments").selectedIndex = 0;
     document.getElementById("locations").selectedIndex = 0;
     };



const getAll = () => {


     $.ajax({
          url: 'libs/php/getAll.php',
          type: 'GET',
          dataType: "json",

          success: function (result) {
               
          document.getElementById("departments").selectedIndex = 0;
          document.getElementById("locations").selectedIndex = 0;


               table.destroy();

               table = $('#dataTable').DataTable({
                    data: result.data,
                    columns: [
                         { data: 'firstName' },
                         { data: 'lastName' },
                         { data: 'jobTitle' },
                         { data: 'email' },
                         { data: 'department' },
                         { data: 'location' },
                    ],

               });

          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log('An error has occured, please try again.');
               console.log(errorThrown);
          }
     })
};


const getAllDepartments = () => {
     $.ajax({
          url: 'libs/php/getAllDepartments.php',
          type: 'GET',
          dataType: "json",

          success: function (result) {
               const data = result.data;
              // console.log(data);

               $.each(data, function (i, value) {
                   // console.log (value.name);
                    $('#departments').append(`<option value="${value.id}"/>${value.name}</option>` );
                    $('#departmentSelect').append(`<option value="${value.id}">${value.name}</option>`);
          })
               

          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log('An error has occured, please try again.');
               console.log(errorThrown);
          }
     })
};


$('#departments').change(function(){

     const depId = $('#departments').val();

     $.ajax({
          url: 'libs/php/getAllByDepartment.php',
          type: 'GET',
          dataType: "json",
          data: {
               depID: depId
          },
          success: function (result) {
          
               document.getElementById("locations").selectedIndex = 0;
               table.destroy();

               table = $('#dataTable').DataTable({                    
                    data: result.data,
                    columns: [
                         { data: 'lastName' },
                         { data: 'firstName' },
                         { data: 'jobTitle' },
                         { data: 'email' },
                         { data: 'department' },
                         { data: 'location' },                        
                    ],
               });
          },

          error: function (jqXHR, textStatus, errorThrown) {
               console.log('An error has occured, please try again.');
               console.log(errorThrown);
          }
     })
});

const getAllLocations = () => {
     $.ajax({
          url: 'libs/php/getAllLocations.php',
          type: 'GET',
          dataType: "json",
 
          success: function (result) {
               const data = result.data;
              console.log(data);
 
               $.each(data, function (i, value) {
                   // console.log (value.name);
                    $('#locations').append(`<option value="${value.id}"/>${value.name}</option>` );
                    $('.locationSelect').append(`<option value="${value.id}">${value.name}</option>`);
 
               })
              
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log('An error has occured, please try again.');
               console.log(errorThrown);
          }
     })
 };
 
 
 $('#locations').change(function(){
 
     const locId = $('#locations').val();
 
     $.ajax({
          url: 'libs/php/getAllByLocation.php',
          type: 'GET',
          dataType: "json",
          data: {
               locId: locId
          },
          success: function (result) {
          
               table.destroy();
               document.getElementById("departments").selectedIndex = 0;
               table = $('#dataTable').DataTable({                    
                    data: result.data,
                    columns: [
                         { data: 'lastName' },
                         { data: 'firstName' },
                         { data: 'jobTitle' },
                         { data: 'email' },
                         { data: 'department' },
                         { data: 'location' },                        
                    ],
               });
          },
 
          error: function (jqXHR, textStatus, errorThrown) {
               console.log('An error has occured, please try again.');
               console.log(errorThrown);
          }
     })
 });
   

/* 
const getAllLocations = () => {
     $.ajax({
          url: 'libs/php/getAllLocations.php',
          type: 'GET',
          dataType: "json",

          success: function (result) {

               const data = result.data;
               const locations = [];

               for (i in data) {
                    locations.push(data[i].name)
               }
               // console.log(locations);

               $.each(locations, function (i, val) {
                    $('#locations').append(`<option class="dropdown-item" data-toggle="modal" data-target="#locationModal" value="${val}">${val}</option>`);
                    $('#locationSelect').append(`<option value="${data[i].id}">${data[i].name}</option>`);
               });
          },
          error: function (jqXHR, textStatus, errorThrown) {
               console.log('An error has occured, please try again.');
               console.log(errorThrown);
          }
     })
}; 

     const getAllByLocation = () => {
          $.ajax({
               url: 'libs/php/getAllByLocation.php',
               type: 'GET',
               dataType: "json",
               data: {
                    id: $('#location').val(),
               },
               success: function (result) {
                    console.log(result.data);
                    $('#dlocationModalTitle').html(result.data.location);
                    result.data.forEach(empl => {
                         $('#locationTableRow').append(`<tr><td>${empl.firstName}</td><td>${empl.lastName}</td><td>${empl.email}</td></tr>`);
                    });
               },
               error: function (jqXHR, textStatus, errorThrown) {
                    console.log('An error has occured, please try again.');
                    console.log(errorThrown);
               }
          })
     };  */
 


$(document).ready(function () {


     getAll();

     getAllDepartments();

     getAllLocations();

     $('#showAll').click(getAll);

     
});