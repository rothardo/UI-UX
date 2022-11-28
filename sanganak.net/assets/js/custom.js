if ($(window).width() > 768) {
  $(".dropdown").hover(function () {
    $(".dropdown-toggle", this).trigger("click");
  });
}
$(window).on("load", function () {
  $("#loader").fadeOut();
});
$(window).scroll(function () {
  if ($(this).scrollTop() > 65) {
    $(".opaque-navbar").addClass("opaque");
  } else {
    $(".opaque-navbar").removeClass("opaque");
  }
});
var offset = 200;
var duration = 500;
$(window).scroll(function () {
  if ($(this).scrollTop() > offset) {
    $(".back-to-top").fadeIn(400);
  } else {
    $(".back-to-top").fadeOut(400);
  }
});
$(".back-to-top").on("click", function (event) {
  event.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 600);
  return false;
});
$(".click-to-next").on("click", function () {
  var secHeight = $("#main-slider").height();
  $("html").animate({ scrollTop: secHeight - 61 }, 900);
});
$(document).ready(function () {
  $(".collapse").on("show.bs.collapse", function () {
    var id = $(this).attr("id");
    $('a[href="#' + id + '"]')
      .closest(".panel-heading")
      .addClass("active-faq");
    $('a[href="#' + id + '"] .panel-title span').html(
      '<i class="glyphicon glyphicon-minus"></i>'
    );
  });
  $(".collapse").on("hide.bs.collapse", function () {
    var id = $(this).attr("id");
    $('a[href="#' + id + '"]')
      .closest(".panel-heading")
      .removeClass("active-faq");
    $('a[href="#' + id + '"] .panel-title span').html(
      '<i class="glyphicon glyphicon-plus"></i>'
    );
  });
  var card = document.querySelector(".process-step1");
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
  var card2 = document.querySelector(".process-step2");
  card2.addEventListener("click", function () {
    card2.classList.toggle("is-flipped");
  });
  var card3 = document.querySelector(".process-step3");
  card3.addEventListener("click", function () {
    card3.classList.toggle("is-flipped");
  });
});
