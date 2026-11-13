(function () {
  "use strict";

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Print
  document.getElementById("print-link").addEventListener("click", function (e) {
    e.preventDefault();
    window.print();
  });

  // PDF: download resume.pdf if it exists next to this page,
  // otherwise open the print dialog (choose "Save as PDF").
  document.getElementById("pdf-link").addEventListener("click", function (e) {
    e.preventDefault();
    var url = this.getAttribute("href");
    fetch(url, { method: "HEAD" })
      .then(function (res) {
        if (!res.ok) throw new Error("missing");
        var a = document.createElement("a");
        a.href = url;
        a.download = "Nodira_Kazakova_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch(function () {
        alert("Nodira_Kazakova_Resume.pdf was not found, so the print dialog will open. Choose \"Save as PDF\" as the printer.");
        window.print();
      });
  });

// Word: download resume.docx if it exists next to this page,
// otherwise build a .doc from the resume text on the page.
  document.getElementById("doc-link").addEventListener("click", function (e) {
    e.preventDefault();
    var url = this.getAttribute("href");
    var ext = url.split(".").pop().split("?")[0];

    function buildAndDownload() {
      var body = document.getElementById("resume-content").innerHTML;
      var title = document.getElementById("header").querySelector("h1").textContent;
      var html =
          "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
          "xmlns:w='urn:schemas-microsoft-com:office:word' " +
          "xmlns='http://www.w3.org/TR/REC-html40'>" +
          "<head><meta charset='utf-8'><title>" + title + "</title>" +
          "<style>body{font-family:Arial,sans-serif;font-size:11pt;}" +
          "h1{font-size:22pt;}h2{font-size:14pt;border-bottom:1px solid #000;}" +
          "h3{font-size:11pt;margin-bottom:0;}.meta{font-style:italic;color:#444;}" +
          "th{text-align:left;}</style></head><body>" +
          "<h1>" + title + "</h1>" + body + "</body></html>";
      var blob = new Blob(["\ufeff", html], { type: "application/msword" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "Nodira_Kazakova_Resume.doc";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    }

    fetch(url, { method: "HEAD" })
        .then(function (res) {
          if (!res.ok) throw new Error("missing");
          var a = document.createElement("a");
          a.href = url;
          a.download = "Nodira_Kazakova_Resume." + ext;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(function () {
          alert(url + " was not found, so a Word document will be generated from the page instead.");
          buildAndDownload();
        });
  });
})();
