import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Home from '../components/Home.vue'
import Cadastro from '../components/Cadastro.vue'
import EditarPerfil from '../components/EditarPerfil.vue'
import Login from '../components/Login.vue'
import Feira from '../components/Feira.vue'

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
					component: EditarPerfil
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
				}
			]
    }
  ]
})

// beforeEach()

export default router;