const Mask = {
  apply(input,func) {
    setTimeout(function() {
      input.value = Mask[func](input.value)
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g,"");

    return value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
  }
};

const PhotosUpload = {
  uploadLimiti: 6,
  handleFileInput(event) {
    const { files: fileList } = event.target;
    const { uploadLimiti } = PhotosUpload


    if (fileList.length > uploadLimiti) {
      alert(`Envie no máximo ${uploadLimiti} fotos.`)
      event.preventDefault();
      return
    }
  }
}