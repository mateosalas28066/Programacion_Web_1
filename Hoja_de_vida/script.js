let cvs = JSON.parse(localStorage.getItem("cvs")) || [];

document.getElementById("addButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
    document.getElementById("cvForm").reset(); // Limpiar el formulario
    document.getElementById("photoPreview").style.display = 'none'; // Ocultar la foto previa
});

// Guardar una nueva hoja de vida o editarla
document.getElementById("cvForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const profession = document.getElementById("profession").value;
    const description = document.getElementById("description").value;
    const academicHistory = document.getElementById("academicHistory").value;
    const workHistory = document.getElementById("workHistory").value;
    const skills = document.getElementById("skills").value;

    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];
    const photoUrl = photoFile ? URL.createObjectURL(photoFile) : '';

    const cv = {
        name, profession, description, academicHistory, workHistory, skills, photoUrl
    };

    cvs.push(cv);
    localStorage.setItem("cvs", JSON.stringify(cvs));

    // Mostrar alerta
    const alert = document.getElementById("alert");
    alert.classList.remove("d-none");
    setTimeout(() => {
        alert.classList.add("d-none");
    }, 2000);

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();

    showCVs(); // Mostrar las hojas de vida
});

// Función para mostrar las hojas de vida guardadas
function showCVs() {
    const cvListContainer = document.getElementById("cvListContainer");
    cvListContainer.innerHTML = ""; // Limpiar la lista antes de agregar los nuevos

    cvs.forEach((cv, index) => {
        const cvDiv = document.createElement("div");
        cvDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");

        cvDiv.innerHTML = `
            <div class="card">
                <img src="${cv.photoUrl}" class="card-img-top" alt="Foto de ${cv.name}">
                <div class="card-body">
                    <h5 class="card-title">${cv.name}</h5>
                    <p class="card-text"><strong>Profesión:</strong> ${cv.profession}</p>
                    <p class="card-text"><strong>Descripción:</strong> ${cv.description}</p>
                    <p class="card-text"><strong>Historial Académico:</strong> ${cv.academicHistory}</p>
                    <p class="card-text"><strong>Historial Laboral:</strong> ${cv.workHistory}</p>
                    <p class="card-text"><strong>Habilidades:</strong> ${cv.skills}</p>
                    <button class="btn btn-warning" onclick="editCV(${index})"><i class="fas fa-edit"></i> Editar</button>
                    <button class="btn btn-danger" onclick="deleteCV(${index})"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;

        cvListContainer.appendChild(cvDiv);
    });
}

// Función para editar una hoja de vida
function editCV(index) {
    const cv = cvs[index];
    document.getElementById("name").value = cv.name;
    document.getElementById("profession").value = cv.profession;
    document.getElementById("description").value = cv.description;
    document.getElementById("academicHistory").value = cv.academicHistory;
    document.getElementById("workHistory").value = cv.workHistory;
    document.getElementById("skills").value = cv.skills;
    document.getElementById("photoPreview").style.display = 'block';
    document.getElementById("photoPreview").src = cv.photoUrl;

    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();

    // Actualizar el botón de guardar para actualizar
    document.getElementById("cvForm").onsubmit = (event) => {
        event.preventDefault();

        cvs[index] = {
            name: document.getElementById("name").value,
            profession: document.getElementById("profession").value,
            description: document.getElementById("description").value,
            academicHistory: document.getElementById("academicHistory").value,
            workHistory: document.getElementById("workHistory").value,
            skills: document.getElementById("skills").value,
            photoUrl: document.getElementById("photoPreview").src
        };

        localStorage.setItem("cvs", JSON.stringify(cvs));
        showCVs(); // Actualizar la lista de hojas de vida

        modal.hide(); // Cerrar el modal
    };
}

// Función para eliminar una hoja de vida
function deleteCV(index) {
    cvs.splice(index, 1);
    localStorage.setItem("cvs", JSON.stringify(cvs));
    showCVs(); // Mostrar las hojas de vida restantes
}

// Mostrar las hojas de vida cuando la página cargue
showCVs();
