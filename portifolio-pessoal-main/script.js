document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
  const mobileMenu = document.querySelector(".menu");

  mobileMenuIcon.addEventListener("click", function () {
    mobileMenu.classList.toggle("mobile-menu-open");
  });
});

// Slider de depoimentos

const prevButton = document.querySelector(".prev-testimonial");
const nextButton = document.querySelector(".next-testimonial");
const cards = document.querySelectorAll(".container-testimonials > div");

let currentIndex = 0;

function showCards() {
  cards.forEach((card, index) => {
    if (index >= currentIndex && index < currentIndex + getVisibleCardCount()) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  const disabledPrevButton = currentIndex === 0;

  disabledPrevButton
    ? prevButton.classList.add("disabled")
    : prevButton.classList.remove("disabled");

  const disabledNextButton =
    currentIndex + getVisibleCardCount() >= cards.length;

  disabledNextButton
    ? nextButton.classList.add("disabled")
    : nextButton.classList.remove("disabled");
}

function getVisibleCardCount() {
  const mobileScreenWidth = 1200;

  return window.innerWidth <= mobileScreenWidth ? 1 : 3;
}
function prevCard() {
  if (currentIndex > 0) {
    currentIndex -= 1;
  }
  showCards();
}

function nextCard() {
  if (currentIndex + getVisibleCardCount() < cards.length) {
    currentIndex += 1;
  }
  showCards();
}

prevButton.addEventListener("click", prevCard);
nextButton.addEventListener("click", nextCard);
showCards();
window.addEventListener("resize", showCards);

/* Contato do site */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");
  const loading = document.getElementById("loading");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    form.style.display = "none";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
    loading.style.display = "block";

    const data = {
      to: "emailrecebedor",
      from: "email hotmail criado para o nodemailer",
      subject: "Contato do site",
      text: "Contato do site",
      html: `<p>Nome: ${nome}</p><br/><p>Email: ${email}</p><br/><p>Assunto: ${assunto}</p><br/><p>Mensagem: ${mensagem}</p>`,
    };

    fetch("link-da-sua-api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        if(res.ok){
            loading.style.display = "none";
            successMessage.style.display = "block";
        } else{
            loading.style.display = "none";
            errorMessage.style.display = "block";
            console.error(`Erro na resposta da api: ${res.status} - ${res.statusText}`)
        }
    }).catch((error) => {
        console.error(error);
        loading.style.display = "none";
        errorMessage.style.display = "block";
    })
  });
});

/* Scroll */

function scrollToSection(sectionId){
    const section = document.querySelector(sectionId);

    if(section){
        let scrollOffset = 0;

        if(sectionId === "#projects"){
            scrollOffset = section.offsetTop - 70;
        } else {
            scrollOffset = section.offsetTop - (window.innerHeight - section.clientHeight) / 2;
        }

        window.scrollTo({
            top: scrollOffset,
            behavior: 'smooth'
        })
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const links = document.querySelectorAll("nav a");
    links.forEach(function (link) {
        link.addEventListener("click", function(e){
            e.preventDefault();
            const sectionId = link.getAttribute("href");
            scrollToSection(sectionId);
        })
    });

    const footerLinks = document.querySelectorAll("footer a");
    footerLinks.forEach(function (link) {
        link.addEventListener("click", function(e){
            e.preventDefault();
            const sectionId = link.getAttribute("href");
            scrollToSection(sectionId);
        })
    });
})