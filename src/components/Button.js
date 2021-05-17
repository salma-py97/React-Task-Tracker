import PropTypes from 'prop-types'


const Button = ({color, text, onAdd}) => {

    return (
        <button onClick={onAdd} className="btn" style={{backgroundColor: color}}>{text}</button>
    )
}


Button.defaultProps = {
    color: 'blue',
    text: 'Add Task'
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
}
export default Button
