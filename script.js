let imageURL;

// scripts.js for index.html

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
