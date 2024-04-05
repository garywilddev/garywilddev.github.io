function selectCurrentSection() {
  /* BEGIN SELECT-CURRENT-SECTION */
  // select current section based on intersection when scrolling
  const state = {
    _values: [],
    _listener: function () {},
    push(val) {
      this._values.push(val);
      this._listener(val);
    },
    pop(val) {
      this._values = this._values.filter((el) => el != val);
      this._listener(this._values[this._values.length - 1]);
    },
    current() {
      return this._values[this._values.length - 1];
    },
    registerListener: function (listener) {
      this._listener = listener;
    },
  };

  state.registerListener((val) => {
    const elements = document.querySelectorAll(`a[href^="#"]`);

    elements.forEach((element) => {
      const href = element.getAttribute("href");
      if (href === `#${val}`) {
        element?.classList.add("current-menu-item");
      } else {
        element?.classList.remove("current-menu-item");
      }
    });
  });

  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        state.push(id);
      } else {
        const id = entry.target.getAttribute("id");
        state.pop(id);
      }
    });
  };

  const header = $("header").first();

  let observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: `-${header.height()}px 0px 0px 0px`,
    threshold: [0.05],
  });

  const targetSections = document.querySelectorAll("section");
  targetSections.forEach((section) => {
    observer.observe(section);
  });
  /* END SELECT-CURRENT-SECTION */
}

function resizeHero() {
  /* BEGIN RESIZE-HERO */
  const header = $("header").first();
  const player = $("#hero-player");
  const hero = $("#hero");
  player.height(`calc(100vh - ${header.height()}px)`);
  hero.css("min-height", `calc(100vh - ${header.height()}px)`);
  hero.height(`calc(100vh - ${header.height()}px)`);
  /* END RESIZE-HERO */
}

function translateMain() {
  /* BEGIN TRANSLATE-MAIN */
  const header = $("header").first();
  const main = $("main").first();
  const footer = $("footer").first();

  main.css("marginTop", `${header.height()}px`);
  /* END TRANSLATE-MAIN */
}

function toTop() {
  /* BEGIN TO-THE-TOP */
  //Click Logo To Scroll To Top
  $("#logo").on("click", () => {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  // Behaviour of To-Top button
  $("#to-top").on("click", () => {
    $("html,body").animate({ scrollTop: 0 }, 500);
  });

  //Show To-Top button when scrolling
  $(window).on("scroll", () => {
    const value = window.scrollY;
    const element = $("#to-top");

    if (!element.hasClass("show") && value > 0) {
      element.addClass("show");
    } else if (value === 0) {
      element.removeClass("show");
    }
  });
  /* END TO-THE-TOP */
}

function navBar() {
  /* BEGIN NAV-BAR */
  //Toggle Menu
  $(".burger").on("click", function () {
    $(this).toggleClass("is-open");
    $("#main-nav").toggleClass("is-open");
    $("li").on("click", () => {
      $("#main-nav").removeClass("is-open");
      $(".burger").removeClass("is-open");
    });
  });

  // Smooth scrolling for Toggle Menu Items
  $('a[href^="#"').each((_, a) => {
    $(a).on("click", (e) => {
      e.preventDefault();
      const navContainerHeight = $("#header-content").outerHeight(
        true /*include margin*/
      );
      const top = $(`${$(a).attr("href")}`).offset().top;
      const position = top - navContainerHeight;
      $("html,body").animate({ scrollTop: position }, 500);
    });
  });
  /* END NAV-BAR */
}

$(() => {
  selectCurrentSection();
  translateMain();
  toTop();
  navBar();
  resizeHero();
});
