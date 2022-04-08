import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

interface styleProps {
  marginRight: number;
  marginTop: number;
  color: string;
}

const addUserStyleHook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: (props: styleProps) => props.marginRight,
      marginTop: (props: styleProps) => props.marginTop,
    },
    close: {
      backgroundColor: theme.palette.primary.main,
      marginTop: (props: styleProps) => props.marginTop,
    },
    error: {
      color: (props: styleProps) => props.color,
    },
  })
);

export { addUserStyleHook };

const userOverviewStyleHook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: (props: styleProps) => props.marginRight,
      marginTop: (props: styleProps) => props.marginTop,
      marginLeft: '10px',
    },
    close: {
      backgroundColor: theme.palette.primary.main,
      marginTop: (props: styleProps) => props.marginTop,
      width: '120px',
    },
    userActionsContainer: {
      display: 'flex',
      padding: '15px',
      justifyContent: 'space-between',
      borderRadius: '15px',
    },
    tableContainer: {
      flex: 1,
      margin: '15px 20px',
      marginBottom: '0',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      borderRadius: '15px',
    },

    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: '20px',
      padding: '30px',
      width: '300px',
    },

    refreshButton: {
      cursor: 'pointer',
    },
  })
);

export { userOverviewStyleHook };

const userProfileStyleHook = makeStyles(() =>
  createStyles({
    editProfileContainer: {
      marginTop: '100px',
      borderRadius: '15px',
    },
  })
);

export { userProfileStyleHook };

const popupMenuStyleHook = makeStyles(() =>
  createStyles({
    editLink: {
      textDecoration: 'none',
      color: '#000',
    },
  })
);

export { popupMenuStyleHook };
