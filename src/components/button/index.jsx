import PropTypes from 'prop-types'
import {ContainerButtun} from '../button/styles'


export function Button({children, ...props}){
  return(
  <ContainerButtun {...props}>{children}</ContainerButtun>
  )   
}

Button.propTypes = {
  children: PropTypes.string,
}