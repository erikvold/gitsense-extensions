// This, along with the global variable that is used the content.js script,
// are the only globally allowed variables for now.  And if you are wondering,
// what sdes stands for, it's SDE Solutions, the owners of GitSense.  And if you
// are wondering what SDE stands for, it's Software Development Environment.
//
// If you want to create a new file/structure, you'll update this file.  We
// also try to order things alphabetically to make merging/diffs more easy
// to follow. And as you can probably guess, the nesting levels, also represents
// directory levels in most cases.
var sdes = {
    bitbucket: {
        comp: {},
        data: {},
        pages: {},
        ui: {
            input: {}
        },
        utils: {}
    },
    cache: {
        gitsense: { 
            data: {
                branch: {
                    heads: { }
                },
                commits: {

                }
            }
        }
    },
    events: {},
    gitsense: {
        data: {
            branch: {}
        },
        ui: {
            codechurn: {},
            trees: {}
        }
    },
    github: {
        comp: {},
        data: {},
        pages: {},
        ui: {
            input: {}
        },
        utils: {}
    },
    ui: {},
    utils: {}
};
