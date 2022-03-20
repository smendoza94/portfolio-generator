// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

///////////////////////////////////////////////
// const profileDataArgs = process.argv.slice(2);
// console.log(profileDataArgs);

// const printProfileData = (profileDataArr) => {
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
///////////////////////////////////////////////
// const name = profileDataArgs[0];
// const github = profileDataArgs[1]; will be turned into...
// const [name, github] = profileDataArgs;

// fs.writeFile('./index.html',generatePage(name,github), err =>{
//     if(err) throw new Error(err);
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
///////////////////////////////////////////////
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// })
///////////////////////////////////////////////
const promptUser = () => {
    return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name? (Required)',
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name!')
                    }
                }
            },
            {
                type: 'input',
                name: 'gitbhub',
                message: 'Enter your GitHub Username: (Reqiured)',
                validate: nameInput => {
                    if(nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name!')
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about your an "About" section?',
                default: true
            },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                when: ({confirmAbout}) => {
                    if (confirmAbout) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
    ])
};

const promptProject = portfolioData => {
    // if there's no projects array property, create one
    if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!')
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a descriptin of the project (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!')
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (check all that apply)',
            choices: ['Javascript','HTML','CSS','ES6','JQuery','Bootstrap','Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!')
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);
        fs.writeFile('./index.html', pageHTML, err => {
            if (err) throw new Error(err);
            console.log('Portfolio complete! Check out index.html to see the output!');
        });
    });
