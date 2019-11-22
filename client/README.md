## Styling Options

There are three ways to style components:

-   Use theme.js to override Material UI default styles. This will affect the whole application!

-   Add group of styles to styles folder and import it in the component (refer to Signup or Login pages for help) for reusable styling

-   As an alternative, use Material UI withStyles or makeStyles to style each component separately

## Data Flow

-   On signup, a token is received from the back-end, set in local storage and decoded. The user data is then fetched from the server using the user's unique id (`this.props.loadUserData(id)`). Suggested friends for this user are being fetched before loading a profile page as well (`this.props.loadUsers()`)

-  On login, user identity is verified at the back-end, a token is received and the above steps are taken

-  On each page refresh, if a token was previously saved in local storage, it is used to fetch user id and fetch user's data and suggested friends from the server again (user stays logged in)

- Once fetched, user details and suggested friends are passed from component to component