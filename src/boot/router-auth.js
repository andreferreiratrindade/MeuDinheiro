import {firebaseAuth} from 'boot/firebase'

export default ({router}) => {
  router.beforeEach((to, from, next) => {
    firebaseAuth.onAuthStateChanged(user => {
      debugger
      if( !user && to.path !== '/auth-login' && to.path !== '/auth-register'){
        next('/auth-login')
      }else{
        // console.log(loggedIn);
        next()
      }    
    })
  })
}