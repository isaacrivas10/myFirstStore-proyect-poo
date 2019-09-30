
$(".sidebar-dropdown > a").click(
  function() {
    $(".sidebar-submenu").slideUp(200);
    if ($(this).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(this).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this).next(".sidebar-submenu").slideDown(200);
      $(this).parent().addClass("active");
    }
  }
);

$("#close-sidebar").click(
  function() {
    $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  }
);


load= {
  profileDashboard: ()=>{
    $('#main-profile').empty();
    $('#main-profile').html(
    `<div class="row">
    <div class="col-lg-4 text-center">
      <div>
        <img class="img-fluid w-50 h-50 rounded-circle border-white" src="../img/user.jpg" alt="user img">
      </div>
      <div class="pre-card text-center">
        <div class="card-body">
          <h4 class="card-title">Isaac Rivas</h4>
          <p class="card-text">
            <ul>
              <li>
                <i class="fas fa-briefcase"></i> Senior Programmer
              </li>
              <li>
                <i class="fa fa-map-marker"></i> Universidad Nacional Autonoma de Honduras
              </li>
            </ul>
          </p>                  
        </div>
        <div class="container text-left">
            <h6 >ABOUT</h6>
            <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo architecto itaque distinctio ullam id omnis quas natus autem ipsa accusantium.
            </p>
        </div>
        <div class="container text-left">
            <h6>Connect</h6>
            <a href="#" class="fab fa-facebook"></a>
            <a href="#" class="fab fa-twitter"></a>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-dark rounded shadow-sm">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Profile Overview</h6>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="border-bottom border-gray pb-2 mb-0">Recent updates</h6>
        <div class="media text-muted pt-3">
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">Tuesday </strong>
            Posted a product
          </p>
        </div>
        
        <small class="d-block text-right mt-3">
          <a href="#">All updates</a>
        </small>
      </div>
    </div>
  </div>`);
  }
};

(()=>{
  $("#close-sidebar").trigger('click');
  load.profileDashboard();
})();
