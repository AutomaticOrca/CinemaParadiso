const fs = require("fs");

/**
 * Generates a random date within the last three years
 * @returns {Date} - A random date within the last three years
 */
const generateRandomDateWithinThreeYears = () => {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 3);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const directors = [
  "Stanley Kubrick",
  "Alfred Hitchcock",
  "Martin Scorsese",
  "Wong Kar-wai",
  "Christopher Nolan",
  "Quentin Tarantino",
  "James Cameron",
  "Francis Ford Coppola",
  "Ridley Scott",
  "David Fincher",
  "George Lucas",
  "Peter Jackson",
  "Tim Burton",
  "Clint Eastwood",
  "Sergio Leone",
  "Orson Welles",
  "Akira Kurosawa",
  "Federico Fellini",
  "Ingmar Bergman",
  "Jean-Luc Godard",
  "Francis Truffaut",
  "Woody Allen",
  "Roman Polanski",
  "Wes Anderson",
  "Hou Hsiao-Hsien",
];

const emails = [
  "a@a.com",
  "b@b.com",
  "c@c.com",
  "d@d.com",
  "e@e.com",
  "f@f.com",
  "g@g.com",
  "h@h.com",
  "i@i.com",
  "j@j.com",
  "k@k.com",
  "l@l.com",
  "m@m.com",
  "n@n.com",
  "o@o.com",
  "p@p.com",
  "q@q.com",
  "r@r.com",
  "s@s.com",
  "t@t.com",
  "u@u.com",
  "v@v.com",
  "w@w.com",
  "x@x.com",
  "y@y.com",
];

const passwords = ["123456", "asdfgh", "password", "qwerty", "zxcvbn"];

const users = directors.map((name, index) => {
  return {
    name: name,
    email: emails[index],
    password: passwords[Math.floor(Math.random() * passwords.length)],
    createdAt: generateRandomDateWithinThreeYears(),
  };
});

const writeArrayToFile = (filename, array) => {
  fs.writeFile(filename, JSON.stringify(array, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log(`Successfully wrote data to ${filename}!`);
    }
  });
};

writeArrayToFile("users.json", users);
