import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/Root'
import Cinema from '../pages/cinema/Root'
import CinemaDetail from '../pages/common/CinemaDetail'

import Mine from '../pages/mine/Root'
import Login from '../pages/common/Login'
import Search from '../pages/common/Search'
import CityList from '../pages/common/CityList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'search',
          component: Search,
          props: {
            type: ['cinema', 'movie']
          }
        },
        {
          path: 'city-list',
          component: CityList
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema,
      children: [
        {
          path: 'search',
          component: Search,
          props: {
            type: ['cinema']
          }
        },
        {
          path: 'city-list',
          component: CityList
        }
      ]
    },
    {
        path:'cinemadetail',
        component:CinemaDetail
    },
    {
      path: '/mine',
      component: Mine,
      beforeEnter:(to,from,next)=>{
        let token = localStorage.getItem('token');
        if(token){
          next();
        }else{
          next('/login');
        }
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})
