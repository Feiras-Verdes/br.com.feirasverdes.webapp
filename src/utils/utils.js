const converterBytesParaDataUrl = (imagem) => {
    if (!imagem) return "";

    if (!imagem.tipo) return imagem;

    return `data:${state.usuario.imagem.tipo};base64,${state.usuario.imagem.bytesImagem}`;
}

export {
    converterBytesParaDataUrl
}