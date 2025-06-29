// capsule-embed.js

document.addEventListener("DOMContentLoaded", async function () {
  const config = window.firebaseCapsuleConfig;

  if (!window.firebase) {
    console.error("Firebase SDK not loaded.");
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const db = firebase.firestore();
  const loader = document.getElementById("capsule-loader");
  if (!loader) {
    console.error("No capsule-loader element found.");
    return;
  }

  try {
    const snapshot = await db.collection("capsules").where("isActive", "==", true).get();

    if (snapshot.empty) {
      loader.innerHTML = "<p>No active capsules found.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const capsule = doc.data();
      const capsuleDiv = document.createElement("div");
      capsuleDiv.className = "capsule-card";
      capsuleDiv.innerHTML = `
        <h3>${capsule.title}</h3>
        <p>⭐ Rating: ${capsule.rating}</p>
        <p>🔓 Unlock Price: ${capsule.unlockPrice} Pi</p>
        <button class="capsule-explore-button" data-capsule-id="${doc.id}">Explore</button>
        <hr/>
      `;
      loader.appendChild(capsuleDiv);
    });

    // Add click event to explore buttons
    document.querySelectorAll(".capsule-explore-button").forEach((button) => {
      button.addEventListener("click", function () {
        const capsuleId = button.getAttribute("data-capsule-id");
        if (capsuleId) {
          window.location.href = `/capsule-detail?id=${capsuleId}`;
        }
      });
    });

  } catch (error) {
    loader.innerHTML = `<p style="color:red;">Error loading capsules: ${error.message}</p>`;
    console.error("Error loading capsules:", error);
  }
});
    console.log("✔ Firebase loaded, script running...");
    console.log("✔ Capsule config:", config);
    console.log("✔ Snapshot size:", snapshot.size);
