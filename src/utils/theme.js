import {createMuiTheme} from '@material-ui/core/styles'

const primary = {
    main: '#1976d2',
    contrastText: '#fff',
}
const secondary = {
    light: '#f5f5f5',
    main: '#dcdcdc',
    contrastText: '#fff',
}

const error = {
    main: '#F08080'
}

export default createMuiTheme({
    palette: {
        primary,
        secondary,
        error,
    },
    typography: {
        fontFamily: ['Roboto',
        '"Helvetica Neue"',
        'Arial'].join(',')
    }

})