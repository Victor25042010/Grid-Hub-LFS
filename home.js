// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {

    apiKey: "SUA_API_KEY",

    authDomain: "SEU_AUTH_DOMAIN",

    projectId: "SEU_PROJECT_ID",

    storageBucket: "SEU_STORAGE_BUCKET",

    messagingSenderId: "SEU_SENDER_ID",

    appId: "SEU_APP_ID"

};

// ==========================
// INIT FIREBASE
// ==========================

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = firebase.firestore();

// ==========================
// CLOUDINARY
// ==========================

const CLOUD_NAME = "SEU_CLOUD_NAME";

const UPLOAD_PRESET = "gridhub_upload";

// ==========================
// ELEMENTOS
// ==========================

const userName =
    document.getElementById("userName");

const logoutBtn =
    document.getElementById("logoutBtn");

const postBtn =
    document.getElementById("postBtn");

const feed =
    document.getElementById("feed");

// ==========================
// VERIFICAR LOGIN
// ==========================

auth.onAuthStateChanged((user) => {

    if (!user) {

        window.location.href = "index.html";

        return;
    }

    userName.innerText = user.email;

});

// ==========================
// LOGOUT
// ==========================

logoutBtn.addEventListener("click", () => {

    auth.signOut();

});

// ==========================
// UPLOAD CLOUDINARY
// ==========================

async function uploadImage(file) {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        UPLOAD_PRESET
    );

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    return data.secure_url;

}

// ==========================
// CRIAR POST
// ==========================

postBtn.addEventListener("click", async () => {

    const text =
        document.getElementById("postText").value;

    const file =
        document.getElementById("postImage").files[0];

    if (!text && !file) {

        alert("Faça um post");

        return;
    }

    try {

        let imageUrl = "";

        if (file) {

            imageUrl =
                await uploadImage(file);

        }

        const user = auth.currentUser;

        await db.collection("posts").add({

            username: user.email,

            text: text,

            imageUrl: imageUrl,

            likes: 0,

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        });

        document.getElementById("postText").value = "";

        document.getElementById("postImage").value = "";

    } catch (error) {

        console.error(error);

        alert("Erro ao postar");

    }

});

// ==========================
// FEED REALTIME
// ==========================

db.collection("posts")
.orderBy("createdAt", "desc")
.onSnapshot((snapshot) => {

    feed.innerHTML = "";

    snapshot.forEach((doc) => {

        const post = doc.data();

        const postElement =
            document.createElement("div");

        postElement.classList.add("post");

        postElement.innerHTML = `

            <div class="post-header">
                ${post.username}
            </div>

            <div class="post-content">

                <div class="post-text">
                    ${post.text || ""}
                </div>

                ${
                    post.imageUrl
                    ?
                    `
                    <img src="${post.imageUrl}">
                    `
                    :
                    ""
                }

            </div>

            <div class="post-footer">

                <button
                    class="like-btn"
                    onclick="likePost('${doc.id}', ${post.likes})"
                >
                    ❤️ ${post.likes}
                </button>

            </div>

        `;

        feed.appendChild(postElement);

    });

});

// ==========================
// LIKE
// ==========================

async function likePost(postId, currentLikes) {

    await db.collection("posts")
    .doc(postId)
    .update({

        likes: currentLikes + 1

    });

}