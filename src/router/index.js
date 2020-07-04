import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Home from '../components/Home.vue'
import Cadastro from '../components/Cadastro.vue'
import EditarUsuario from '../components/EditarUsuario.vue'
import Login from '../components/Login.vue'
import Feira from '../components/Feira.vue'
import Estande from '../components/Estande.vue'
import GerenciarFeiras from '../components/GerenciarFeiras.vue'
import EditarFeira from '../components/EditarFeira.vue'
import GerenciarEstandes from '../components/GerenciarEstandes'
import EditarEstande from '../components/EditarEstande.vue'
import store from '../store'

Vue.use(VueRouter)

export const router = new VueRouter({
	mode: 'hash',
	base: __dirname,
	routes: [
		{
			path: "/",
			component: Dashboard,
			props: true,
			children: [
				{
					path: "/",
					component: Home
				},
				{
					path: "cadastro",
					component: Cadastro
				},
				{
					path: "editar-perfil",
					component: EditarUsuario
				},
				{
					path: "login",
					component: Login,
					beforeEnter: (to, from, next) => {
						if (localStorage.getItem("token-usuario")) {
							next("/");
						} else {
							next();
						}
					}
				},
				{
					path: "feiras/:id",
					component: Feira
				},
				{
					path: "estandes/:id",
					component: Estande
				},
				{
					path: "gerenciar-feiras",
					component: GerenciarFeiras,
					beforeEnter: (to, from, next) => {
						if (store.state.Usuarios.usuario && (store.state.Usuarios.usuario.tipoUsuario.descricao == 'ORGANIZADOR')) {
							next();
						} else {
							next("/");
						}
					},
					children: [
						{
							path: ":id",
							component: EditarFeira
						}
					]
				},
				{
					path: "gerenciar-estandes",
					component: GerenciarEstandes,
					beforeEnter: (to, from, next) => {
						if (store.state.Usuarios.usuario && (store.state.Usuarios.usuario.tipoUsuario.descricao == 'FEIRANTE' || store.state.Usuarios.usuario.tipoUsuario.descricao == 'ORGANIZADOR')) {
							next();
						} else {
							next("/");
						}
					},
					children: [
						{
							path: ":id",
							component: EditarEstande
						}
					]
				}
			]
		}
	]
})

// beforeEach()

export default router;