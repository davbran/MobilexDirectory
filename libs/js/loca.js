<!-- Add department Modal -->
  <div class="modal" id="addDepartmentModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="addModalHeader">Add Department</h5>
          <button type="button" class="btn text-primary" data-dismiss="modal" aria-label="Close"><i class="far fa-window-close"></i></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form class="mb-3 row">
          <div class="mb-3">
            <label class="visually-hidden" for="addDepartment">Department Name</label>
            <input type="text" class="form-control" placeholder="Department Name" aria-label="department">
          </div>
          
          <div class="mb-3">
            <label class="visually-hidden" for="locationSelect">Location</label>
            <select class="form-select" id="locationSelect">
            </select>
          </div>
          </form>
        </div>
        <div class="modal-footer"></div>
        <button type="submit" class="btn btn-light text-primary"><i class="far fa-plus-square"></i>&nbspAdd department</button>
        <button type="button" class="btn btn-light text-primary" data-dismiss="modal" aria-label="Close">
          <i class="far fa-window-close"></i>&nbsp Cancel</button>
      </div>
    </div>
  </div>