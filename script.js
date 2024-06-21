let imageURL;

function submitHandler() {
  console.log("click");
  const fileInput = document.getElementById("fileInput");
  console.log(fileInput.files);
  const image = fileInput.files[0];

  // Multipart file
  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const apiKey = "PASTE_YOUR_API_KEY";

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "yhY3mDiCJ589LBepDK1HGMmV",
    },
    body: formData,
  })
    .then(function (reponse) {
      return reponse.blob();
    })
    .then(function (blob) {
      console.log(blob);
      const url = URL.createObjectURL(blob);
      imageURL = url;
      const img = document.createElement("img");
      img.src = url;
      // document.body.appendChild(img);
      // URL.revokeObjectURL(url);
    })
    .catch();
}

function downloadFile() {
  var anchorElement = document.createElement("a");
  anchorElement.href = imageURL;
  anchorElement.download = "naciasv.png";
  document.body.appendChild(anchorElement);

  anchorElement.click();

  document.body.removeChild(anchorElement);
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";
}

// scripts.js

function generateProducts() {
  const categories = [
    "Cokelat_Laki",
    "Hitam_Laki",
    "Cerah_Laki",
    "Cokelat_Perempuan",
    "Hitam_Perempuan",
    "Cerah_Perempuan",
  ];
  const productCount = 10;
  const products = [];

  categories.forEach((category) => {
    for (let i = 1; i <= productCount; i++) {
      products.push({
        name: `Outfit_${i}`,
        image: `./DATASET KULIT/${category}${i}.png`,
      });
    }
  });

  return products;
}

const products = generateProducts();

function previewImage() {
  const fileInput = document.getElementById("fileInput");
  const uploadedImage = document.getElementById("uploadedImage");
  const imageName = document.getElementById("imageName");
  const imagePreview = document.getElementById("imagePreview");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      uploadedImage.src = e.target.result;

      // Extract file name to determine category
      const fileName = fileInput.files[0].name.toLowerCase();
      const isMale = fileName.includes("laki");
      const isFemale = fileName.includes("perempuan");
      const isHitam = fileName.includes("hitam");
      const isCerah = fileName.includes("cerah");
      const isCokelat = fileName.includes("cokelat");

      displayProducts(isMale, isFemale, isHitam, isCerah, isCokelat);
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

function displayProducts(isMale, isFemale, isHitam, isCerah, isCokelat) {
  const productSection = document.getElementById("productSection");
  productSection.innerHTML = "";

  products.forEach((product) => {
    if (
      (isMale && isCokelat && product.image.includes("Cokelat_Laki")) ||
      (isMale && isHitam && product.image.includes("Hitam_Laki")) ||
      (isMale && isCerah && product.image.includes("Cerah_Laki")) ||
      (isFemale && isCokelat && product.image.includes("Cokelat_Perempuan")) ||
      (isFemale && isHitam && product.image.includes("Hitam_Perempuan")) ||
      (isFemale && isCerah && product.image.includes("Cerah_Perempuan"))
    ) {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productName = document.createElement("h3");
      productName.textContent = product.name;

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      productDiv.appendChild(productName);
      productDiv.appendChild(productImage);

      productSection.appendChild(productDiv);
    }
  });
}
