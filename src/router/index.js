import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Counter from '../components/Counter'
import Housesay from '../components/Housesay'
import Housesays from  '../components/Housesays'
import Login from '../components/Login'
import Newslist from '../components/Newslist'
import Newsview from '../components/Newsview'
import Indexart from '../components/Indexart'
import Newhouseshow from '../components/Newhouseshow'
import Searchlist from '../components/Searchlist'
import Houseban from '../components/Houseban'
import Translate from  '../components/Translate'
import Translatesay from  '../components/Translatesay'
import Footer from '../components/Footer'
import Memberindex from '../components/Memberindex'
import Memberbasic from '../components/Memberbasic'
import Memberfeedback from '../components/Memberfeedback'
import Memberpinglun from '../components/Memberpinglun'
import Memberlookhouse from '../components/Memberlookhouse'
import Memberhouserecord from '../components/Memberhouserecord'
import Yudaozhuangyuan from '../components/Yudaozhuangyuan'
import Memberadmin from  '../components/Memberadmin'
import Forgetpasswd from '../components/Forgetpasswd'
import MemberEmail from '../components/MemberEmail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Counter',
      name: 'Counter',
      component: Counter
    },
    {
      path: '/Housesay',
      name: 'Housesay',
      component: Housesay
    },
    {
      path: '/Housesay/:id',
      name: 'Housesay',
      component: Housesay
    },
    {
      path: '/Housesays/:id',
      name: 'Housesays',
      component: Housesays
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login/:cate',
      name: 'Login',
      component: Login
    },
    {
      path: '/Newslist',
      name: 'Newslist',
      component: Newslist
    },
    {
      path: '/Newsview/:id',
      name: 'Newsview',
      component: Newsview
    },
    {
      path: '/Indexart',
      name: 'Indexart',
      component: Indexart
    },
    {
      path: '/Newhouseshow',
      name: 'Newhouseshow',
      component: Newhouseshow
    },
    {
      path: '/Newhouseshow/:id',
      name: 'Newhouseshow',
      component: Newhouseshow
    },
    {
      path: '/Newhouseshow/:d',
      name: 'Newhouseshow',
      component: Newhouseshow
    },
    {
      path: '/Searchlist',
      name: 'Searchlist',
      component: Searchlist
    },
    {
      path: '/Searchlist/:d',
      name: 'Searchlist',
      component: Searchlist
    },
    {
      path: '/Houseban/:id',
      name: 'Houseban',
      component: Houseban
    },
    {
      path: '/Translate',
      name: 'Translate',
      component: Translate
    },
    {
      path: '/Translatesay/:id',
      name: 'Translatesay',
      component: Translatesay
    },
    {
      path: '/Footer',
      name: 'Footer',
      component: Footer
    },
    {
      path: '/Memberindex/:id',
      name: 'Memberindex',
      component: Memberindex,
      children: [
        {
          path: '/Memberindex/Memberbasic',
          component: Memberbasic
        },
        {
          path: '/Memberindex/Memberfeedback',
          component: Memberfeedback
        },
        {
          path: '/Memberindex/Memberlookhouse',
          component: Memberlookhouse
        },
        {
          path: '/Memberindex/Memberpinglun',
          component: Memberpinglun
        },
        {
          path: '/Memberindex/Memberhouserecord',
          component: Memberhouserecord
        },
        {
          path: '/Memberindex/Memberadmin',
          component: Memberadmin
        },
        {
          path: '/Memberindex/MemberEmail',
          component: MemberEmail
        },
        {
          path: '/',
          component: Memberbasic
        }
      ]
    },
    {
      path: '/Yudaozhuangyuan',
      name: 'Yudaozhuangyuan',
      component: Yudaozhuangyuan
    },
    {
      path: '/Forgetpasswd',
      name: 'Forgetpasswd',
      component: Forgetpasswd
    }
  ],
  scrollBehavior: () => ({ y: 0 })
})
