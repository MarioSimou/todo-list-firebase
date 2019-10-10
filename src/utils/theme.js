import {createMuiTheme} from '@material-ui/core/styles'

const primary = {
    main: '#1976d2',
    contrastText: '#fff',
}
const secondary = {
    light: '#f5f5f5',
    main: '#ababab',
    contrastText: '#fff',

}

const error = {
    main: '#da283f'
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