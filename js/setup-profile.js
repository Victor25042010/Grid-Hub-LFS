const profileInput =
document.getElementById("profileInput");

const profilePreview =
document.getElementById("profilePreview");

profileInput.addEventListener("change", () => {

  const file = profileInput.files[0];

  if(file){

    profilePreview.src =
    URL.createObjectURL(file);

  }

});

/* BANNER */

const bannerInput =
document.getElementById("bannerInput");

const bannerPreview =
document.getElementById("bannerPreview");

bannerInput.addEventListener("change", () => {

  const file = bannerInput.files[0];

  if(file){

    bannerPreview.src =
    URL.createObjectURL(file);

  }

});

/* SAVE */

const saveProfile =
document.getElementById("saveProfile");

saveProfile.addEventListener("click", () => {

  alert("Perfil salvo!");

});