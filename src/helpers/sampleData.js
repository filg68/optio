const sampleData = [
    {
        name: {
            title: "Mr",
            first: "Joel",
            last: "Garrett"
        },
        email: "joel.garrett@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/87.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/87.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/87.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Layla",
            last: "Harrison"
        },
        email: "layla.harrison@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/9.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/9.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/9.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Marlene",
            last: "Reid"
        },
        email: "marlene.reid@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/88.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/88.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/88.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Charlotte",
            last: "Ford"
        },
        email: "charlotte.ford@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/94.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/94.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/94.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Reginald",
            last: "Lane"
        },
        email: "reginald.lane@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/39.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/39.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/39.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Gabe",
            last: "Turner"
        },
        email: "gabe.turner@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/91.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/91.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/91.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Ricky",
            last: "Brewer"
        },
        email: "ricky.brewer@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/4.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/4.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/4.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Isaiah",
            last: "Garza"
        },
        email: "isaiah.garza@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/12.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/12.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/12.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Penny",
            last: "Stanley"
        },
        email: "penny.stanley@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/34.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/34.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/34.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Beth",
            last: "Carr"
        },
        email: "beth.carr@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/48.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/48.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/48.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Carolyn",
            last: "Hopkins"
        },
        email: "carolyn.hopkins@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/85.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/85.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/85.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Marjorie",
            last: "Wagner"
        },
        email: "marjorie.wagner@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/82.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/82.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/82.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Darlene",
            last: "Miles"
        },
        email: "darlene.miles@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/47.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/47.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/47.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Glen",
            last: "Lawrence"
        },
        email: "glen.lawrence@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/79.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/79.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/79.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Christy",
            last: "Ward"
        },
        email: "christy.ward@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/53.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/53.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/53.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Alfred",
            last: "Roberts"
        },
        email: "alfred.roberts@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/34.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/34.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/34.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Neil",
            last: "West"
        },
        email: "neil.west@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/60.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/60.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/60.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Carl",
            last: "Steward"
        },
        email: "carl.steward@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/62.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/62.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Florence",
            last: "Smith"
        },
        email: "florence.smith@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/15.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/15.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/15.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Claude",
            last: "Graves"
        },
        email: "claude.graves@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/14.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/14.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/14.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Beth",
            last: "Neal"
        },
        email: "beth.neal@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/44.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/44.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/44.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Teresa",
            last: "King"
        },
        email: "teresa.king@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/26.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/26.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/26.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Dana",
            last: "Brewer"
        },
        email: "dana.brewer@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/89.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/89.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/89.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Floyd",
            last: "Garrett"
        },
        email: "floyd.garrett@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/2.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/2.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/2.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Irma",
            last: "Soto"
        },
        email: "irma.soto@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/40.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/40.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/40.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Carole",
            last: "Rodriquez"
        },
        email: "carole.rodriquez@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/28.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/28.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/28.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Yvonne",
            last: "Wright"
        },
        email: "yvonne.wright@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/71.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/71.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/71.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "David",
            last: "Richards"
        },
        email: "david.richards@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/51.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/51.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/51.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Pedro",
            last: "Peters"
        },
        email: "pedro.peters@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/86.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/86.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/86.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Soham",
            last: "Graham"
        },
        email: "soham.graham@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/91.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/91.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/91.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Karl",
            last: "Howell"
        },
        email: "karl.howell@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/62.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/62.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Stephanie",
            last: "Taylor"
        },
        email: "stephanie.taylor@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/14.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/14.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/14.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Dale",
            last: "Mccoy"
        },
        email: "dale.mccoy@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/10.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/10.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/10.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Jar",
            last: "Freeman"
        },
        email: "jar.freeman@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/36.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/36.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/36.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Joan",
            last: "Cruz"
        },
        email: "joan.cruz@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/88.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/88.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/88.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Jimmy",
            last: "Elliott"
        },
        email: "jimmy.elliott@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/81.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/81.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/81.jpg"
        }
    },
    {
        name: {
            title: "Ms",
            first: "Naomi",
            last: "Marshall"
        },
        email: "naomi.marshall@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/5.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/5.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/5.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Elmer",
            last: "Wade"
        },
        email: "elmer.wade@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/55.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/55.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/55.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Felix",
            last: "Turner"
        },
        email: "felix.turner@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/70.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/70.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/70.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Neil",
            last: "Burns"
        },
        email: "neil.burns@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/63.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/63.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/63.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Diane",
            last: "Carter"
        },
        email: "diane.carter@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/50.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/50.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/50.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Martha",
            last: "Jennings"
        },
        email: "martha.jennings@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/78.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/78.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/78.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Tyrone",
            last: "Ruiz"
        },
        email: "tyrone.ruiz@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/18.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/18.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/18.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Suzanne",
            last: "Campbell"
        },
        email: "suzanne.campbell@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/6.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/6.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/6.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Rosa",
            last: "Caldwell"
        },
        email: "rosa.caldwell@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/22.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/22.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/22.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Heather",
            last: "Kennedy"
        },
        email: "heather.kennedy@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/89.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/89.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/89.jpg"
        }
    },
    {
        name: {
            title: "Miss",
            first: "Marion",
            last: "Douglas"
        },
        email: "marion.douglas@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/45.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/45.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/45.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Cathy",
            last: "Hamilton"
        },
        email: "cathy.hamilton@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/69.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/69.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/69.jpg"
        }
    },
    {
        name: {
            title: "Mrs",
            first: "Naomi",
            last: "Cooper"
        },
        email: "naomi.cooper@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/women/34.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/34.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/34.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Timmothy",
            last: "Garza"
        },
        email: "timmothy.garza@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/58.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/58.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/58.jpg"
        }
    },
    {
        name: {
            title: "Mr",
            first: "Demo",
            last: "User"
        },
        email: "demo.user@example.com",
        picture: {
            large: "https://randomuser.me/api/portraits/men/58.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/58.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/59.jpg"
        }
    }
];

export function cleanData() {
    const cleanData = [];
    sampleData.forEach(user => {
        let fullName = `${user["name"].first} ${user["name"].last}`;
        let email = user["email"];
        let avatar = user["picture"].thumbnail;
        cleanData.push({ fullName, email, avatar });
    });
    return cleanData;
}
