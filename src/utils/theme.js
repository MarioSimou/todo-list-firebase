import {createMuiTheme} from '@material-ui/core/styles'

const primary = {
    light: '#95bbdf',
    main: '#6ea2d3',
    dark: '#3c82c4',
    contrastText: '#fff',
}

const secondary = {
    light: '#F5F5F5',
    main: '#7A7A7A',
    dark: '#242424',
    contrastText: '#fff',
}

const error = {
    light: '#df9696',
    main: '#cd5858',
    dark: "#A63232",
    contrastText: '#fff',
}

export default createMuiTheme({
    palette : {
        primary,
        secondary,
        error,
    },
    typography: {
        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
        fontWeight: 400,
        fontStyle: 'normal',
    },
    spacing: 8
})