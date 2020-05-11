import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Home from '../components/Home.vue'
import CadastroUsuario from '../components/CadastroUsuario.vue'

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
					path: "cadastroUsuario",
					component: CadastroUsuario
				}
			]
    }
  ]
})

// beforeEach()

export default router;