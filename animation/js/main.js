// header logic
var initHeader = () => {
  /*== HEADER MENU LINKS WIDE SCREEN (>991px) ==*/

  // get header elements
  var menu_dropdown_items = Array.from(
    document.querySelectorAll(".header_art6__item-has-submenu")
  );

  var menu_dropdown_btns = Array.from(
    document.querySelectorAll(".header_art6__item-has-submenu button")
  );

  // descript header handlers
  var handleMenuBtns = (e) => {
    var li = e.target.closest("li");
    li.classList.add("active");
  };

  var handleDropdownItem = (e) => e.target.classList.remove("active");

  // add / remove header handlers
  var addHeaderWideScreenListeners = () => {
    menu_dropdown_btns.forEach((btn) =>
      btn.addEventListener("mouseover", handleMenuBtns)
    );

    menu_dropdown_items.forEach((item) =>
      item.addEventListener("mouseleave", handleDropdownItem)
    );
  };

  var removeHeaderWideScreenLIsteners = () => {
    menu_dropdown_btns.forEach((btn) =>
      btn.removeEventListener("mouseover", handleMenuBtns)
    );

    menu_dropdown_items.forEach((item) =>
      item.removeEventListener("mouseleave", handleDropdownItem)
    );
  };

  window.innerWidth > 991 && addHeaderWideScreenListeners();

  // toggle header handlers by resize
  var mq991 = window.matchMedia("(max-width: 991px)");

  var handleMQ = (e) => {
    e.matches
      ? removeHeaderWideScreenLIsteners()
      : addHeaderWideScreenListeners();
  };

  mq991.addEventListener("change", handleMQ);

  /*== TOGGLE SUBMENU ON MOBILE SCREEN ==*/
  var toggle_submenu_buttons = Array.from(
    document.querySelectorAll(".header_art6__mobile-item-has-submenu button")
  );

  var handleToggleSubmenuButtons = (e) => {
    var container = e.target.parentElement;
    var submenu = e.target.nextElementSibling;
    var isOpen = container.classList.contains("submenu-opened");

    if (!isOpen) {
      requestAnimationFrame(() => {
        container.classList.add("submenu-opened");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      });
    } else {
      requestAnimationFrame(() => {
        container.classList.remove("submenu-opened");
        submenu.style.maxHeight = 0;
      });
    }
  };

  toggle_submenu_buttons.forEach((btn) =>
    btn.addEventListener("click", handleToggleSubmenuButtons)
  );

  /*== TOGGLE HEADER MOBILE MENU ==*/
  var body = document.body;
  var header = document.getElementById("header");
  var burger_button = document.getElementById("burger-button");
  var submenues = document.querySelectorAll(
    ".header_art6__mobile-item-has-submenu ul"
  );

  burger_button.addEventListener("click", () => {
    header.classList.toggle("mobile-menu-open");
    body.classList.toggle("lock");
    submenues.forEach((submenu) => {
      requestAnimationFrame(() => {
        var container = submenu.parentElement;
        container.classList.remove("submenu-opened");
        submenu.style.maxHeight = 0;
      });
    });
  });

  // hide / show header by scroll

  var toggleHeaderByScroll = () => {
    let prevScroll = window.scrollY || document.documentElement.scrollTop;
    let curScroll;
    let direction = 0;
    let prevDirection = 0;

    const header = document.querySelector(".header_art6");

    var checkScroll = () => {
      /*
       ** Find the direction of scroll
       ** 0 - initial, 1 - up, 2 - down
       */

      curScroll = window.scrollY || document.documentElement.scrollTop;
      if (curScroll > prevScroll) {
        //scrolled up
        direction = 2;
      } else if (curScroll < prevScroll) {
        //scrolled down
        direction = 1;
      }

      if (direction !== prevDirection) {
        toggleHeader(direction, curScroll);
      }

      prevScroll = curScroll;
    };

    var toggleHeader = (direction, curScroll) => {
      if (direction === 2 && curScroll > 100) {
        if (!header.classList.contains("mobile-menu-open")) {
          header.classList.add("hide");
          prevDirection = direction;
        }
      } else if (direction === 1) {
        header.classList.remove("hide");
        prevDirection = direction;
      }
    };

    window.addEventListener("scroll", checkScroll);
  };

  toggleHeaderByScroll();
};

// ===== INIT SMOOTH SCROLL
var initSmothScroll = () => {
  window.innerWidth >= 992 && luxy.init();

  var handleMQ = (e) => {
    if (!e.matches) {
      luxy.init();
    }
  };

  var mq991 = window.matchMedia("(max-width: 991px)");

  mq991.addEventListener("change", handleMQ);
};

// ===== INIT SLIDER ON MAIN PAGE
var initTeamSlider = () => {
  var glide = new Glide(".scr_komanda_art6__slider", {
    type: "carousel",
    gap: 20,
    perView: 4,
    breakpoints: {
      1300: {
        perView: 3,
      },
      991: {
        perView: 2,
        gap: 48,
      },
      767: {
        perView: 2,
        gap: 20,
      },
      575: {
        perView: 1,
      },
    },
  });

  var btnNext = document.querySelector(".scr_komanda_art6__next");
  var btnPrev = document.querySelector(".scr_komanda_art6__prev");

  btnNext.addEventListener("click", function (event) {
    event.preventDefault();

    glide.go(">");
  });

  btnPrev.addEventListener("click", function (event) {
    event.preventDefault();

    glide.go("<");
  });

  glide.mount();
};

// ===== INIT ACCORDION FOR QUESTIONS (main page)
var initQuestionsAccordion = () => {
  var questions = Array.from(
    document.querySelectorAll(".scr_voprosy_art6__question")
  );
  var headings = questions.map((q) => q.children[0]);
  var texts = questions.map((q) => q.children[1]);

  // set start state
  var firstBlock = questions[0];
  var firstText = firstBlock.children[1];
  firstBlock.classList.add("active");
  firstText.style.maxHeight = firstText.scrollHeight + 25 + "px";

  var activeText = firstText;

  // add listeners to headings

  headings.forEach((h) =>
    h.addEventListener("click", () => {
      var parent = h.parentElement;
      var isActive = parent.classList.contains("active");
      var text = h.nextElementSibling;

      if (isActive) {
        parent.classList.remove("active");
        text.style.maxHeight = null;
        activeText = null;
      } else {
        questions.forEach((q) => q.classList.remove("active"));
        texts.forEach((t) => (t.style.maxHeight = null));
        parent.classList.add("active");
        text.style.maxHeight = text.scrollHeight + "px";
        activeText = text;
      }
    })
  );

  window.addEventListener(
    "resize",
    () =>
      activeText &&
      (activeText.style.maxHeight = activeText.scrollHeight + "px")
  );

  // TODO: update all elements by more_btn click
  // var more_btn = document.querySelector(".scr_voprosy_art6__more");
  // more_btn.addEventListener("click", initQuestionsAccordion);
};

// ===== INIT ACCORDION FOR TEMATICS (main page) AND FOOTER
var initAccordion = (group_class, heading_class) => {
  var groups = Array.from(document.querySelectorAll(group_class));
  var activeList = null;

  var accordionHandle = (e) => {
    var heading = e.target.closest(heading_class);

    if (heading) {
      var group = heading.parentElement;
      var isOnePerView = group.classList.contains("one-per-view");
      var list = heading.nextElementSibling;

      if (group.classList.contains("active")) {
        group.classList.remove("active");
        list.style.maxHeight = null;
        activeList = null;
      } else {
        if (isOnePerView) {
          groups.forEach((g) => {
            // remove class 'active' for every group element
            g.classList.remove("active");

            // set maxHeight property to 'null' for every description list
            g.children[1].style.maxHeight = null;
          });
        }

        // add class 'active' to current group and maxHeight to  curret description list
        group.classList.add("active");
        list.style.maxHeight = list.scrollHeight + "px";
        activeList = list;
      }
    }
  };

  var handleWindowResize = () =>
    activeList && (activeList.style.maxHeight = activeList.scrollHeight + "px");
  // toggle class 'active'
  var toggleAccordionByMatchMedia = () => {
    var handleMQ = (e) => {
      if (e.matches) {
        // groups[0].classList.add("active");
        groups.forEach((group) => {
          group.addEventListener("click", accordionHandle);
          window.addEventListener("resize", handleWindowResize);
        });
      } else {
        groups.forEach((group) => group.classList.remove("active"));
        groups.forEach((group) => {
          group.removeEventListener("click", accordionHandle);
          window.removeEventListener("resize", handleWindowResize);
        });
      }
    };

    var mq991 = window.matchMedia("(max-width: 991px)");

    mq991.addEventListener("change", handleMQ);
  };

  toggleAccordionByMatchMedia();

  // set init state
  if (window.innerWidth <= 991) {
    groups.forEach((group) => group.addEventListener("click", accordionHandle));
    // groups[0].classList.add("active");
    // activeList = groups[0].children[1];
    // groups[0].children[1].style.maxHeight =
    //   groups[0].children[1].scrollHeight + "px";
    window.addEventListener("resize", handleWindowResize);
  }
};

var toggleModal = (elements) => {
  const { buttons_open, client_modal, body, header, close_btn, overlay } =
    elements;

  buttons_open.forEach((btn) =>
    btn.addEventListener("click", () => {
      client_modal.classList.add("active");
      body.classList.add("lock");
    })
  );

  [close_btn, overlay].forEach((el) =>
    el.addEventListener("click", () => {
      client_modal.classList.remove("active");
      // if mobile menu is non-open than unlock body
      !header.classList.contains("mobile-menu-open") &&
        body.classList.remove("lock");
    })
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      client_modal.classList.remove("active");
      // if mobile menu is non-open than unlock body
      if (!header.classList.contains("mobile-menu-open")) {
        body.classList.remove("lock");
      }
    }
  });
};

// ===== ПЕРЕКЛЮЧЕНИЕ МОДАЛЬНОГО ОКНА "СТАТЬ КЛИЕНТОМ"
var toggleBecomeClient = () => {
  var btn = document.querySelector(".header_art6__cta"),
    btn_mobile = document.querySelector(".header_art6__mobile-cta"),
    client_modal = document.querySelector(".scr_b_client_art6"),
    body = document.body,
    close_btn = document.querySelector(".scr_b_client_art6__btn"),
    overlay = document.querySelector(".scr_b_client_art6__overlay"),
    header = document.querySelector(".header_art6");

  var elements = {
    buttons_open: [btn, btn_mobile],
    client_modal,
    body,
    header,
    close_btn,
    overlay,
  };

  toggleModal(elements);

  // [btn, btn_mobile].forEach((btn) =>
  //   btn.addEventListener("click", () => {
  //     client_modal.classList.add("active");
  //     body.classList.add("lock");
  //   })
  // );

  // [close_btn, overlay].forEach((el) =>
  //   el.addEventListener("click", () => {
  //     client_modal.classList.remove("active");
  //     // if mobile menu is non-open than unlock body
  //     !header.classList.contains("mobile-menu-open") &&
  //       body.classList.remove("lock");
  //   })
  // );

  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape") {
  //     client_modal.classList.remove("active");
  //     // if mobile menu is non-open than unlock body
  //     if (!header.classList.contains("mobile-menu-open")) {
  //       console.log("here");
  //       body.classList.remove("lock");
  //     }
  //   }
  // });
};

// ===== ПЕРЕКЛЮЧЕНИЕ МОДАЛЬНОГО ОКНА "ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ"
var toggleConsultationModal = () => {
  var btn = document.querySelector(".scr_text_director_art6__consultation"),
    client_modal = document.querySelector(".scr_b_consultation_art6"),
    body = document.body,
    close_btn = document.querySelector(".scr_b_consultation_art6__btn"),
    overlay = document.querySelector(".scr_b_consultation_art6__overlay"),
    header = document.querySelector(".header_art6");

  var elements = {
    buttons_open: [btn],
    client_modal,
    body,
    header,
    close_btn,
    overlay,
  };

  toggleModal(elements);
};

// ===== ПЕРЕКЛЮЧЕНИЕ МОДАЛЬНОГО ОКНА "ОТЗЫВОВ"
var handleShowReviewButtons = () => {
  var buttons = Array.from(
    document.querySelectorAll(".scr_klienty_onas_art6__pdf")
  );
  (client_modal = document.querySelector(".scr_review_modal")),
    (body = document.body),
    (close_btn = document.querySelector(".scr_review_modal__btn")),
    (overlay = document.querySelector(".scr_review_modal__overlay")),
    (header = document.querySelector(".header_art6")),
    (image = document.querySelector(".scr_review_modal__image img"));

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      image.src = btn.dataset.src;
    })
  );

  var elements = {
    buttons_open: buttons,
    client_modal,
    body,
    header,
    close_btn,
    overlay,
  };

  toggleModal(elements);
};

// ===== ВАЛИДАЦИЯ ФОРМ

var checkValidity = (elements) => {
  elements.forEach(
    (el) => el.validity.valueMissing && el.classList.add("error")
  );
};

var checkForm = (elements) =>
  elements.some((el) => el.classList.contains("error"));

var formValidation = () => {
  var forms = Array.from(document.forms);

  forms.forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      var requiredElements = Array.from(form.elements).filter((el) =>
        el.classList.contains("required")
      );

      if (requiredElements.length > 0) {
        checkValidity(requiredElements);

        if (checkForm(requiredElements)) {
          // console.log("Заполните все обязательные поля");
        } else {
          form.reset();

          // if current form into modal window than close modal
          var modal = form.closest(".modal_w");
          if (modal) {
            modal.classList.remove("active");
          }

          var msg = document.querySelector(".scr_success_msg_art6"),
            body = document.body;

          msg.classList.add("active");
          body.classList.add("lock");
        }
      }
    })
  );
};

var checkRequiredInputs = () => {
  var inputs = document.querySelectorAll(".required");

  var inputHandle = (input) => {
    input.value.length > 0
      ? input.classList.remove("error")
      : input.classList.add("error");
  };

  inputs.forEach((i) => i.addEventListener("input", () => inputHandle(i)));
};

var handleSuccessMsgModal = () => {
  var modal = document.querySelector(".scr_success_msg_art6"),
    body = document.body,
    close_btn = document.querySelector(".scr_success_msg_art6__btn"),
    overlay = document.querySelector(".scr_success_msg_art6__overlay"),
    header = document.querySelector(".header_art6");

  [close_btn, overlay].forEach((el) =>
    el.addEventListener("click", () => {
      modal.classList.remove("active");
      body.classList.remove("lock");
    })
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      // if mobile menu is non-open than unlock body
      if (!header.classList.contains("mobile-menu-open")) {
        body.classList.remove("lock");
      }
    }
  });
};

// ===== ВЫБОР ГОРОДА

var changeCity = () => {
  var btn = document.querySelector(".scr_footer_art6__offices"),
    body = document.body,
    modal = document.querySelector(".scr_cities_art6"),
    close_btn = document.querySelector(".scr_cities_art6__btn"),
    overlay = document.querySelector(".scr_cities_art6__overlay"),
    inputs = Array.from(document.querySelectorAll(".scr_cities_art6__input")),
    search = document.querySelector(".scr_cities_art6__search");

  btn.addEventListener("click", () => {
    modal.classList.add("active");
    body.classList.add("lock");
  });

  [close_btn, overlay].forEach((el) =>
    el.addEventListener("click", () => {
      modal.classList.remove("active");
      body.classList.remove("lock");
      search.value = "";
      inputs.forEach((i) => i.classList.remove("hidden"));
    })
  );

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      // if mobile menu is non-open than unlock body
      if (!header.classList.contains("mobile-menu-open")) {
        body.classList.remove("lock");
      }
      search.value = "";
      inputs.forEach((i) => i.classList.remove("hidden"));
    }
  });

  // handle city inputs
  inputs.forEach((i) =>
    i.addEventListener("click", () => {
      modal.classList.remove("active");
      body.classList.remove("lock");
      btn.children[1].textContent = i.value;
      search.value = "";
      inputs.forEach((i) => i.classList.remove("hidden"));
    })
  );

  // city searching
  search.addEventListener("input", () => {
    inputs.forEach((i) => {
      if (i.value.toLowerCase().includes(search.value.toLowerCase())) {
        i.classList.remove("hidden");
      } else {
        i.classList.add("hidden");
      }
    });
  });
};

// ===== АНИМАЦИЯ ПО СКРОЛЛУ

var startScrollingBlockAnimation = () => {
  var initScrollAnimation = (scroll, wrapper, containerName, startPosition) => {
    var scrolledBlock = document.querySelector(scroll);
    var container = document.querySelector(containerName);

    function getScrollAmount() {
      var scrolledBlockWidth = scrolledBlock.scrollWidth;
      var value = 0;
      if (window.innerWidth < 1280) {
        value = -(scrolledBlockWidth - Number(container.clientWidth - 80));
      } else {
        value = -(scrolledBlockWidth - Number(container.clientWidth) + 80);
      }

      return value;
    }

    // const tween = gsap.to(scrolledBlock, {
    //   x: getScrollAmount,
    //   duration: 3,
    //   ease: "none",
    // });

    // ScrollTrigger.create({
    //   trigger: wrapper,
    //   start: startPosition,
    //   end: () => `+=${getScrollAmount() * -1}`,
    //   // pin: true,
    //   // anticipatePin: 1,
    //   scrub: 1,
    //   pin: true,
    //   // anticipatePin: 1,
    //   // pinType: "fixed",
    //   // pinSpacing: true,
    //   animation: tween,
    //   invalidateOnRefresh: true,
    //   // markers: true,
    //   toggleActions: "play none none reverse",
    // });

    let mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
      gsap.to(scrolledBlock, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: startPosition,
          end: () => `+=${getScrollAmount() * -1}`,
          // pin: true,
          // anticipatePin: 1,
          scrub: 1.5,
          pin: true,
          // anticipatePin: 1,
          // pinType: "fixed",
          // pinSpacing: true,
          // animation: tween,
          invalidateOnRefresh: true,
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
    });
  };

  initScrollAnimation(
    ".scr_scrolling_right_art6__scroll",
    ".scr_scrolling_right_art6",
    ".scr_scrolling_right_art6 .container",
    "top 10%"
  );

  // initScrollAnimation(
  //   ".scr_uslugi_art6__title",
  //   ".scr_uslugi_art6",
  //   ".scr_uslugi_art6 .container",
  //   "top 30%"
  // );

  initScrollAnimation(
    ".scr_keysy_art6__title",
    ".scr_keysy_art6",
    ".scr_keysy_art6 .container",
    "top 30%"
  );

  initScrollAnimation(
    ".scr_text_director_art6__title",
    ".scr_text_director_art6",
    ".first_scr_main_art6 .container",
    "top -10%"
  );

  // initScrollAnimation(
  //   ".scr_tematiki_art6__title",
  //   ".scr_tematiki_art6__inner",
  //   ".scr_tematiki_art6 .container",
  //   "top 30%"
  // );

  initScrollAnimation(
    ".scr_company_art6__title",
    ".scr_company_art6",
    ".first_scr_main_art6 .container",
    "top top"
  );
};

var initAnimation = () => {
  var letter = document.querySelector(".first_word .letter");

  var mm = gsap.matchMedia();

  mm.add("(min-width: 992px)", () => {
    gsap.set(letter, { y: "-54%" });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scr_scrolling_right_art6",
        start: "45% center",
        end: "60% center",
        scrub: 1,
        pin: false,
        invalidateOnRefresh: true,
        duration: 3,
      },
    });

    tl.to(letter, {
      y: -0.3,
    });
  });
};

// var initTematikiAnimation = () => {
//   var el = document.querySelector(".scr_tematiki_art6__wrapper");

//   var mm = gsap.matchMedia();

//   mm.add("(min-width: 992px)", () => {
//     gsap.set(el, { y: 150 });

//     var tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".scr_tematiki_art6__inner",
//         start: "center center",
//         end: "bottom center",
//         scrub: 1,
//         pin: false,
//         invalidateOnRefresh: true,
//         duration: 3,
//       },
//     });

//     tl.to(el, {
//       y: 0,
//     });
//   });
// };

// =============================================
// ===== START JS LOGIC AFTER DOM CONTENT LOADED
// =============================================
document.addEventListener("DOMContentLoaded", function (event) {
  //===== ADD BASIC LOGIC FOR ALL PAGE
  // init luxy library
  // initSmothScroll();

  // init header logic
  initHeader();
  toggleBecomeClient();
  toggleConsultationModal();

  // init footer logic
  changeCity();

  //===== LOGIC FOR DIFFERENT PAGES
  //=== START INDEX PAGE
  var index_page = document.querySelector(".index");

  if (index_page) {
    // init slider
    initTeamSlider();
    // init accordions
    initQuestionsAccordion();
    initAccordion(".scr_tematiki_art6__group", ".scr_tematiki_art6__heading");
    initAccordion(
      ".scr_footer_art6__group-submenu",
      ".scr_footer_art6__heading"
    );

    // init reviews
    handleShowReviewButtons();

    // init forms validation
    checkRequiredInputs();
    formValidation();
    handleSuccessMsgModal();

    var isScrollTriggerInit = false;
    if (window.innerWidth > 991) {
      // init GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      startScrollingBlockAnimation();
      isScrollTriggerInit = true;
      initAnimation();
      // initTematikiAnimation();
    }

    // toggle header handlers by resize
    var mq991 = window.matchMedia("(max-width: 991px)");

    var handleMQ = (e) => {
      if (!e.matches && !isScrollTriggerInit) {
        // init GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        startScrollingBlockAnimation();
        initAnimation();
        // initTematikiAnimation();
      }
    };

    mq991.addEventListener("change", handleMQ);
  }
  //=== END INDEX PAGE
});

// TODO: plug GSAP after delay
// function doCreateMapScript(cb) {
//   setTimeout(function () {
//     var script = document.createElement("script");
//     script.async = false;
//     script.src = "https://api-maps.yandex.ru/2.1/?apikey=key&lang=ru_RU";
//     document.body.appendChild(script);
//     script.onload = () => cb();
//   }, 2000);
// }
