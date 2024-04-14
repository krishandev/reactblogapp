import {useSelector} from 'react-redux'

const ThemeProvider = ({children}) => {
    const {theme}=useSelector((state)=>state.theme);

  return (
    <div className={theme}>
        <div className=' bg-white text-gray-950 dark:text-gray-900 dark:bg-[rgb(16, 23, 42)]' >
            {children}

        </div>
        </div>
  )
}

export default ThemeProvider