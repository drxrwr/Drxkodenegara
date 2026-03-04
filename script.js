const fileInput = document.getElementById("fileInput");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const processBtn = document.getElementById("processBtn");
const downloadBtn = document.getElementById("downloadBtn");
const countryCodeInput = document.getElementById("countryCode");
const skipExisting = document.getElementById("skipExisting");

const totalCount = document.getElementById("totalCount");
const successCount = document.getElementById("successCount");
const skipCount = document.getElementById("skipCount");
const errorCount = document.getElementById("errorCount");
const statsBox = document.getElementById("statsBox");

let processedResult = "";

// Upload File
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    inputText.value = e.target.result;
  };
  reader.readAsText(file);
});

// Proses Nomor
processBtn.addEventListener("click", function () {
  let code = countryCodeInput.value.trim();

  if (!code) {
    alert("Masukkan kode negara dulu.");
    return;
  }

  if (!code.startsWith("+")) {
    code = "+" + code.replace(/\D/g, "");
  }

  const lines = inputText.value.split("\n");

  let result = [];
  let success = 0;
  let skipped = 0;
  let error = 0;

  lines.forEach(line => {
    let number = line.trim();

    if (number === "") return;

    number = number.replace(/[^\d+]/g, "");

    if (skipExisting.checked && number.startsWith("+")) {
      result.push(number);
      skipped++;
      return;
    }

    if (number.startsWith("+")) {
      number = number.replace(/^\+/, "");
    }

    if (number.startsWith("62")) {
      number = number.substring(2);
    }

    if (number.startsWith("0")) {
      number = number.substring(1);
    }

    if (!/^\d+$/.test(number)) {
      error++;
      return;
    }

    result.push(code + number);
    success++;
  });

  processedResult = result.join("\n");
  outputText.value = processedResult;

  totalCount.textContent = lines.length;
  successCount.textContent = success;
  skipCount.textContent = skipped;
  errorCount.textContent = error;

  statsBox.style.display = "block";
  downloadBtn.disabled = false;
});

// Download
downloadBtn.addEventListener("click", function () {
  const blob = new Blob([processedResult], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "hasil_nomor.txt";
  link.click();
});
