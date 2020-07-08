const converterBytesParaDataUrl = (imagem) => {
  if (!imagem) return "";

  if (!imagem.tipo) return imagem;

  return `data:${imagem.tipo};base64,${imagem.bytesImagem}`;
};

export { converterBytesParaDataUrl };
