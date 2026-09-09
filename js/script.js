
/* =========================================================
   SCRIPT.JS
   Portafolio Dra. Julieth Angélica Pedraza García
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");


    /* =====================================================
       MENÚ MOBILE
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navbar.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            const lines =
                menuToggle.querySelectorAll("span");

            if (isOpen) {

                lines[0].style.transform =
                    "translateY(7px) rotate(45deg)";

                lines[1].style.opacity = "0";

                lines[2].style.transform =
                    "translateY(-7px) rotate(-45deg)";

            } else {

                lines[0].style.transform = "none";
                lines[1].style.opacity = "1";
                lines[2].style.transform = "none";
            }

        });

    }


    /* =====================================================
       CERRAR MENÚ AL HACER CLICK
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!navbar || !menuToggle) {
                return;
            }

            navbar.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

            const lines =
                menuToggle.querySelectorAll("span");

            lines.forEach((line) => {
                line.style.transform = "none";
            });

            if (lines[1]) {
                lines[1].style.opacity = "1";
            }

        });

    });


    /* =====================================================
       NAVBAR ACTIVO SEGÚN LA SECCIÓN
    ===================================================== */

    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.nav-link[href="#${sectionId}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                /*
                   Los botones VER DETALLES se manejan
                   aparte por el modal.
                */
                if (
                    link.classList.contains("card-link")
                ) {
                    return;
                }

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.querySelector(".header");

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       HOVER 3D — TARJETAS ESPECIALIDADES
    ===================================================== */

    const specialtyCards =
        document.querySelectorAll(
            ".specialty-card"
        );

    specialtyCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2.5;

            const rotateY =
                ((x - centerX) / centerX) * 2.5;

            card.style.transform =
                `translateY(-8px) scale(1.01)
                 perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

            card.style.boxShadow =
                `${-rotateY * 2}px
                 ${10 + Math.abs(rotateX) * 2}px
                 35px
                 rgba(31,68,83,.18)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";
            card.style.boxShadow = "";

        });

    });


    /* =====================================================
       HOVER CASOS CLÍNICOS
    ===================================================== */

    const caseImages =
        document.querySelectorAll(".case-image");

    caseImages.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const moveX =
                ((x - rect.width / 2) /
                    rect.width) * 4;

            const moveY =
                ((y - rect.height / 2) /
                    rect.height) * 4;

            card.style.transform =
                `translate(${moveX}px, ${moveY}px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       HOVER TRAYECTORIA
    ===================================================== */

    const trajectoryImage =
        document.querySelector(".trajectory-image");

    if (trajectoryImage) {

        trajectoryImage.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    trajectoryImage.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y - rect.height / 2) /
                        rect.height) * -2;

                const rotateY =
                    ((x - rect.width / 2) /
                        rect.width) * 2;

                trajectoryImage.style.transform =
                    `translateY(-5px)
                     perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

        trajectoryImage.addEventListener(
            "mouseleave",
            () => {

                trajectoryImage.style.transform = "";

            }
        );

    }


    /* =====================================================
       MODAL DE ESPECIALIDADES
    ===================================================== */

    const specialtyLinks =
        document.querySelectorAll(
            ".specialty-card .card-link"
        );


    /*
       Creamos el modal directamente desde JavaScript.
       No es necesario modificar el HTML.
    */

    const modal =
        document.createElement("div");

    modal.className =
        "specialty-modal";

    modal.innerHTML = `

        <div
            class="specialty-modal-overlay"
            data-close-modal="true"
        ></div>

        <div
            class="specialty-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="specialtyModalTitle"
        >

            <button
                type="button"
                class="specialty-modal-close"
                aria-label="Cerrar ventana"
            >
                ×
            </button>

            <div class="specialty-modal-image">

                <img
                    id="specialtyModalImage"
                    src=""
                    alt=""
                >

            </div>

            <div class="specialty-modal-content">

                <span
                    class="specialty-modal-label"
                    id="specialtyModalLabel"
                ></span>

                <h2
                    id="specialtyModalTitle"
                ></h2>

                <p
                    id="specialtyModalDescription"
                ></p>

            </div>

        </div>
    `;

    document.body.appendChild(modal);


    /* =====================================================
       CONTENIDO DE LAS ESPECIALIDADES
    ===================================================== */

    const specialtyInformation = {

        ortodoncia: {

            label: "ESPECIALIDAD",

            title: "Ortodoncia",

            description:
                "La ortodoncia se encarga de corregir la posición de los dientes y mejorar la relación entre las arcadas dentales. El tratamiento busca una sonrisa más armónica, una mordida adecuada y una función oral saludable. Cada caso se estudia de manera individual para establecer el tratamiento más adecuado según las necesidades de cada paciente."

        },

        ortopedia: {

            label: "ESPECIALIDAD",

            title: "Ortopedia Maxilar",

            description:
                "La ortopedia maxilar trabaja principalmente sobre el crecimiento y desarrollo de los huesos maxilares y las estructuras faciales. Su objetivo es favorecer una adecuada armonía facial, mejorar la función y orientar el desarrollo de las estructuras orales durante las etapas de crecimiento. La valoración temprana permite identificar necesidades y establecer un plan personalizado."

        }

    };


    /* =====================================================
       ABRIR MODAL
    ===================================================== */

    const openSpecialtyModal = (card) => {

        const image =
            card.querySelector(".specialty-image img");

        const tag =
            card.querySelector(".specialty-tag");

        if (!image || !tag) {
            return;
        }

        const specialtyName =
            tag.textContent
                .trim()
                .toLowerCase();

        let type = "ortodoncia";

        if (
            specialtyName.includes("ortopedia")
        ) {

            type = "ortopedia";

        }

        const information =
            specialtyInformation[type];

        const modalImage =
            document.getElementById(
                "specialtyModalImage"
            );

        const modalLabel =
            document.getElementById(
                "specialtyModalLabel"
            );

        const modalTitle =
            document.getElementById(
                "specialtyModalTitle"
            );

        const modalDescription =
            document.getElementById(
                "specialtyModalDescription"
            );


        modalImage.src =
            image.src;

        modalImage.alt =
            image.alt;

        modalLabel.textContent =
            information.label;

        modalTitle.textContent =
            information.title;

        modalDescription.textContent =
            information.description;


        modal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

        document
            .querySelector(".specialty-modal-close")
            ?.focus();

    };


    specialtyLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                const card =
                    link.closest(
                        ".specialty-card"
                    );

                if (card) {
                    openSpecialtyModal(card);
                }

            }
        );

    });



/* =========================================================
   MODAL — CONOCE MÁS ESPECIALIDADES
========================================================= */

const moreSpecialtyButton =
    document.querySelector(
        ".specialties-intro .btn"
    );

const moreModal =
    document.createElement("div");

moreModal.className =
    "more-specialties-modal";

moreModal.innerHTML = `

    <div
        class="more-specialties-overlay"
        data-close-more-modal="true"
    ></div>


    <div
        class="more-specialties-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="moreSpecialtiesTitle"
    >

        <button
            type="button"
            class="more-specialties-close"
            aria-label="Cerrar ventana"
        >
            ×
        </button>


        <div class="more-specialties-header">

            <span>
                SERVICIOS
            </span>

            <h2 id="moreSpecialtiesTitle">
                Más opciones para
                cuidar tu sonrisa
            </h2>

            <p>
                Además de la ortodoncia y la ortopedia maxilar,
                encontrarás diferentes alternativas odontológicas
                para complementar el cuidado, la función y la
                estética de tu sonrisa.
            </p>

        </div>


        <!-- =====================================================
             6 TARJETAS DE SERVICIOS
        ====================================================== -->

        <div class="more-specialties-grid">


            <!-- ORTODONCIA -->

            <article class="more-specialty-item">

                <div
                    class="more-specialty-icon"
                    aria-hidden="true"
                >

                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="1.7"
                        />

                        <path
                            d="M12 7V17"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                        <path
                            d="M7 12H17"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                        />

                    </svg>

                </div>


                <h3>
                    Ortodoncia
                </h3>


                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Ortodoncia convencional</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Ortodoncia de autoligado</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Ortodoncia invisible Invisalign</span>
                </div>

            </article>


            <!-- ESTÉTICA DENTAL -->

            <article class="more-specialty-item">

                <div
                    class="more-specialty-icon"
                    aria-hidden="true"
                >
                    ✦
                </div>


                <h3>
                    Estética dental
                </h3>


                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Diseño de sonrisa</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Coronas en circonio libres de metal</span>
                </div>

            </article>


            <!-- IMPLANTOLOGÍA -->

            <article class="more-specialty-item">

                <div
                    class="more-specialty-icon"
                    aria-hidden="true"
                >
                    ◇
                </div>


                <h3>
                    Implantología
                </h3>


                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Implantes dentales</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Prótesis rehabilitadas con implantes</span>
                </div>

            </article>


            <!-- PRÓTESIS DENTALES -->

            <article class="more-specialty-item">

                <div
                    class="more-specialty-icon"
                    aria-hidden="true"
                >
                    ✧
                </div>


                <h3>
                    Prótesis dentales
                </h3>


                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Prótesis totales</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Prótesis parciales</span>
                </div>

            </article>


            <!-- ODONTOPEDIATRÍA -->

            <article class="more-specialty-item">

                <div
                    class="more-specialty-icon"
                    aria-hidden="true"
                >
                    ♧
                </div>


                <h3>
                    Odontopediatría
                </h3>


                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Atención odontológica para niños</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Acompañamiento en cada etapa de su desarrollo y cuidado oral</span>
                </div>

            </article>


            <!-- REHABILITACIÓN ORAL -->

            <article class="more-specialty-item">

                <div
                    class="more-specialty-icon"
                    aria-hidden="true"
                >
                    ⌁
                </div>


                <h3>
                    Rehabilitación oral
                </h3>


                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Rehabilitación funcional y estética</span>
                </div>

                <div class="more-specialty-service">
                    <span class="service-bullet">•</span>
                    <span>Planificación integral de tratamientos</span>
                </div>

            </article>


        </div>


        <!-- =====================================================
             LLAMADA A LA ACCIÓN
        ====================================================== -->

        <div class="more-specialties-cta">

            <p>
                ¿Preguntas por estos servicios?
            </p>

            <a
                href="https://wa.me/573106810761"
                target="_blank"
                rel="noopener noreferrer"
                class="more-specialties-cta-button"
            >
                AGENDA TU VALORACIÓN
                <span aria-hidden="true">→</span>
            </a>

        </div>


    </div>
`;


document.body.appendChild(
    moreModal
);


/* =========================================================
   ABRIR MODAL
========================================================= */

if (moreSpecialtyButton) {

    moreSpecialtyButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            moreModal.classList.add(
                "active"
            );

            document.body.classList.add(
                "modal-open"
            );

            const closeButton =
                moreModal.querySelector(
                    ".more-specialties-close"
                );

            if (closeButton) {
                closeButton.focus();
            }

        }
    );

}


/* =========================================================
   CERRAR MODAL
========================================================= */

const closeMoreSpecialtyModal = () => {

    moreModal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

};


const moreCloseButton =
    moreModal.querySelector(
        ".more-specialties-close"
    );


if (moreCloseButton) {

    moreCloseButton.addEventListener(
        "click",
        closeMoreSpecialtyModal
    );

}


moreModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target.dataset.closeMoreModal ===
            "true"
        ) {

            closeMoreSpecialtyModal();

        }

    }
);




    /* =========================================================
       MODAL — VER TODOS LOS CASOS
       9 TARJETAS: ANTES / DURANTE / DESPUÉS
    ========================================================= */

    const allCasesButton =
        document.querySelector(
            ".cases-intro .btn"
        );

    const casesModal =
        document.createElement("div");

    casesModal.className =
        "cases-modal";

    casesModal.innerHTML = `

        <div
            class="cases-modal-overlay"
            data-close-cases="true"
        ></div>

        <div
            class="cases-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="casesModalTitle"
        >

            <button
                type="button"
                class="cases-modal-close"
                aria-label="Cerrar ventana"
            >
                ×
            </button>


            <!-- =================================================
                 ENCABEZADO
            ================================================== -->

            <div class="cases-modal-header">

                <span>
                    CASOS CLÍNICOS
                </span>

                <h2 id="casesModalTitle">
                    Antes, durante y después
                </h2>

                <p>
                    Conoce la evolución de algunos tratamientos
                    y observa el proceso desde la valoración inicial
                    hasta su etapa final.
                </p>

            </div>


            <!-- =================================================
                 9 IMÁGENES
            ================================================== -->

            <div class="cases-modal-gallery">


                <!-- =========================
                     CASO 1
                ========================== -->

                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso1-antes.jpg"
                    data-title="Caso 1 — Antes del tratamiento"
                >

                    <img
                        src="./assets/caso1-antes.jpg"
                        alt="Caso 1 antes del tratamiento"
                    >

                    <span>
                        ANTES
                    </span>

                </button>


                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso1-durante.jpg"
                    data-title="Caso 1 — Durante el tratamiento"
                >

                    <img
                        src="./assets/caso1-durante.jpg"
                        alt="Caso 1 durante el tratamiento"
                    >

                    <span>
                        DURANTE
                    </span>

                </button>


                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso1-despues.jpg"
                    data-title="Caso 1 — Después del tratamiento"
                >

                    <img
                        src="./assets/caso1-despues.jpg"
                        alt="Caso 1 después del tratamiento"
                    >

                    <span>
                        DESPUÉS
                    </span>

                </button>


                <!-- =========================
                     CASO 2
                ========================== -->

                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso2-antes.jpg"
                    data-title="Caso 2 — Antes del tratamiento"
                >

                    <img
                        src="./assets/caso2-antes.jpg"
                        alt="Caso 2 antes del tratamiento"
                    >

                    <span>
                        ANTES
                    </span>

                </button>


                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso2-durante.jpg"
                    data-title="Caso 2 — Durante el tratamiento"
                >

                    <img
                        src="./assets/caso2-durante.jpg"
                        alt="Caso 2 durante el tratamiento"
                    >

                    <span>
                        DURANTE
                    </span>

                </button>


                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso2-despues.jpg"
                    data-title="Caso 2 — Después del tratamiento"
                >

                    <img
                        src="./assets/caso2-despues.jpg"
                        alt="Caso 2 después del tratamiento"
                    >

                    <span>
                        DESPUÉS
                    </span>

                </button>


                <!-- =========================
                     CASO 3
                ========================== -->

                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso3-antes.jpg"
                    data-title="Caso 3 — Antes del tratamiento"
                >

                    <img
                        src="./assets/caso3-antes.jpg"
                        alt="Caso 3 antes del tratamiento"
                    >

                    <span>
                        ANTES
                    </span>

                </button>


                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso3-durante.jpg"
                    data-title="Caso 3 — Durante el tratamiento"
                >

                    <img
                        src="./assets/caso3-durante.jpg"
                        alt="Caso 3 durante el tratamiento"
                    >

                    <span>
                        DURANTE
                    </span>

                </button>


                <button
                    type="button"
                    class="cases-modal-card"
                    data-image="./assets/caso3-despues.jpg"
                    data-title="Caso 3 — Después del tratamiento"
                >

                    <img
                        src="./assets/caso3-despues.jpg"
                        alt="Caso 3 después del tratamiento"
                    >

                    <span>
                        DESPUÉS
                    </span>

                </button>


            </div>

        </div>
    `;


    /* =========================================================
       AGREGAR MODAL AL DOCUMENTO
    ========================================================= */

    document.body.appendChild(
        casesModal
    );


    /* =========================================================
       ABRIR MODAL
    ========================================================= */

    if (allCasesButton) {

        allCasesButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                casesModal.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "modal-open"
                );

            }
        );

    }


    /* =========================================================
       CERRAR MODAL
    ========================================================= */

    const closeCasesModal = () => {

        casesModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    };


    const casesCloseButton =
        casesModal.querySelector(
            ".cases-modal-close"
        );


    if (casesCloseButton) {

        casesCloseButton.addEventListener(
            "click",
            closeCasesModal
        );

    }


    /* =========================================================
       CERRAR AL HACER CLICK EN EL FONDO
    ========================================================= */

    casesModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target.dataset.closeCases ===
                "true"
            ) {

                closeCasesModal();

            }

        }
    );


    /* =========================================================
       VISOR DE IMAGEN GRANDE
    ========================================================= */

    const caseCards =
        casesModal.querySelectorAll(
            ".cases-modal-card"
        );


    caseCards.forEach((card) => {

        card.addEventListener(
            "click",
            () => {

                const image =
                    card.dataset.image;

                const title =
                    card.dataset.title;


                const viewer =
                    document.createElement(
                        "div"
                    );


                viewer.className =
                    "case-image-viewer";


                viewer.innerHTML = `

                    <div
                        class="case-image-viewer-bg"
                    ></div>

                    <div
                        class="case-image-viewer-content"
                    >

                        <button
                            type="button"
                            class="case-image-viewer-close"
                            aria-label="Cerrar imagen"
                        >
                            ×
                        </button>

                        <img
                            src="${image}"
                            alt="${title}"
                        >

                        <p>
                            ${title}
                        </p>

                    </div>
                `;


                document.body.appendChild(
                    viewer
                );


                requestAnimationFrame(() => {

                    viewer.classList.add(
                        "active"
                    );

                });


                const closeViewer = () => {

                    viewer.classList.remove(
                        "active"
                    );

                    setTimeout(() => {

                        viewer.remove();

                    }, 300);

                };


                const viewerCloseButton =
                    viewer.querySelector(
                        ".case-image-viewer-close"
                    );


                const viewerBackground =
                    viewer.querySelector(
                        ".case-image-viewer-bg"
                    );


                viewerCloseButton.addEventListener(
                    "click",
                    closeViewer
                );


                viewerBackground.addEventListener(
                    "click",
                    closeViewer
                );

            }
        );

    });


    /* =========================================================
       ESC — CERRAR
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            /* =================================================
               CERRAR VISOR DE IMAGEN
            ================================================= */

            const activeViewer =
                document.querySelector(
                    ".case-image-viewer.active"
                );


            if (activeViewer) {

                const closeButton =
                    activeViewer.querySelector(
                        ".case-image-viewer-close"
                    );


                if (closeButton) {

                    closeButton.click();

                }

                return;

            }


            /* =================================================
               CERRAR CASOS
            ================================================= */

            if (
                casesModal.classList.contains(
                    "active"
                )
            ) {

                closeCasesModal();

                return;

            }


            /* =================================================
               CERRAR CONOCE MÁS
            ================================================= */

            if (
                moreModal.classList.contains(
                    "active"
                )
            ) {

                closeMoreSpecialtyModal();

                return;

            }


            /* =================================================
               CERRAR ESPECIALIDAD
            ================================================= */

            if (
                modal.classList.contains(
                    "active"
                )
            ) {

                modal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "modal-open"
                );

                return;

            }


            /* =================================================
               CERRAR MENÚ MOBILE
            ================================================= */

            if (
                navbar &&
                navbar.classList.contains(
                    "open"
                )
            ) {

                navbar.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menú"
                    );

                    const lines =
                        menuToggle.querySelectorAll(
                            "span"
                        );


                    if (lines.length === 3) {

                        lines[0].style.transform =
                            "none";

                        lines[1].style.opacity =
                            "1";

                        lines[2].style.transform =
                            "none";

                    }

                }

            }

        }
    );


    /* =====================================================
       APARICIÓN AL HACER SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-container, " +
            ".specialties-container, " +
            ".trajectory-container, " +
            ".cases-container, " +
            ".contact-container"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach((element) => {

            element.classList.add(
                "scroll-reveal"
            );

            observer.observe(element);

        });

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navbar &&
                menuToggle
            ) {

                navbar.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menú"
                );


                const lines =
                    menuToggle.querySelectorAll(
                        "span"
                    );


                lines.forEach((line) => {
                    line.style.transform = "none";
                });


                if (lines[1]) {

                    lines[1].style.opacity =
                        "1";

                }

            }

        }
    );

});

