import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Home from '../components/Home.vue'
import Cadastro from '../components/Cadastro.vue'
import EditarUsuario from '../components/EditarUsuario.vue'
import Login from '../components/Login.vue'
import Feira from '../components/Feira.vue'
import Estande from '../components/Estande.vue'

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
					path:"/",
					component: Home
				},
				{
					path: "cadastro",
					component: Cadastro
				},
				{
					path: "editarPerfil",
					component: EditarUsuario
				},
				{
					path: "login",
					component: Login,
					beforeEnter: (to, from, next) => {
						if (localStorage.getItem("token-usuario")) {
							next("/");
						} else{
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
				}
			]
    }
  ]
})

// beforeEach()

export default router;