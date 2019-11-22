export const friendsPageStyles = theme => ({
    tabsContainer: {
        flexDirection: "column"
    },
    friendsContainer: {
        "& > .MuiGrid-item:first-child": {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        }
    },
    friendsTitle: {
        marginRight: 0
    },
    userList: {
        maxHeight: "150vh",
        overflow: "scroll"
    },
    listItem: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    listItemText: {
        maxWidth: "60%",
        [theme.breakpoints.up("md")]: {
            maxWidth: "80%"
        }
    },
    tabs: {
        width: "100%",
        "& .Mui-selected": {
            fontWeight: "600 !important"
        }
    },
    disabled: {
        opacity: "0.4"
    },
    button: {
        "&.MuiButton-text": {
            textTransform: "initial"
        }
    },
    box: {
        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(3)
        },
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1)
        },
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0)
        }
    },
    secondaryAction: {
        [theme.breakpoints.down("sm")]: {
            right: "5px"
        }
    },
    avatar: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    }
});
