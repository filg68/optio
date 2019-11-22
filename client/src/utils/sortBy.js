export const sortBy = (array, sortAsc) => {
    return array.sort((a, b) => {
        if (sortAsc === false) {
            return a.createdAt > b.createdAt
                ? 1
                : a.createdAt === b.createdAt
                ? 0
                : -1;
        } else {
            return a.createdAt < b.createdAt
                ? 1
                : a.createdAt === b.createdAt
                ? 0
                : -1;
        }
    });
};

export const sortAlphabetically = array => {
    return array.sort((a, b) => {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        return nameA < nameB ? -1 : nameA === nameB ? 0 : 1;
    });
};
