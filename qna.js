import inquirer from 'inquirer';
inquirer
  .prompt([
    /* Pass your questions in here */
    {   message: "Hi. What is your Name?",
        name: "Name",
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const Name = answers;
    console.log(Name);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Tty Error");
    } else {
      // Something else went wrong
    }
  });