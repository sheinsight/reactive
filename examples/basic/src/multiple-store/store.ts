import { create } from '@shined/reactive'
import { toast } from 'react-hot-toast'

export const userStore = create({
  user: {
    name: 'reactive',
  },
})

export const loginStore = create({
  username: '',
  password: '',
  isLogin: false,
})

export const verifyUser = () => {
  const { username, password } = loginStore.mutate

  if (username === 'admin' && password === 'admin') {
    loginStore.mutate.isLogin = true
    toast.success('Login successful')
  } else {
    toast.error('Failed. Default are both `admin`')
  }
}

export const logout = () => {
  loginStore.mutate.isLogin = false
  toast.success('Logout successful')
}
