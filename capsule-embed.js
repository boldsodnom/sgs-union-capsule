
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".capsule-explore-button");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const capsuleId = button.getAttribute("data-capsule-id");
      if (capsuleId) {
        window.location.href = `/capsule-detail?id=${capsuleId}`;
      }
    });
  });
});
