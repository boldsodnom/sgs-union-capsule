// capsule-embed.js
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("capsule-loader");

  // Firebase инициализаци
  firebase.initializeApp(window.firebaseCapsuleConfig);
  const db = firebase.firestore();

  // Capsule-уудыг унших
  db.collection("capsules")
    .where("isLocked", "==", false) // 🔓 зөвхөн unlock хийсэн капсул
    .get()
    .then((querySnapshot) => {
      loader.innerHTML = ""; // loader-г арилгана
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const capsule = document.createElement("div");
        capsule.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.summary}</p>
        `;
        loader.appendChild(capsule);
      });
    })
    .catch((error) => {
      loader.innerText = "Failed to load capsules 😢";
      console.error("Error fetching capsules:", error);
    });
});
