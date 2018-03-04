import Login from './components/Login'
import Admin from './components/Admin'
import Order from './components/Order'
import Area from './components/Area'

export const routes=[
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/admin',
    component:Admin,
    children:[
      {
        path:'orders',
        component:Order,
        meta:{reqAuth:true}
      },
      {
        path:'areas',
        component:Area,
        meta:{reqAuth:true}
      }
    ],
    meta:{reqAuth:true}
  }
]