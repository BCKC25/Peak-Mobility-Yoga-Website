// GA4 event hooks for booking/buying/contact actions.
// No-ops safely if gtag isn't loaded (e.g. ad blockers, local testing).
(function () {
  function fire(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  }

  var PRODUCT_BY_ID = {
    po_11kZQqxfyVKLWvXTSc: "Drop-In",
    po_11kZQqxfyVKLWvXTRb: "10-Pack",
    po_11kZQqxfyVKLWvXTYi: "Membership",
  };

  function productFromHref(href) {
    for (var id in PRODUCT_BY_ID) {
      if (href.indexOf(id) !== -1) return PRODUCT_BY_ID[id];
    }
    return "Unknown";
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest ? event.target.closest("a") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";

    if (href.indexOf("tel:") === 0) { fire("click_call"); return; }
    if (href.indexOf("mailto:") === 0) { fire("click_email"); return; }
    if (href.indexOf("go.mindbodyonline.com/book/app/pricing") !== -1) {
      fire("click_buy", { product: productFromHref(href) });
      fire("click_book");
      return;
    }
    if (href.indexOf("/book/") !== -1 || href.indexOf("#booking") !== -1) {
      fire("click_book");
    }
  });

  // NOTE: generate_lead (for /join/) is not wired up -- the form there is a
  // cross-origin Mindbody <healcode-widget> embed, so this page has no
  // access to its submit event. Would need a Mindbody-side webhook or a
  // postMessage from the embed to track that step.
})();
