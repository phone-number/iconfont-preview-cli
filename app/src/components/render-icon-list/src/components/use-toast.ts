import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const basicOptions: Toastify.Options = {
  duration: 3000,
  gravity: 'top',
  position: 'center',
  stopOnFocus: true
}

const basicStyle: Toastify.Options['style'] = {
  padding: '11px 15px',
  'box-shadow': 'unset',
  'border-radius': '4px',
  'font-size': '14px',
}
export const useToast = () => {

  const success = (msg: string) => {
    Toastify({
      ...basicOptions,
      text: msg,
      style: {
        ...basicStyle,
        background: '#f0f9eb',
        color: '#67c23a',
        border: '1px solid #e1f3d8',
      }
    }).showToast()
  }

  const error = (msg: string) => {
    Toastify({
      ...basicOptions,
      text: msg,
      style: {
        ...basicStyle,
        background: '#fef0f0',
        color: '#f56c6c',
        border: '1px solid #fde2e2',
      }
    }).showToast()
  }

  return { success, error }
}

export default useToast()