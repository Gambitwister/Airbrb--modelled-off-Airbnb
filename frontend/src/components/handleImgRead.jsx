export const handleImgRead = async (event) => {
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const files = event.target.files;
  const b64List = [];
  for (let i = 0; i < files.length; i++) {
    const base64 = await convertBase64(files[i]);
    b64List.push(base64);
  }

  return b64List;
};
