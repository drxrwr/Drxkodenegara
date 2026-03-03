const fileInput = document.getElementById("fileInput");
const textArea = document.getElementById("textArea");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    textArea.value = e.target.result;
  };
  reader.readAsText(file);
});

function processText() {
  const prefix = document.getElementById("prefixInput").value;
  const lines = textArea.value.split(/\r?\n/);

  const processed = lines
    .filter(line => line.trim() !== "")
    .map(line => prefix + line.trim())
    .join("\n");

  downloadFile(processed);
}

function downloadFile(content) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "hasil.txt";
  link.click();
}
