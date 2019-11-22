// Poll page styling:

export const pollPageStyles = theme => ({
    listItem: {
        paddingTop: "14px",
        paddingBottom: "14px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        paddingRight: "66px"
    },
    listItemText: {
        fontWeight: "600"
    },
    thumbnail: {
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "50px",
        height: "50px",
        border: "1px solid gray",
        backgroundColor: theme.palette.background.gray,
        [theme.breakpoints.up("sm")]: {
            width: "60px",
            height: "60px"
        }
    },
    buttonLink: {
        textTransform: "none"
    }
});
