document.addEventListener("DOMContentLoaded", () => {
  const state = {
    _value: "",
    _listener: function (val) {},
    set currentSection(val) {
      this._value = val;
      this._listener(val);
    },
    get currentSection() {
      return this._value;
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
        state.currentSection = id;

        const element = document.querySelector("#info");
        if (id !== "brand") {
          element.classList.add("show");
        } else {
          element.classList.remove("show");
        }
      }
    });
  };

  let observer = new IntersectionObserver(callback, {
    threshold: [0.2, 0.8],
  });

  const targetSections = document.querySelectorAll("section");
  targetSections.forEach((section) => {
    observer.observe(section);
  });
});

$(() => {
  $(document).ready(function () {
    //Click Logo To Scroll To Top
    $("#logo").on("click", () => {
      $("html,body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });

    $("#to-top").on("click", (e) => {
      $("html,body").animate({ scrollTop: 0 }, 500);
    });

    $(window).on("scroll", (e) => {
      const navBarYPostion = $("header").position().top;
      const element = $("#to-top");

      if (!element.hasClass("show") && navBarYPostion > 0) {
        element.addClass("show");
      } else if (navBarYPostion === 0) {
        element.removeClass("show");
      }
    });

    //Smooth scrolling for Toggle Menu Items
    $('a[href^="#"').each((_, a) => {
      $(a).on("click", (e) => {
        e.preventDefault();
        const navContainerHeight = $("#navContainer").outerHeight(
          true /*include margin*/
        );
        const top = $(`${$(a).attr("href")}`).offset().top;
        const position = top - navContainerHeight;
        $("html,body").animate({ scrollTop: position }, 500);
      });
    });

    //Toggle Menu
    $(".burger").on("click", function () {
      $(this).toggleClass("is-open");
      $("#main-nav").toggleClass("is-open");
      $("li").on("click", (e) => {
        $("#main-nav").removeClass("is-open");
        $(".burger").removeClass("is-open");
      });
    });
  });
});
