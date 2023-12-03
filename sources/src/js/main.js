// header logic
var initHeader = () => {
  var menu_dropdown_btns = Array.from(
    document.querySelectorAll(".header_art6__show")
  );
  var menu_dropdown_items = menu_dropdown_btns.map((btn) => btn.closest("li"));

  if (window.innerWidth > 767) {
    menu_dropdown_btns.forEach((btn) =>
      btn.addEventListener("mouseover", () => {
        var li = btn.closest("li");
        li.classList.add("active");
      })
    );

    menu_dropdown_items.forEach((item) =>
      item.addEventListener("mouseleave", () => item.classList.remove("active"))
    );
  }
};

// ===== START JS LOGIC AFTER DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", function (event) {
  // init luxy library
  luxy.init();

  initHeader();
});
