/**
 * Importar automaticamente todos os módulos
 */
const requireModule = require.context(".", false,  /\.store\.js$/);
const modules = {};

requireModule.keys().forEach(filename => {

	// cria o nome do módlo à partir do nome do arquivo
	// remove store.js extensão e deixa primeira letra maiúscula
	const moduleName = filename
		.replace(/(\.\/|\.store\.js)/g, "")
		.replace(/^\w/, c => c.toUpperCase());
    
	modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;