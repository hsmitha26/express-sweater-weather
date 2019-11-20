exports.seed = function(knex) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('locations').del() // delete all locations first
    .then(() => knex('users').del()) // delete all users

    // Now that we have a clean slate, we can re-insert our user data
    .then(() => {
      return Promise.all([

        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('users').insert({
          username: 'User1', apiKey: '12345abcdef'}, 'id')
        .then(user => {
          return knex('locations').insert([
            { name: 'Denver, CO', user_id: user[0] },
            { name: 'Boulder, CO', user_id: user[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
