$(document).ready(function () {
  // Бургер меню
  var menu = $(".menu__link");
  var menu_active = $(".menu__link--active");
  var filter = $("[data-filter]");
  var menu_list = $(".menu__wrap");
  var nav_link = $(".menu__wrap a");

  menu.click(function () {
    menu.toggleClass("menu__link--active");
    menu_list.toggleClass("menu__wrap--active");
  });
  nav_link.click(function () {
    menu.toggleClass("menu__link--active");
    menu_list.toggleClass("menu__wrap--active");
  });
  
  //ПРИМЕНЕНИЕ КЛАССА "IBG"
  function ibg(){

    $.each($('.ibg'), function(index, val) {
      if($(this).find('img').length>0){
        $(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
      }
    });
  }

  ibg();

  //слайдер
  $('.slider').slick({
    centerMode: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          centerMode: true,
          variableWidth: true,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1800,
        settings: {
          centerMode: true,
          variableWidth: false,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          centerMode: false,
          variableWidth: false,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          infinite: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }
    ]
  });

  //слайдер 2
  $('.news__slider').slick({
    slidesToShow: 4,
    infinite: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          centerMode: false,
          variableWidth: false,
          infinite: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          infinite: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }
    ]
  });

   // загрузка карты при скроле
  var map = $(".statistics");
  var mapTop = map.offset().top;
  $(window).bind("scroll", function () {
    var windowTop = $(this).scrollTop();
    if (windowTop > mapTop) {
      $("#map").html(
        '<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ab245e42e0be839d9f2aeab1fe427ef33f365bce1b5ddb8711fb172809e11cf35&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=false"></script>'
        );
      $(window).unbind("scroll");
    }
  });

  //Фильтр по категорям
  filter.click(function (event) {
    event.preventDefault();
    $(".works__nav-link").removeClass("active");
    $(this).addClass("active");

    var cat = $(this).data("filter");
    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        var workCat = $(this).data("cat");
        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  // Валидация формы
  function validateFormHero(form) {
    $(form).validate({
      errorClass: "invalid",
      errorElement: "div",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15,
        },
        userPhone: {
          required: true,
          minlength: 17,
        },
        // compound rule
        userEmail: {
          required: true,
          email: true,
        },
      },
      messages: {
        userName: {
          required: "Заполните поле Имя",
          minlength: "Слишком короткое имя",
          maxlength: "Имя не должно превышать 15 символов",
        },
        userPhone: {
          required: "Заполните поле Телефон",
          minlength: "Некорректно введен номер",
        },
        userEmail: {
          required: "Заполните поле Email",
          email: "Формат name@domain.com",
        },
      },
      submitHandler: function (form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            console.log("Ajax сработал. Oтвет сервера: " + response);
            alert("Форма отправлена, мы свяжимся с вами в течение 15 минут");
            $(form)[0].reset();
            $(form).find("input").val("");
          },
          error: function (response) {
            console.error("Ошибка запроса" + response);
          },
        });
      },
    });
  }

  function validateFormQuestions(form) {
    $(form).validate({
      errorClass: "invalid",
      errorElement: "div",
      rules: {
        // simple rule, converted to {required:true}
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15,
        },
        userPhone: {
          required: true,
          minlength: 17,
        },
        userQuestion: "required",
        // compound rule
        userEmail: {
          required: true,
          email: true,
        },
      },
      messages: {
        userName: {
          required: "Заполните поле Имя",
          minlength: "Слишком короткое имя",
          maxlength: "Имя не должно превышать 15 символов",
        },
        userPhone: {
          required: "Заполните поле Телефон",
          minlength: "Некорректно введен номер",
        },
        userQuestion: "Заполните поле Вопрос",
        userEmail: {
          required: "Заполните поле Email",
          email: "Формат name@domain.com",
        },
      },
      submitHandler: function (form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            console.log("Ajax сработал. Oтвет сервера: " + response);
            alert("Форма отправлена, мы свяжимся с вами в течение 15 минут");
            $(form)[0].reset();
            $(form).find("input").val("");
          },
          error: function (response) {
            console.error("Ошибка запроса" + response);
          },
        });
      },
    });
  }

  validateFormHero(".hero__form");
  validateFormQuestions(".questions__form");

  // Маска для телефона
  $("[type=tel]").mask("+380 (00) 000-00-00", {
    placeholder: "Номер телефона",
  });

  // Cкрол вниз
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top,
    },
    500,
    "linear"
    );
  });

  // slick slider
  $(".slider").on("init reInit", function (event, slick) {
    var amount = slick.slideCount;
    $(".slider__range").attr("max", amount);
  });

  $(".slider").on("afterChange", function (e, slick, currentSlide) {
    $(".slider__range").val(currentSlide + 0);
  });

  $(".slider__range").on("input change", function () {
    $(".slider").slick("slickGoTo", this.value - 0);
  });

  $(".slider").slick({
    slidesToShow: 5,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    infinite: true,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 540,
      settings: {
        slidesToShow: 1,
      },
    },
    ],
  });

  // Zoom image
  lightbox.option({
    resizeDuration: 300,
    positionFromTop: 150,
    wrapAround: true,
    fitImagesInViewport: true,
    showImageNumberLabel: false,
  });

  //Анимация
  new WOW({
    mobile: false,
  }).init();
  //
});