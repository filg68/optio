import hero from "../images/hero.png";

// Login and Signup styling:

export const authStyles = theme => ({
    heading: {
        marginBottom: "2.35em",
        fontWeight: "600"
    },
    container: {
        [theme.breakpoints.up("sm")]: {
            transform: "translate(-50%, -50%)",
            position: "absolute",
            left: "50%",
            top: "50%",
            flex: "50%"
        }
    },
    item: {
        minHeight: "100vh",
        position: "relative"
    },
    hero: {
        backgroundColor: "#DDE0E5",
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat"
    },
    link: {
        paddingBottom: "2.35em !important",
        paddingTop: "0 !important"
    },
    agreement: {
        paddingTop: "0 !important"
    },
    uppercase: {
        textTransform: "uppercase"
    },
    btnContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btn: {
        marginTop: "8px",
        "&:nth-child(2)": {
            marginLeft: "10px"
        },
        [theme.breakpoints.down("sm")]: {
            flex: "50%"
        }
    },
    demoBtn: {
        [theme.breakpoints.down("sm")]: {
            flex: "80%" // increase space to accomodate longer text
        }
    }
});
