const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
const mapArrToProps = (arr, defaultVal) => {
  const target = {};

  for (const letter of arr) {
    target[letter] = defaultVal;
  }

  return target;
};
const sortAlphabetically = (nameA, nameB) => {
  const lowerA = nameA.name.toLowerCase();
  const lowerB = nameB.name.toLowerCase();

  if (lowerA < lowerB) { return -1 }
  if (lowerA > lowerB) { return 1 }

  return 0;
};

const firstLetter = name => ( name.charAt(0).toLowerCase() );

const DEFAULT_STATE = mapArrToProps(alphabetArr, []);

export default function (state = DEFAULT_STATE, action) {
  const { type, name, id, phone } = action;
  const startLetter = name ? firstLetter(name) : '';
  
  switch (type) {
    case 'ADD_CONTACT':
      const newSortedList = [...state[startLetter], { name, id, phone } ].sort(sortAlphabetically);
      
      return Object.assign({}, state, {
        [startLetter]: newSortedList
      });
    case 'DELETE_CONTACT':
      for (const letter in state) {
        const arr = state[letter];
        const foundContact = arr.find(contact => contact.id === id);

        if (foundContact) {
          let deletedContactArr = arr.filter(contact => contact.id !== id);

          return Object.assign({}, state, {
            [letter]: deletedContactArr
          });
        }
      }
    case 'EDIT_CONTACT':
      for (const letter in state) {
        const arr = state[letter];
        const foundContact = arr.find(contact => contact.id === id);

        if (foundContact) {
          let changedContactArr = arr.map(contact => {
            if (contact.id === id) {
              return Object.assign({}, contact, {
                name,
                phone
              });
            }

            return contact;
          });

          return Object.assign({}, state, {
            [letter]: changedContactArr
          });
        }
      }
    default:
      return state;
  }
};