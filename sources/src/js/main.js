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
  var buttons_open = Array.from(
    document.querySelectorAll(".scr_klienty_onas_art6__pdf")
  );
  var client_modal = document.querySelector(".scr_review_modal"),
    body = document.body,
    close_btn = document.querySelector(".scr_review_modal__btn"),
    overlay = document.querySelector(".scr_review_modal__overlay"),
    header = document.querySelector(".header_art6"),
    image = document.querySelector(".scr_review_modal__image img");

  buttons_open.forEach((btn) =>
    btn.addEventListener("click", () => {
      image.src = btn.dataset.src;
    })
  );

  var elements = {
    buttons_open,
    client_modal,
    body,
    header,
    close_btn,
    overlay,
  };

  toggleModal(elements);
};

var showReviewOnProjectPage = () => {
  var buttons_open = Array.from(
    document.querySelectorAll(".scr_rezultat_keysa_art6__img")
  );
  var client_modal = document.querySelector(".scr_review_modal"),
    body = document.body,
    close_btn = document.querySelector(".scr_review_modal__btn"),
    overlay = document.querySelector(".scr_review_modal__overlay"),
    header = document.querySelector(".header_art6"),
    image = document.querySelector(".scr_review_modal__image img");

  // buttons_open.forEach((btn) =>
  //   btn.addEventListener("click", () => {
  //     image.src = btn.dataset.src;
  //   })
  // );

  var elements = {
    buttons_open,
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
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
          toggleActions: "play none none reverse",
        },
      });
    });
  };

  var scr_scrolling_right_art6 = document.querySelector(
    ".scr_scrolling_right_art6"
  );

  scr_scrolling_right_art6 &&
    initScrollAnimation(
      ".scr_scrolling_right_art6__scroll",
      ".scr_scrolling_right_art6",
      ".scr_scrolling_right_art6 .container",
      "top 10%"
    );

  var scr_keysy_art6 = document.querySelector(".scr_keysy_art6");
  var our_projects = document.querySelector(".our-projects");

  if (scr_keysy_art6) {
    if (our_projects) {
      initScrollAnimation(
        ".scr_keysy_art6__title",
        ".scr_keysy_art6",
        ".scr_keysy_art6 .container",
        "top top"
      );
    } else {
      initScrollAnimation(
        ".scr_keysy_art6__title",
        ".scr_keysy_art6",
        ".scr_keysy_art6 .container",
        "top 30%"
      );
    }
  }

  var scr_text_director_art6 = document.querySelector(
    ".scr_text_director_art6"
  );

  var scr_company_art6 = document.querySelector(".scr_company_art6");
  var company_page = document.querySelector(".company-page");

  if (company_page) {
    // animation for company page

    scr_company_art6 &&
      initScrollAnimation(
        ".scr_company_art6__title",
        ".scr_company_art6",
        ".scr_company_art6__intro .container",
        "top top"
      );

    scr_text_director_art6 &&
      initScrollAnimation(
        ".scr_text_director_art6__title",
        ".scr_text_director_art6",
        ".scr_company_art6__intro .container",
        "top top"
        // "top -10%"
      );
  } else {
    // animation for main page
    scr_text_director_art6 &&
      initScrollAnimation(
        ".scr_text_director_art6__title",
        ".scr_text_director_art6",
        ".first_scr_main_art6 .container",
        "top top"
        // "top -10%"
      );

    scr_company_art6 &&
      initScrollAnimation(
        ".scr_company_art6__title",
        ".scr_company_art6",
        ".first_scr_main_art6 .container",
        "top top"
      );
  }

  var first_scr_with_scroll = document.querySelector(".first_scr_with_scroll");

  first_scr_with_scroll &&
    initScrollAnimation(
      ".first_scr_with_scroll__title",
      ".first_scr_with_scroll",
      ".first_scr_with_scroll .scroll_container",
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

var initCompanyPersonsAnimation = () => {
  var persons = Array.from(
    document.querySelectorAll(".scr_company_art6__person")
  );

  persons[0].classList.add("active");
  // persons[1].classList.add("active");
  persons[0].classList.remove("hidden");
  persons[1].classList.remove("hidden");

  var counter = 0;
  var len = persons.length;

  setInterval(() => {
    var hiddenIdx = counter % len;
    var activeIdx = (counter + 1) % len;
    var nextIdx = (counter + 2) % len;
    persons[hiddenIdx].classList.add("hidden");
    persons[hiddenIdx].classList.remove("active");
    persons[activeIdx].classList.add("active");
    persons[nextIdx].classList.remove("hidden");
    counter++;
  }, 5000);
};

// ===== INIT SLIDER ON SERVICES PAGE
var initScrInstrumtechSlider = () => {
  var glide = new Glide(".scr_instrumtech_art6__slider", {
    type: "carousel",
    gap: 20,
    perView: 4,
    breakpoints: {
      1600: {
        gap: 17,
      },
      1300: {
        gap: 13,
      },
    },
  });

  var btnPrev = document.querySelector(".scr_instrumtech_art6__prev");
  var btnNext = document.querySelector(".scr_instrumtech_art6__next");

  btnNext.addEventListener("click", function (event) {
    event.preventDefault();

    glide.go(">");
  });

  btnPrev.addEventListener("click", function (event) {
    event.preventDefault();

    glide.go("<");
  });

  window.innerWidth > 991 && glide.mount();
  var handleMQ = (e) => {
    if (e.matches) {
      glide.destroy();
    } else {
      glide.mount();
    }
  };

  var mq991 = window.matchMedia("(max-width: 991px)");

  mq991.addEventListener("change", handleMQ);
};

var initUsefulMaterialAccordion = () => {
  var text = document.querySelector(".scr_polezn_material_art6__text");
  var toggleBtn = document.querySelector(".scr_polezn_material_art6__btn");

  toggleBtn.addEventListener("click", () => {
    text.classList.toggle("active");
  });
};

var initSmTakzheAccordion = () => {
  var wrapper = document.querySelector(".scr_sm_takzhe_art6__wrapper");
  var toggleBtn = document.querySelector(".scr_sm_takzhe_art6__more");

  toggleBtn.addEventListener("click", () => {
    if (wrapper.classList.contains("active")) {
      wrapper.classList.remove("active");
      toggleBtn.textContent = "Показать больше";
    } else {
      wrapper.classList.add("active");
      toggleBtn.textContent = "Скрыть";
    }
  });
};

var initWatchAlsoAccordion = () => {
  var toggleButtons = document.querySelectorAll(".watch_more_toggle_button");

  toggleButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      var container = btn.previousElementSibling;
      var isContainerActive = container.classList.contains("active");

      if (isContainerActive) {
        container.classList.remove("active");
        btn.firstChild.textContent = "Показать все";
      } else {
        container.classList.add("active");
        btn.firstChild.textContent = "Скрыть";
      }
    })
  );
};

// ===== TOGGLE INFO MODAL ON FIRST SCREEN
var initModalInfo = () => {
  var buttons_open = Array.from(
    document.querySelectorAll(".first_scr_main_art6__help")
  );
  var client_modal = document.querySelector(".scr_info_modal");
  var body = document.body;
  var header = document.querySelector(".header_art6");
  var close_btn = document.querySelector(".scr_info_modal__btn");
  var overlay = document.querySelector(".scr_info_modal__overlay");

  var elements = {
    buttons_open,
    client_modal,
    body,
    header,
    close_btn,
    overlay,
  };

  toggleModal(elements);
};

var initPinProjectImage = () => {
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      ScrollTrigger.create({
        trigger: ".scr_perv_keys_art6__wrapper",
        start: "-=5% top",
        endTrigger: ".scr_perv_keys_art6__descr",
        end: "bottom bottom",
        pin: ".scr_perv_keys_art6__img",
        pinSpacing: false,
      });
    },
  });
};

// ===== REMOVE VIDEO PREVIEW

var initYoutubeVideo = (videos) => {
  // generate video url
  var generateUrl = (id) => {
    var query = "?rel=0&showinfo=0&autoplay=1";
    // var query = "?ps=docs&controls=1";
    return "https://www.youtube.com/embed/" + id + query;
  };

  // create iframe element
  var createIframe = (id) => {
    var iframe = document.createElement("iframe");
    iframe.classList.add("video-iframe");
    iframe.setAttribute("src", generateUrl(id));
    iframe.setAttribute("title", "YouTube video player");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
    );

    return iframe;
  };

  // handling each video element
  videos.forEach((el) => {
    var videoHref = el.dataset.video;
    var deletedLength = "https://youtu.be/".length;

    var videoId = videoHref.substring(deletedLength, videoHref.length);

    el.addEventListener("click", () => {
      if (el.classList.contains("preview-removed")) return;

      var iframe = createIframe(videoId);
      el.querySelector(".video_blur").remove();
      el.querySelector(".video_preview").remove();
      el.append(iframe);
      el.classList.add("preview-removed");
    });
  });
};

// ===== INIT REVIEWS SLIDER

var initReviewsSlider = () => {
  var images = Array.from(
    document.querySelectorAll(".scr_otzyvy_full__wrapper img")
  );

  var previews = Array.from(document.querySelectorAll(".scr_otzyvy__item"));

  if (images.length < 1 || previews.length < 1) return;

  var nav = document.querySelector(".scr_otzyvy_full__nav");

  images.length === 1 && nav.classList.add("hidden");

  var full_container = document.querySelector(".scr_otzyvy_full");
  var overlay = document.querySelector(".scr_otzyvy_full__overlay");
  var closeBtn = document.querySelector(".scr_otzyvy_full__close");

  var prevBtn = document.querySelector(".scr_otzyvy_full__prev");
  var nextBtn = document.querySelector(".scr_otzyvy_full__next");

  var currImgIndex = 0;

  var initSetup = () => {
    images.forEach((img) => img.classList.remove("active"));
    images[currImgIndex].classList.add("active");

    currImgIndex === 0
      ? prevBtn.classList.add("disabled")
      : prevBtn.classList.remove("disabled");
    currImgIndex === images.length - 1
      ? nextBtn.classList.add("disabled")
      : nextBtn.classList.remove("disabled");
  };

  previews.forEach((preview) => {
    preview.addEventListener("click", (e) => {
      document.body.classList.add("lock");
      full_container.classList.add("active");

      currImgIndex = previews.indexOf(e.currentTarget);

      initSetup();

      setTimeout(
        () => images.forEach((i) => i.classList.remove("without-transition")),
        700
      );
    });
  });

  [overlay, closeBtn].forEach((el) =>
    el.addEventListener("click", () => {
      document.body.classList.remove("lock");
      full_container.classList.remove("active");
      images.forEach((i) => i.classList.add("without-transition"));
    })
  );

  prevBtn.addEventListener("click", () => {
    images[currImgIndex].classList.remove("active");
    currImgIndex--;
    images[currImgIndex].classList.add("active");
    nextBtn.classList.remove("disabled");

    if (currImgIndex < 1) {
      prevBtn.classList.add("disabled");
    }
  });

  nextBtn.addEventListener("click", () => {
    images[currImgIndex].classList.remove("active");
    currImgIndex++;
    images[currImgIndex].classList.add("active");
    prevBtn.classList.remove("disabled");

    if (currImgIndex >= images.length - 1) {
      nextBtn.classList.add("disabled");
    }
  });
};

var initCompanyPageSlider = () => {
  var slider_el = document.querySelector(".scr_karusel_foto_art6__slider");
  if (!slider_el) return;

  var slider = null;

  var createCompanyPageSlider = () => {
    slider = new Swiper(slider_el, {
      slidesPerView: "auto",
      spaceBetween: 0,
      navigation: {
        nextEl: ".scr_karusel_foto_art6__next",
        prevEl: ".scr_karusel_foto_art6__prev",
      },
    });
  };

  var destroyCompanyPageSlider = () => {
    slider && slider.destroy();
    slider = null;
  };

  window.innerWidth > 767 && createCompanyPageSlider();

  var mqMin768 = window.matchMedia("(min-width: 768px)");

  mqMin768.addEventListener("change", (e) => {
    e.matches ? createCompanyPageSlider() : destroyCompanyPageSlider();
  });
};

var initMoreButtonOnMobile = (btn, images) => {
  var toggleCompanyImages = (action) => {
    images.forEach((img) => {
      img.classList[action]("visible");
    });
    btn.classList[action]("hidden");
  };

  btn.addEventListener("click", () => toggleCompanyImages("add"));

  var mqMin768 = window.matchMedia("(min-width: 768px)");

  mqMin768.addEventListener("change", (e) => {
    e.matches && toggleCompanyImages("remove");
  });
};

// ========== INIT MAP

var doCreateMapScript = (cb) => {
  setTimeout(function () {
    var script = document.createElement("script");
    script.async = false;
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=key&lang=ru_RU";
    document.body.appendChild(script);
    script.onload = () => cb();
  }, 2000);
};

var initMap = () => {
  var map = document.getElementById("contacts-map");
  if (map) {
    var init = () => {
      var coords = [45.03750207460071, 38.991877999999915];
      var mark_link = "images/mark.svg";

      if (ymaps) {
        var map = new ymaps.Map("contacts-map", {
          center: coords,
          zoom: 17,
        });

        var placemark = new ymaps.Placemark(
          coords,
          {},
          {
            iconLayout: "default#image",
            iconImageHref: mark_link,
            iconImageSize: [100, 100],
            iconImageOffset: [-60, -80],
          }
        );

        map.controls.remove("geolocationControl");
        map.controls.remove("searchControl");
        map.controls.remove("trafficControl");
        map.controls.remove("typeSelector");
        map.controls.remove("fullscreenControl");
        // map.controls.remove("zoomControl"); // удаляем контрол зуммирования
        map.controls.remove("rulerControl");
        // map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

        map.geoObjects.add(placemark);
      }
    };

    ymaps.ready(init);
  }
};

// ========== INIT PIN VACANCY ASIDE

var initPinVacancy = () => {
  var vacancy = document.querySelector(".scr_vacancy");
  var menu = document.querySelector(".scr_vacancy__menu");

  if (!vacancy || !menu) return;

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      ScrollTrigger.create({
        trigger: ".scr_vacancy",
        start: "-=5% top",
        endTrigger: ".scr_vacancy",
        end: "bottom center",
        pin: ".scr_vacancy__menu",
        pinSpacing: false,
      });
    },
  });

  var navLinks = Array.from(document.querySelectorAll(".scr_vacancy__link"));

  var blocks = Array.from(document.querySelectorAll(".scr_vacancy__block"));

  blocks.forEach((block, index) => {
    ScrollTrigger.create({
      trigger: block,
      start: "top +=11%",
      end: "bottom +=11%",
      toggleClass: {
        targets: [navLinks[index], block],
        className: "active",
      },
      onLeaveBack: () => {
        if (index === 0) {
          navLinks[index].classList.add("active");
          block.classList.add("active");
        }
      },
    });
  });

  smoothScroll(".scr_vacancy__link");
};

// ========== INIT SMOOTH SCROLL

var smoothScroll = (btnsSelector) => {
  var btns = Array.from(document.querySelectorAll(btnsSelector));

  if (btns.length < 1) return;

  var scrollHandler = (e) => {
    e.preventDefault();

    // var headerHeight = document.querySelector("header").scrollHeight;
    // var gap = 10;
    var headerHeight = 100;
    var gap = 0;

    var target = document.getElementById(
      e.target.getAttribute("href").slice(1)
    );

    if (!target) return;

    var elementPosition =
      target.getBoundingClientRect().top - headerHeight - gap;

    window.scrollBy({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", scrollHandler);
  });
};

// =============================================
// ===== START JS LOGIC AFTER DOM CONTENT LOADED
// =============================================
document.addEventListener("DOMContentLoaded", function (event) {
  //===== ADD BASIC LOGIC FOR ALL PAGE
  // header
  initHeader();
  toggleBecomeClient();

  var scr_text_director_art6_consultation = document.querySelector(
    ".scr_text_director_art6__consultation"
  );
  scr_text_director_art6_consultation && toggleConsultationModal();

  // footer
  changeCity();

  // sliders
  var teamSlider = document.querySelector(".scr_komanda_art6__slider");
  teamSlider && initTeamSlider();

  // accordions
  var scr_voprosy_art6__question = document.querySelector(
    ".scr_voprosy_art6__question"
  );
  scr_voprosy_art6__question && initQuestionsAccordion();

  var scr_tematiki_art6__group = document.querySelector(
    ".scr_tematiki_art6__group"
  );
  scr_tematiki_art6__group &&
    initAccordion(".scr_tematiki_art6__group", ".scr_tematiki_art6__heading");

  initAccordion(".scr_footer_art6__group-submenu", ".scr_footer_art6__heading");

  // company persons
  var scr_company_art6__person = document.querySelector(
    ".scr_company_art6__person"
  );
  scr_company_art6__person && initCompanyPersonsAnimation();

  // init reviews
  var scr_klienty_onas_art6__pdf = document.querySelector(
    ".scr_klienty_onas_art6__pdf"
  );

  scr_klienty_onas_art6__pdf && handleShowReviewButtons();

  var scr_rezultat_keysa_art6__img = document.querySelector(
    ".scr_rezultat_keysa_art6__img"
  );
  scr_rezultat_keysa_art6__img && showReviewOnProjectPage();

  // forms
  var required_input = document.querySelector(".required");
  required_input && checkRequiredInputs();

  document.forms.length > 0 && formValidation();

  var scr_success_msg_art6 = document.querySelector(".scr_success_msg_art6");
  scr_success_msg_art6 && handleSuccessMsgModal();

  var inner_width = 0;
  var project_page = document.querySelector(".project");

  project_page ? (inner_width = 767) : (inner_width = 991);

  var isScrollTriggerInit = false;
  if (window.innerWidth > inner_width) {
    // init GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    var scrolling_titles_exist = document.body.classList.contains(
      "scrolling-titles-exist"
    );
    scrolling_titles_exist && startScrollingBlockAnimation();

    isScrollTriggerInit = true;

    var index_page = document.querySelector(".index");
    index_page && initAnimation();

    // start animation if project page
    project_page && initPinProjectImage();
  }

  // toggle header handlers by resize
  var mq_inner_width = window.matchMedia(`(max-width: ${inner_width}px)`);

  var handleMQ = (e) => {
    if (!e.matches && !isScrollTriggerInit) {
      // init GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      var scrolling_titles_exist = document.body.classList.contains(
        "scrolling-titles-exist"
      );
      scrolling_titles_exist && startScrollingBlockAnimation();

      var index_page = document.querySelector(".index");
      index_page && initAnimation();

      // start animation if project page
      project_page && initPinProjectImage();
    }
  };

  mq_inner_width.addEventListener("change", handleMQ);

  // init services slider
  var slider = document.querySelector(".scr_instrumtech_art6__slider");

  slider && initScrInstrumtechSlider();

  // init useful material accordion
  var usefulMaterial = document.querySelector(".scr_polezn_material_art6");
  usefulMaterial && initUsefulMaterialAccordion();

  // init useful material accordion
  var watchAlso = document.querySelector(".scr_sm_takzhe_art6");
  var services_list_page = document.querySelector(".services-list");
  watchAlso && !services_list_page && initSmTakzheAccordion();
  watchAlso && !services_list_page && initWatchAlsoAccordion();

  var modal_info = document.querySelector(".scr_info_modal");
  modal_info && initModalInfo();

  // init video by click
  var videos = Array.from(document.querySelectorAll(".video"));
  videos.length > 0 && initYoutubeVideo(videos);

  // init reviews slider
  initReviewsSlider();

  var company_page = document.querySelector(".company-page");
  if (company_page) {
    initCompanyPageSlider();

    var btn = document.querySelector(".scr_karusel_foto_art6__more");
    var images = document.querySelectorAll(".scr_karusel_foto_art6__slide");
    var komanda_btn = document.querySelector(".scr_komanda_foto_art6__more");
    var items = document.querySelectorAll(".scr_komanda_foto_art6__item");

    initMoreButtonOnMobile(btn, images);
    initMoreButtonOnMobile(komanda_btn, items);
  }

  // INIT CONTACTS PAGE

  var contacts_page = document.querySelector(".contacts-page");
  if (contacts_page) {
    doCreateMapScript(initMap);
  }

  // INIT VACANCY PAGE

  var vacancy_page = document.querySelector(".vacancy-page");
  vacancy_page && initPinVacancy();
  // if (vacancy_page) {
  //   initPinVacancy();
  // }
});
