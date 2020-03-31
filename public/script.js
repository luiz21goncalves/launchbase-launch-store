const Mask = {
  apply(input,func) {
    setTimeout(function() {
      input.value = Mask[func](input.value);
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g,"");

    return value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);
  }
};

const PhotosUpload = {
  input: "",
  preview: document.querySelector('#photos-preview'),
  uploadLimiti: 6,
  files: [],
  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;
    
    if(PhotosUpload.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      
      PhotosUpload.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const container = PhotosUpload.getContainer(image);

        PhotosUpload.preview.appendChild(container);
      }

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('photo');

    container.onclick = PhotosUpload.removePhoto

    container.appendChild(image);

    container.appendChild(PhotosUpload.getRemoveButton());

    return container;
  },
  hasLimit(event) {
    const { uploadLimiti, input, preview } = PhotosUpload;
    const { files: fileList } = input;
    
    if (fileList.length > uploadLimiti) {
      alert(`Envie no máximo ${uploadLimiti} fotos.`);
      event.preventDefault();
      
      return true;
    }

    const photoDiv = [];
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == 'photo')
        photoDiv.push(item);
    });

    const totalPhotos = fileList.length + photoDiv.length;

    if(totalPhotos > uploadLimiti) {
      alert('Você atingiu o limite máximo de fotos');
      event.preventDefault();
      return true;
    }

    return false;
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = 'close';
    return button; 
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode; // <div class="photo">
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if(photoDiv.id) {
      const removeFiles = document.querySelector('input[name="removed_files"]');
      if (removeFiles) {
        removeFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove();
  }
}